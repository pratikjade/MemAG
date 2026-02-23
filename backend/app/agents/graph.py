from langgraph.graph import StateGraph, END
from app.agents.state import AgentState
from app.agents.supervisor import get_supervisor_node

from app.agents.memory_agent import memory_agent_node
from app.agents.email_agent import email_agent_node

def build_workflow():
    """Builds the LangGraph orchestration workflow."""
    # 1. Initialize the graph with our state schema
    workflow = StateGraph(AgentState)

    # 2. Add all our nodes (the agents)
    workflow.add_node("supervisor", get_supervisor_node())
    workflow.add_node("memory", memory_agent_node)
    workflow.add_node("email", email_agent_node)

    # 3. Define the routing logic 
    # The supervisor decides where to go next based on its output
    workflow.add_conditional_edges(
        "supervisor",
        # The function that tells LangGraph which field to look at for routing
        lambda x: x["next_node"],
        # Map the output string to the actual node name
        {
            "memory": "memory",
            "email": "email",
            "FINISH": END
        }
    )
    
    # Worker nodes always return to END for now (or could return to supervisor)
    workflow.add_edge("memory", END)
    workflow.add_edge("email", END)

    # 4. Set the entry point
    workflow.set_entry_point("supervisor")

    # 5. Compile the graph into a runnable application
    return workflow.compile()

# Global graph instance
agent_app = build_workflow()

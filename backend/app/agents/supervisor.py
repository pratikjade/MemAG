import logging
from typing import List, Literal

from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field

from app.core.llm import get_llm
from app.agents.state import AgentState

logger = logging.getLogger(__name__)

# Output schema for the supervisor
class RouterOutput(BaseModel):
    """The next node to route to."""
    next_node: Literal["memory", "email", "FINISH"] = Field(
        description="The next node to call, or FINISH if the task is complete."
    )
    reasoning: str = Field(description="Brief reasoning for the decision")

def get_supervisor_node():
    """
    Creates the supervisor node that routes to worker agents.
    """
    llm = get_llm()
    
    system_prompt = (
        "You are an orchestrator overseeing a personal AI assistant (MemAG).\n"
        "Your job is to route the incoming request to the correct agent node.\n\n"
        "Nodes available:\n"
        "1. 'memory': For tasks involving searching past information, retrieving context, or storing new facts.\n"
        "2. 'email': For tasks involving analyzing emails, generating replies, or calculating priority.\n\n"
        "If the request is complete and no more actions are needed, return 'FINISH'.\n"
        "Always respond in JSON with 'next_node' and 'reasoning'."
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="messages"),
        ("human", "Decide the next step for the request: {input}")
    ])

    # In a real LangGraph setup, we'd bind the output parser or use function calling
    # For now, we'll implement the node's core logic
    def supervisor(state: AgentState):
        last_message = state["messages"][-1].content
        
        # Simple manual routing logic or LLM call
        # Let's use the LLM to decide
        chain = prompt | llm | JsonOutputParser(pydantic_object=RouterOutput)
        
        try:
            result = chain.invoke({
                "messages": state["messages"],
                "input": last_message
            })
            
            logger.info(f"Supervisor decided: {result['next_node']} (Reason: {result['reasoning']})")
            return {"next_node": result["next_node"]}
        except Exception as e:
            logger.error(f"Supervisor routing failed: {e}")
            # Fallback
            return {"next_node": "FINISH"}

    return supervisor

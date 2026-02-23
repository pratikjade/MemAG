import logging
from app.agents.state import AgentState
from app.langchain.memory import search_memory, store_memory
from app.core.llm import get_llm
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

logger = logging.getLogger(__name__)

def memory_agent_node(state: AgentState):
    """
    Handles memory search and storage for the LangGraph.
    """
    logger.info("--- MEMORY AGENT ---")
    
    last_message = state["messages"][-1].content
    
    # 1. Search memory for context based on the input
    results = search_memory(last_message)
    memories = state.get("memories", [])
    if results:
        memories.extend(results)
    
    # 2. Use LLM to form a good response using the discovered memory
    llm = get_llm()
    prompt = ChatPromptTemplate.from_template(
        "You are an AI personal assistant. The user asked or said: '{input}'\n\n"
        "Here is the context retrieved from your semantic memory:\n{context}\n\n"
        "Respond to the user utilizing this context. Be helpful and concise."
    )
    
    context_str = "\n".join(memories[-3:]) if memories else "No relevant past context found."
    
    chain = prompt | llm | StrOutputParser()
    
    try:
        response = chain.invoke({
            "input": last_message,
            "context": context_str
        })
    except Exception as e:
        logger.error(f"Memory agent failed to generate response: {e}")
        response = "I encountered an error trying to process your request."

    return {
        "memories": memories,
        "output": response,
        "next_node": "FINISH"
    }

import logging
from app.agents.state import AgentState
from app.services.email_service import get_all_emails
from app.core.llm import get_llm
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

def email_agent_node(state: AgentState):
    """
    Handles queries related to email data.
    """
    logger.info("--- EMAIL AGENT ---")
    
    last_message = state["messages"][-1].content
    
    # 1. Look up recent or priority emails from the database
    all_emails = get_all_emails()
    emails_text = "\n".join([f"- ID: {e['id']} | From: {e['sender']} | Subj: {e['subject']} | Score: {e.get('urgency', 0)}" for e in all_emails[:5]])

    # 2. Formulate a response about the emails based on the query
    llm = get_llm()
    prompt = ChatPromptTemplate.from_template(
        "You are an AI personal assistant (MemAG).\n"
        "The user asked about their emails: '{input}'\n\n"
        "Here are the most recent/relevant emails in their inbox:\n{emails}\n\n"
        "Answer the user's question. Be helpful, professional, and concise."
    )
    
    from langchain_core.output_parsers import StrOutputParser
    chain = prompt | llm | StrOutputParser()
    
    try:
        response = chain.invoke({
            "input": last_message,
            "emails": emails_text
        })
    except Exception as e:
        logger.error(f"Email agent failed to generate response: {e}")
        response = "I encountered an error trying to process your email request."

    return {
        "output": response,
        "next_node": "FINISH"
    }

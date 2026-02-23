from typing import Annotated, Sequence, TypedDict, List, Dict, Any, Optional
from langchain_core.messages import BaseMessage
import operator

class AgentState(TypedDict):
    """
    Current state of the agent orchestration graph.
    """
    # History of messages in the conversation
    messages: Annotated[Sequence[BaseMessage], operator.add]
    
    # Metadata about the current email being processed (if any)
    current_email: Optional[Dict[str, Any]]
    
    # List of relevant memories retrieved
    memories: List[str]
    
    # The next node to route to
    next_node: str
    
    # Final output to the user
    output: str

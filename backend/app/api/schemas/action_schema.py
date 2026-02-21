"""
Pydantic schemas for priority scoring API.
Matches the PriorityEngine page's data requirements.
"""

from pydantic import BaseModel


class PriorityBreakdown(BaseModel):
    """Priority score breakdown for a single email."""
    deadline_weight: int = 0    # 0-50
    sender_weight: int = 0      # 0-30
    ai_urgency: int = 0         # 0-20


class PriorityEmailItem(BaseModel):
    """Email with full priority scoring for the Priority Engine page."""
    id: str
    rank: int
    sender: str
    subject: str
    deadline: str
    total_score: int
    deadline_weight: int
    sender_weight: int
    ai_urgency: int


class PriorityExplanation(BaseModel):
    """Detailed explanation of priority scoring for a specific email."""
    id: str
    sender: str
    subject: str
    total_score: int
    deadline_weight: int
    sender_weight: int
    ai_urgency: int
    deadline_reasoning: str
    sender_reasoning: str
    urgency_reasoning: str

"""
Pydantic schemas for email-related API requests and responses.
Designed to match the frontend's data shape for seamless integration.
"""

from pydantic import BaseModel, Field
from typing import Optional


# ── Request Schemas ────────────────────────────────────────────────────

class EmailProcessInput(BaseModel):
    """Input for processing a new email."""
    sender: str = Field(..., description="Sender name")
    sender_email: Optional[str] = Field(None, description="Sender email address")
    subject: str = Field(..., description="Email subject line")
    content: str = Field(..., description="Full email body content")
    deadline: Optional[str] = Field(None, description="Deadline (e.g. 'Today, 3:00 PM')")
    type: Optional[str] = Field(None, description="Email type override")


class ReplyRequest(BaseModel):
    """Input for generating an AI reply."""
    tone: str = Field(default="concise", description="Reply tone: concise, formal, or direct")


# ── Response Schemas ───────────────────────────────────────────────────

class AISummary(BaseModel):
    """AI-generated summary for an email."""
    key_points: list[str] = []
    suggested_actions: list[str] = []


class ThreadMessage(BaseModel):
    """A message in an email thread."""
    sender: str
    time: str
    preview: str


class EmailResponse(BaseModel):
    """Full email response for the EmailDetail page."""
    id: str
    sender: str
    subject: str
    time: str
    urgency: int
    deadline: str
    type: str
    content: str
    preview: str
    ai_summary: AISummary
    thread: list[ThreadMessage] = []


class EmailListItem(BaseModel):
    """Email item for the Dashboard Priority Inbox."""
    id: str
    sender: str
    subject: str
    urgency: int
    deadline: str
    type: str
    preview: str


class ReplyResponse(BaseModel):
    """AI-generated reply response."""
    reply_text: str
    tone: str

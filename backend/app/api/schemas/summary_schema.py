"""
Pydantic schemas for AI summary responses.
"""

from pydantic import BaseModel


class DashboardSummary(BaseModel):
    """AI-generated dashboard morning briefing summary."""
    high_priority_count: int = 0
    high_priority_description: str = ""
    replies_ready_count: int = 0
    replies_ready_description: str = ""
    meeting_requests: int = 0
    meeting_description: str = ""
    time_sensitive_count: int = 0

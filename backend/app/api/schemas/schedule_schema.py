"""
Pydantic schemas for schedule/calendar API.
"""

from pydantic import BaseModel, Field
from typing import Optional


class ScheduleEventInput(BaseModel):
    """Input for creating a new schedule event."""
    title: str
    description: Optional[str] = ""
    start_time: str = Field(..., description="Start time, e.g. '10:00'")
    end_time: str = Field(..., description="End time, e.g. '11:00'")
    date: Optional[str] = Field(None, description="Date string, defaults to today")


class ScheduleEventResponse(BaseModel):
    """A schedule event response."""
    id: str
    title: str
    description: str
    start_time: str
    end_time: str
    date: str

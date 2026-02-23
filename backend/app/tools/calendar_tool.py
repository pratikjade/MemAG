from langchain_core.tools import tool

@tool
def get_calendar_events(date: str) -> str:
    """Get schedule and calendar events for a specific date (YYYY-MM-DD)."""
    return f"Mock calendar events for {date}"

@tool
def create_calendar_event(title: str, start_time: str, end_time: str) -> str:
    """Create a new calendar event."""
    return f"Mock created event '{title}' from {start_time} to {end_time}"

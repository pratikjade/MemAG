"""
Schedule / Calendar API routes.
"""

from fastapi import APIRouter, HTTPException

from app.api.schemas.schedule_schema import ScheduleEventInput, ScheduleEventResponse
from app.services.schedule_service import (
    create_event,
    get_today_events,
    get_all_events,
    delete_event,
)

router = APIRouter()


@router.get("/today", response_model=list[ScheduleEventResponse])
def today_schedule():
    """
    Get today's schedule events.
    Powers the Today's Schedule card on the Dashboard.
    """
    events = get_today_events()
    return [
        ScheduleEventResponse(
            id=e["id"],
            title=e["title"],
            description=e.get("description", ""),
            start_time=e["start_time"],
            end_time=e["end_time"],
            date=e["date"],
        )
        for e in events
    ]


@router.get("/", response_model=list[ScheduleEventResponse])
def all_events():
    """Get all schedule events."""
    events = get_all_events()
    return [
        ScheduleEventResponse(
            id=e["id"],
            title=e["title"],
            description=e.get("description", ""),
            start_time=e["start_time"],
            end_time=e["end_time"],
            date=e["date"],
        )
        for e in events
    ]


@router.post("/create", response_model=ScheduleEventResponse)
def new_event(data: ScheduleEventInput):
    """
    Create a new schedule event.
    Powers the "Schedule Meeting" button on EmailDetail page.
    """
    event = create_event(
        title=data.title,
        start_time=data.start_time,
        end_time=data.end_time,
        description=data.description or "",
        event_date=data.date,
    )
    return ScheduleEventResponse(
        id=event["id"],
        title=event["title"],
        description=event.get("description", ""),
        start_time=event["start_time"],
        end_time=event["end_time"],
        date=event["date"],
    )


@router.delete("/{event_id}")
def remove_event(event_id: str):
    """Delete a schedule event."""
    if not delete_event(event_id):
        raise HTTPException(status_code=404, detail="Event not found")
    return {"status": "deleted"}

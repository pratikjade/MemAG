"""
Schedule management service.
Handles calendar events with JSON file persistence.
"""

import json
import os
import logging
from datetime import datetime, date
from typing import Optional

from app.core.config import settings

logger = logging.getLogger(__name__)

DATA_FILE = os.path.join(settings.data_dir, "schedule.json")


def _ensure_data_dir():
    os.makedirs(settings.data_dir, exist_ok=True)


def _load_events() -> list[dict]:
    _ensure_data_dir()
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


def _save_events(events: list[dict]):
    _ensure_data_dir()
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2, ensure_ascii=False)


def _next_id(events: list[dict]) -> str:
    if not events:
        return "1"
    max_id = max(int(e.get("id", 0)) for e in events)
    return str(max_id + 1)


# ── Public API ─────────────────────────────────────────────────────────

def create_event(
    title: str,
    start_time: str,
    end_time: str,
    description: str = "",
    event_date: Optional[str] = None,
) -> dict:
    """Create a new schedule event."""
    events = _load_events()
    event_id = _next_id(events)

    if not event_date:
        event_date = date.today().isoformat()

    event = {
        "id": event_id,
        "title": title,
        "description": description,
        "start_time": start_time,
        "end_time": end_time,
        "date": event_date,
        "created_at": datetime.now().isoformat(),
    }

    events.append(event)
    _save_events(events)
    logger.info(f"Created event: {title} at {start_time}-{end_time}")
    return event


def get_today_events() -> list[dict]:
    """Get all events for today, sorted by start time."""
    events = _load_events()
    today = date.today().isoformat()
    today_events = [e for e in events if e.get("date") == today]
    today_events.sort(key=lambda e: e.get("start_time", ""))
    return today_events


def get_all_events() -> list[dict]:
    """Get all events sorted by date and start time."""
    events = _load_events()
    events.sort(key=lambda e: (e.get("date", ""), e.get("start_time", "")))
    return events


def delete_event(event_id: str) -> bool:
    """Delete an event by ID."""
    events = _load_events()
    original_len = len(events)
    events = [e for e in events if e.get("id") != event_id]
    if len(events) < original_len:
        _save_events(events)
        return True
    return False


def seed_demo_events():
    """
    Seed demo schedule events matching the frontend's Today's Schedule.
    Only seeds if no events exist yet.
    """
    events = _load_events()
    if events:
        return

    today = date.today().isoformat()
    demo_events = [
        {
            "title": "Executive Team Sync",
            "description": "Weekly alignment meeting",
            "start_time": "10:00",
            "end_time": "11:00",
            "event_date": today,
        },
        {
            "title": "Q4 Board Meeting",
            "description": "Strategic review with board members",
            "start_time": "15:00",
            "end_time": "16:30",
            "event_date": today,
        },
        {
            "title": "1:1 with Emily",
            "description": "Performance review discussion",
            "start_time": "17:00",
            "end_time": "17:30",
            "event_date": today,
        },
    ]

    for evt in demo_events:
        create_event(**evt)

    logger.info(f"Seeded {len(demo_events)} demo schedule events")

"""
Email processing service.
Handles storing, retrieving, and processing emails.
Uses JSON file persistence for development phase.
"""

import json
import os
import logging
from typing import Optional
from datetime import datetime

from app.core.config import settings
from app.langchain.memory import store_memory

logger = logging.getLogger(__name__)

# ── JSON File Storage ──────────────────────────────────────────────────
DATA_FILE = os.path.join(settings.data_dir, "emails.json")


def _ensure_data_dir():
    """Create data directory if it doesn't exist."""
    os.makedirs(settings.data_dir, exist_ok=True)


def _load_emails() -> dict:
    """Load emails from JSON file."""
    _ensure_data_dir()
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def _save_emails(emails: dict):
    """Save emails to JSON file."""
    _ensure_data_dir()
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(emails, f, indent=2, ensure_ascii=False)


# ── Email Counter ──────────────────────────────────────────────────────
def _next_id(emails: dict) -> str:
    """Generate next email ID."""
    if not emails:
        return "1"
    max_id = max(int(k) for k in emails.keys())
    return str(max_id + 1)


# ── Public API ─────────────────────────────────────────────────────────

def process_email(
    sender: str,
    subject: str,
    content: str,
    deadline: Optional[str] = None,
    email_type: Optional[str] = None,
    sender_email: Optional[str] = None,
) -> dict:
    """
    Process a new email: store it and add to semantic memory.
    Returns the stored email with generated ID.
    """
    emails = _load_emails()
    email_id = _next_id(emails)

    # Generate preview (first 100 chars of content)
    preview = content[:100].replace("\n", " ").strip()
    if len(content) > 100:
        preview += "..."

    # Classify type if not provided
    if not email_type:
        email_type = _classify_email_type(subject, preview)

    # Calculate time string
    time_str = datetime.now().strftime("%I:%M %p").lstrip("0")

    email_data = {
        "id": email_id,
        "sender": sender,
        "sender_email": sender_email or "",
        "subject": subject,
        "content": content,
        "preview": preview,
        "deadline": deadline or "No deadline",
        "type": email_type,
        "time": f"Just now",
        "created_at": datetime.now().isoformat(),
        "urgency": 0,  # Will be set by priority service
        "ai_summary": {
            "key_points": [],
            "suggested_actions": [],
        },
        "thread": [],
    }

    emails[email_id] = email_data
    _save_emails(emails)

    # Store in semantic memory for RAG retrieval
    memory_text = f"Email from {sender}: {subject}. {preview}"
    try:
        store_memory(memory_text)
        logger.info(f"Email {email_id} stored in semantic memory")
    except Exception as e:
        logger.warning(f"Failed to store email in memory: {e}")

    logger.info(f"Email processed: id={email_id}, from={sender}, subject={subject}")
    return email_data


def get_all_emails() -> list[dict]:
    """Get all emails, sorted by creation time (newest first)."""
    emails = _load_emails()
    email_list = list(emails.values())
    email_list.sort(key=lambda e: e.get("created_at", ""), reverse=True)
    return email_list


def get_email_by_id(email_id: str) -> Optional[dict]:
    """Get a single email by ID."""
    emails = _load_emails()
    return emails.get(email_id)


def update_email(email_id: str, updates: dict) -> Optional[dict]:
    """Update specific fields of an email."""
    emails = _load_emails()
    if email_id not in emails:
        return None
    emails[email_id].update(updates)
    _save_emails(emails)
    return emails[email_id]


def _classify_email_type(subject: str, preview: str) -> str:
    """Simple rule-based email classification (LLM version in summary_service)."""
    text = f"{subject} {preview}".lower()

    if any(kw in text for kw in ["meeting", "schedule", "calendar", "invite", "sync"]):
        return "Meeting request"
    elif any(kw in text for kw in ["urgent", "asap", "critical", "immediately"]):
        return "Urgent"
    elif any(kw in text for kw in ["follow up", "following up", "reminder", "checking in"]):
        return "Follow-up"
    elif any(kw in text for kw in ["fyi", "for your information", "heads up", "update"]):
        return "FYI"
    else:
        return "Email"


def seed_demo_emails():
    """
    Seed the system with demo emails matching the frontend's mock data.
    Only seeds if no emails exist yet.
    """
    emails = _load_emails()
    if emails:
        return  # Already seeded

    demo_emails = [
        {
            "sender": "Sarah Chen",
            "subject": "Q4 Board Meeting - Strategic Review",
            "content": (
                "Hi Pratik,\n\n"
                "I hope this message finds you well. I wanted to reach out regarding the "
                "upcoming Q4 Board Meeting scheduled for today at 3:00 PM.\n\n"
                "The board members have requested an updated strategic deck that covers:\n"
                "- Q4 performance metrics and key achievements\n"
                "- Updated financial projections for next quarter\n"
                "- Strategic initiatives and roadmap adjustments\n"
                "- Competitive landscape analysis\n\n"
                "Could you please share the latest version before the meeting? "
                "Several board members want to review it in advance.\n\n"
                "Also, we should discuss the Series C timeline and how it aligns "
                "with our growth strategy.\n\n"
                "Looking forward to your response.\n\n"
                "Best regards,\nSarah Chen\nChief of Staff"
            ),
            "deadline": "Today, 3:00 PM",
            "email_type": "Meeting request",
        },
        {
            "sender": "Mike Rodriguez",
            "subject": "Investor Update: Series C Timeline",
            "content": (
                "Hi Pratik,\n\n"
                "Following up on our conversation about the Series C timeline and next steps. "
                "The lead investors are looking for an update on our metrics and growth trajectory.\n\n"
                "Key items to address:\n"
                "- Current MRR and growth rate\n"
                "- Customer acquisition cost trends\n"
                "- Projected runway with current funding\n"
                "- Timeline expectations for Series C close\n\n"
                "Can we sync tomorrow morning to finalize the investor deck? "
                "I'd like to get this out by end of week.\n\n"
                "Best,\nMike Rodriguez\nVP Finance"
            ),
            "deadline": "Tomorrow, 10:00 AM",
            "email_type": "Email",
        },
        {
            "sender": "Emily Watson",
            "subject": "Team Performance Reviews - Q4",
            "content": (
                "Hi Pratik,\n\n"
                "Reminder: Performance reviews are due by end of week. "
                "12 reports are pending your review and approval.\n\n"
                "Please prioritize the following:\n"
                "- Engineering team leads (4 reviews)\n"
                "- Product team (3 reviews)\n"
                "- Design team (2 reviews)\n"
                "- Operations (3 reviews)\n\n"
                "HR needs the finalized reviews by Friday for compensation planning.\n\n"
                "Let me know if you need any additional context on any team members.\n\n"
                "Thanks,\nEmily Watson\nHR Director"
            ),
            "deadline": "This week",
            "email_type": "Email",
        },
        {
            "sender": "David Park",
            "subject": "Product Roadmap Alignment",
            "content": (
                "Hi Pratik,\n\n"
                "We need to sync on Q1 priorities and engineering capacity. "
                "The product team has drafted the roadmap but we need executive alignment "
                "on resource allocation.\n\n"
                "Topics to discuss:\n"
                "- Feature priorities for Q1\n"
                "- Engineering team scaling plan\n"
                "- Technical debt backlog\n"
                "- Cross-team dependencies\n\n"
                "I've blocked time next Monday for this. "
                "Please review the draft roadmap doc I shared in Notion.\n\n"
                "Thanks,\nDavid Park\nVP Engineering"
            ),
            "deadline": "Next Monday",
            "email_type": "Email",
        },
        {
            "sender": "Lisa Anderson",
            "subject": "Marketing Campaign Results",
            "content": (
                "Hi Pratik,\n\n"
                "The Q4 marketing campaign results are in. Here's a quick overview:\n\n"
                "- Lead generation: 2,400 new MQLs (up 35% QoQ)\n"
                "- Conversion rate: 12.5% (above target)\n"
                "- CAC reduction: 18% improvement\n"
                "- Brand awareness: 40% increase in organic searches\n\n"
                "I've prepared a detailed deck for the board meeting. "
                "Would love to walk you through the highlights before presenting.\n\n"
                "Best,\nLisa Anderson\nVP Marketing"
            ),
            "deadline": "Next week",
            "email_type": "Email",
        },
    ]

    for email_data in demo_emails:
        process_email(**email_data)

    logger.info(f"Seeded {len(demo_emails)} demo emails")

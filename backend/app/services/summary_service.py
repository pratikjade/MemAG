"""
AI Summary service.
Generates email summaries and dashboard briefings using LLM.
Falls back to rule-based extraction when no LLM is available.
"""

import json
import logging
from typing import Optional

from app.core.llm import get_llm, parse_llm_json_response
from app.core.prompts import EMAIL_SUMMARY_PROMPT, DASHBOARD_SUMMARY_PROMPT

logger = logging.getLogger(__name__)


def generate_email_summary(sender: str, subject: str, content: str) -> dict:
    """
    Generate AI summary for a single email.
    Returns dict with key_points and suggested_actions.
    """
    llm = get_llm()

    if llm is None:
        return _fallback_email_summary(sender, subject, content)

    try:
        prompt = EMAIL_SUMMARY_PROMPT.format(
            sender=sender,
            subject=subject,
            content=content,
        )
        response = llm.invoke(prompt)
        result = parse_llm_json_response(response)
        return {
            "key_points": result.get("key_points", []),
            "suggested_actions": result.get("suggested_actions", []),
        }
    except Exception as e:
        logger.error(f"LLM email summary failed: {e}")
        return _fallback_email_summary(sender, subject, content)


def generate_dashboard_summary(emails: list[dict]) -> dict:
    """
    Generate dashboard morning briefing from a list of emails.
    """
    llm = get_llm()

    if llm is None or not emails:
        return _fallback_dashboard_summary(emails)

    try:
        emails_text = "\n".join(
            f"- From: {e['sender']}, Subject: {e['subject']}, "
            f"Deadline: {e.get('deadline', 'None')}, Urgency: {e.get('urgency', 0)}"
            for e in emails
        )
        prompt = DASHBOARD_SUMMARY_PROMPT.format(emails_summary=emails_text)
        response = llm.invoke(prompt)
        result = parse_llm_json_response(response)
        return result
    except Exception as e:
        logger.error(f"LLM dashboard summary failed: {e}")
        return _fallback_dashboard_summary(emails)


# ── Fallback (No LLM) ─────────────────────────────────────────────────

def _fallback_email_summary(sender: str, subject: str, content: str) -> dict:
    """Rule-based fallback summary when LLM is unavailable."""
    key_points = []
    suggested_actions = []

    # Extract key points from content structure
    lines = content.strip().split("\n")
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("-") or stripped.startswith("•"):
            point = stripped.lstrip("-•").strip()
            if point and len(key_points) < 4:
                key_points.append(point)

    if not key_points:
        key_points = [
            f"{subject} from {sender}",
            f"Review the email content and respond accordingly",
        ]

    # Generate basic suggested actions
    subject_lower = subject.lower()
    if "meeting" in subject_lower or "sync" in subject_lower:
        suggested_actions.append(f"Confirm meeting with {sender}")
        suggested_actions.append("Prepare any required materials")
    if "review" in subject_lower:
        suggested_actions.append("Complete the requested review")
    if "update" in subject_lower:
        suggested_actions.append("Review the update and provide feedback")

    if not suggested_actions:
        suggested_actions = [
            f"Reply to {sender}",
            f"Review and take action on '{subject}'",
        ]

    return {
        "key_points": key_points[:4],
        "suggested_actions": suggested_actions[:3],
    }


def _fallback_dashboard_summary(emails: list[dict]) -> dict:
    """Rule-based fallback dashboard summary."""
    if not emails:
        return {
            "high_priority_count": 0,
            "high_priority_description": "No emails in inbox",
            "replies_ready_count": 0,
            "replies_ready_description": "",
            "meeting_requests": 0,
            "meeting_description": "",
            "time_sensitive_count": 0,
        }

    high_priority = [e for e in emails if e.get("urgency", 0) >= 85]
    meetings = [e for e in emails if e.get("type") == "Meeting request"]
    time_sensitive = [
        e for e in emails
        if any(kw in e.get("deadline", "").lower() for kw in ["today", "tomorrow", "asap"])
    ]

    # Build sender names for reply description
    top_senders = [e["sender"].split()[0] for e in emails[:2]]
    reply_desc = " and ".join(top_senders) if top_senders else ""

    return {
        "high_priority_count": len(high_priority),
        "high_priority_description": _build_priority_desc(high_priority),
        "replies_ready_count": min(len(emails), 2),
        "replies_ready_description": f"Draft responses prepared for {reply_desc}" if reply_desc else "",
        "meeting_requests": len(meetings),
        "meeting_description": _build_meeting_desc(meetings),
        "time_sensitive_count": len(time_sensitive),
    }


def _build_priority_desc(high_priority: list[dict]) -> str:
    """Build description string for high-priority items."""
    if not high_priority:
        return "No high-priority items"
    subjects = [e["subject"].split("-")[0].strip().lower() for e in high_priority[:3]]
    return ", ".join(subjects) + (f", and {len(high_priority) - 3} more" if len(high_priority) > 3 else "")


def _build_meeting_desc(meetings: list[dict]) -> str:
    """Build description string for meeting requests."""
    if not meetings:
        return ""
    return f"{meetings[0]['sender']} is requesting time for {meetings[0]['subject'].split('-')[0].strip().lower()}"

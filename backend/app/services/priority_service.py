"""
Priority scoring service.
Calculates email priority using a weighted scoring system:
  - Deadline Weight:  0-50 points (time-based urgency)
  - Sender Weight:    0-30 points (sender importance)
  - AI Urgency:       0-20 points (NLP-detected urgency signals)

Total score: 0-100
"""

import json
import logging
from datetime import datetime

from app.core.llm import get_llm
from app.core.prompts import PRIORITY_SCORING_PROMPT
from app.services.email_service import get_all_emails, update_email

logger = logging.getLogger(__name__)

# ── Sender Importance Tiers ────────────────────────────────────────────
# In production, this would come from a contacts database or org chart.
SENDER_WEIGHTS = {
    # C-suite / Board → highest weight
    "Sarah Chen": 28,      # Chief of Staff
    # VP-level → high weight
    "Mike Rodriguez": 26,   # VP Finance
    "David Park": 25,       # VP Engineering
    "Emily Watson": 24,     # HR Director
    "Lisa Anderson": 22,    # VP Marketing
}
DEFAULT_SENDER_WEIGHT = 15


# ── Deadline Scoring ───────────────────────────────────────────────────

def _calculate_deadline_weight(deadline: str) -> tuple[int, str]:
    """
    Calculate deadline urgency score (0-50).
    Returns (score, reasoning).
    """
    deadline_lower = deadline.lower().strip()

    if "overdue" in deadline_lower or "past due" in deadline_lower:
        return 50, "Item is overdue — maximum deadline urgency"
    elif "today" in deadline_lower or "now" in deadline_lower:
        return 45, "Deadline is today — extremely time-sensitive"
    elif "tomorrow" in deadline_lower:
        return 40, "Deadline is tomorrow — high time pressure"
    elif "this week" in deadline_lower:
        return 35, "Due this week — significant time pressure"
    elif "next monday" in deadline_lower or "next week" in deadline_lower:
        return 30, "Due next week — moderate time pressure"
    elif "next month" in deadline_lower or "this month" in deadline_lower:
        return 20, "Due this month — standard timeline"
    elif "no deadline" in deadline_lower or not deadline_lower:
        return 10, "No explicit deadline set"
    else:
        return 25, f"Deadline: {deadline} — moderate urgency"


# ── Sender Scoring ─────────────────────────────────────────────────────

def _calculate_sender_weight(sender: str) -> tuple[int, str]:
    """
    Calculate sender importance score (0-30).
    Returns (score, reasoning).
    """
    weight = SENDER_WEIGHTS.get(sender, DEFAULT_SENDER_WEIGHT)

    if weight >= 27:
        reasoning = f"{sender} is C-suite/Board level — highest sender priority"
    elif weight >= 24:
        reasoning = f"{sender} is VP/Director level — high sender priority"
    elif weight >= 20:
        reasoning = f"{sender} is senior leadership — elevated sender priority"
    else:
        reasoning = f"{sender} — standard sender priority"

    return weight, reasoning


# ── AI Urgency Scoring ─────────────────────────────────────────────────

def _calculate_ai_urgency(
    sender: str, subject: str, deadline: str, preview: str
) -> tuple[int, str]:
    """
    Calculate AI urgency score (0-20) using LLM or fallback.
    Returns (score, reasoning).
    """
    llm = get_llm()

    if llm is not None:
        try:
            prompt = PRIORITY_SCORING_PROMPT.format(
                sender=sender, subject=subject, deadline=deadline, preview=preview
            )
            response = llm.invoke(prompt)
            result = json.loads(response.content)
            score = min(20, max(0, int(result.get("ai_urgency_score", 15))))
            reasoning = result.get("reasoning", "AI-assessed urgency")
            return score, reasoning
        except Exception as e:
            logger.warning(f"LLM urgency scoring failed: {e}")

    # Fallback: keyword-based urgency
    return _fallback_ai_urgency(subject, preview)


def _fallback_ai_urgency(subject: str, preview: str) -> tuple[int, str]:
    """Rule-based fallback for urgency scoring."""
    text = f"{subject} {preview}".lower()
    score = 10  # Baseline
    reasons = []

    # Urgency signals
    if any(kw in text for kw in ["urgent", "asap", "critical", "immediately"]):
        score += 6
        reasons.append("urgency signals detected")
    if any(kw in text for kw in ["blocking", "blocked", "dependency", "waiting on"]):
        score += 4
        reasons.append("blocking issues mentioned")
    if any(kw in text for kw in ["board", "investor", "series", "funding"]):
        score += 3
        reasons.append("high-stakes business context")
    if any(kw in text for kw in ["review", "approval", "sign off", "decision"]):
        score += 2
        reasons.append("action/decision required")
    if any(kw in text for kw in ["reminder", "follow up", "pending"]):
        score += 2
        reasons.append("follow-up/reminder context")

    score = min(20, score)
    reasoning = "; ".join(reasons) if reasons else "Standard urgency level"
    return score, reasoning


# ── Public API ─────────────────────────────────────────────────────────

def score_email(email: dict) -> dict:
    """
    Calculate full priority score for a single email.
    Returns updated email dict with urgency and breakdown.
    """
    deadline_weight, deadline_reason = _calculate_deadline_weight(
        email.get("deadline", "No deadline")
    )
    sender_weight, sender_reason = _calculate_sender_weight(
        email.get("sender", "Unknown")
    )
    ai_urgency, urgency_reason = _calculate_ai_urgency(
        sender=email.get("sender", ""),
        subject=email.get("subject", ""),
        deadline=email.get("deadline", ""),
        preview=email.get("preview", ""),
    )

    total_score = deadline_weight + sender_weight + ai_urgency

    return {
        "total_score": total_score,
        "deadline_weight": deadline_weight,
        "sender_weight": sender_weight,
        "ai_urgency": ai_urgency,
        "deadline_reasoning": deadline_reason,
        "sender_reasoning": sender_reason,
        "urgency_reasoning": urgency_reason,
    }


def score_all_emails() -> list[dict]:
    """
    Score all emails and return ranked list.
    Also updates stored emails with urgency scores.
    """
    emails = get_all_emails()
    scored = []

    for email in emails:
        scores = score_email(email)

        # Update stored email with urgency score
        update_email(email["id"], {"urgency": scores["total_score"]})

        scored.append({
            "id": email["id"],
            "sender": email["sender"],
            "subject": email["subject"],
            "deadline": email.get("deadline", "No deadline"),
            "total_score": scores["total_score"],
            "deadline_weight": scores["deadline_weight"],
            "sender_weight": scores["sender_weight"],
            "ai_urgency": scores["ai_urgency"],
            "deadline_reasoning": scores["deadline_reasoning"],
            "sender_reasoning": scores["sender_reasoning"],
            "urgency_reasoning": scores["urgency_reasoning"],
        })

    # Sort by total score descending, assign ranks
    scored.sort(key=lambda x: x["total_score"], reverse=True)
    for i, item in enumerate(scored):
        item["rank"] = i + 1

    return scored


def get_priority_explanation(email_id: str) -> dict | None:
    """Get detailed priority explanation for a specific email."""
    emails = get_all_emails()
    email = next((e for e in emails if e["id"] == email_id), None)

    if not email:
        return None

    scores = score_email(email)
    return {
        "id": email_id,
        "sender": email["sender"],
        "subject": email["subject"],
        **scores,
    }

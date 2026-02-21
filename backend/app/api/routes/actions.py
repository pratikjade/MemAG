"""
Priority & Actions API routes.
Handles priority scoring and dashboard summary.
"""

from fastapi import APIRouter, HTTPException

from app.api.schemas.action_schema import PriorityEmailItem, PriorityExplanation
from app.api.schemas.summary_schema import DashboardSummary
from app.services.priority_service import score_all_emails, get_priority_explanation
from app.services.summary_service import generate_dashboard_summary
from app.services.email_service import get_all_emails

router = APIRouter()


@router.get("/priority/scores", response_model=list[PriorityEmailItem])
def get_priority_scores():
    """
    Get all emails with priority scores, ranked.
    Powers the Priority Engine page.
    """
    scored = score_all_emails()
    return [
        PriorityEmailItem(
            id=e["id"],
            rank=e["rank"],
            sender=e["sender"],
            subject=e["subject"],
            deadline=e["deadline"],
            total_score=e["total_score"],
            deadline_weight=e["deadline_weight"],
            sender_weight=e["sender_weight"],
            ai_urgency=e["ai_urgency"],
        )
        for e in scored
    ]


@router.get("/priority/explain/{email_id}", response_model=PriorityExplanation)
def explain_priority(email_id: str):
    """
    Get detailed priority explanation for a specific email.
    Powers the "Explain ranking" button on Priority Engine page.
    """
    explanation = get_priority_explanation(email_id)
    if not explanation:
        raise HTTPException(status_code=404, detail="Email not found")
    return explanation


@router.get("/dashboard/summary", response_model=DashboardSummary)
def get_dashboard_summary():
    """
    Get AI-generated dashboard summary.
    Powers the AI Summary card on the Dashboard page.
    """
    emails = get_all_emails()
    summary = generate_dashboard_summary(emails)
    return DashboardSummary(**summary)

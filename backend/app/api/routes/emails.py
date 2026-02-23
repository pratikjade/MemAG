"""
Email API routes.
Handles email processing, retrieval, AI summaries, and reply generation.
"""

import asyncio
import logging

from fastapi import APIRouter, HTTPException

from app.api.schemas.email_schema import (
    EmailProcessInput,
    EmailResponse,
    EmailListItem,
    ReplyRequest,
    ReplyResponse,
    AISummary,
)
from app.services.email_service import (
    process_email,
    get_all_emails,
    get_email_by_id,
    update_email,
)
from app.services.summary_service import generate_email_summary
from app.services.priority_service import score_email
from app.agents.reply_agent import generate_reply

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/process", response_model=dict)
async def process_new_email(data: EmailProcessInput):
    """
    Process a new incoming email.
    Stores it, generates AI summary, and calculates priority score.
    """
    # Store the email (fast, no LLM involved)
    email = process_email(
        sender=data.sender,
        subject=data.subject,
        content=data.content,
        deadline=data.deadline,
        email_type=data.type,
        sender_email=data.sender_email,
    )

    # Run AI summary + priority scoring CONCURRENTLY (both are LLM calls)
    summary_task = asyncio.to_thread(
        generate_email_summary,
        sender=data.sender,
        subject=data.subject,
        content=data.content,
    )
    score_task = asyncio.to_thread(score_email, email)

    summary, scores = await asyncio.gather(summary_task, score_task)

    # Apply results
    update_email(email["id"], {
        "ai_summary": summary,
        "urgency": scores["total_score"],
    })

    # Return updated email
    updated = get_email_by_id(email["id"])
    return {"status": "processed", "email": updated}


@router.get("/", response_model=list[EmailListItem])
def list_emails():
    """
    Get all emails for the Priority Inbox.
    Returns emails sorted by urgency score (highest first).
    """
    emails = get_all_emails()

    # Sort by urgency descending
    emails.sort(key=lambda e: e.get("urgency", 0), reverse=True)

    return [
        EmailListItem(
            id=e["id"],
            sender=e["sender"],
            subject=e["subject"],
            urgency=e.get("urgency", 0),
            deadline=e.get("deadline", "No deadline"),
            type=e.get("type", "Email"),
            preview=e.get("preview", ""),
        )
        for e in emails
    ]


@router.get("/{email_id}", response_model=EmailResponse)
def get_email(email_id: str):
    """
    Get full email detail including AI summary.
    Used by the EmailDetail page.
    """
    email = get_email_by_id(email_id)
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")

    ai_summary = email.get("ai_summary", {})

    return EmailResponse(
        id=email["id"],
        sender=email["sender"],
        subject=email["subject"],
        time=email.get("time", ""),
        urgency=email.get("urgency", 0),
        deadline=email.get("deadline", "No deadline"),
        type=email.get("type", "Email"),
        content=email.get("content", ""),
        preview=email.get("preview", ""),
        ai_summary=AISummary(
            key_points=ai_summary.get("key_points", []),
            suggested_actions=ai_summary.get("suggested_actions", []),
        ),
        thread=email.get("thread", []),
    )


@router.post("/{email_id}/reply", response_model=ReplyResponse)
def generate_email_reply(email_id: str, data: ReplyRequest):
    """
    Generate an AI reply for a specific email.
    Supports tones: concise, formal, direct.
    """
    email = get_email_by_id(email_id)
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")

    reply_text = generate_reply(
        sender=email["sender"],
        subject=email["subject"],
        content=email.get("content", ""),
        tone=data.tone,
    )

    return ReplyResponse(reply_text=reply_text, tone=data.tone)


@router.post("/{email_id}/summarize")
def summarize_email(email_id: str):
    """Re-generate AI summary for an email."""
    email = get_email_by_id(email_id)
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")

    summary = generate_email_summary(
        sender=email["sender"],
        subject=email["subject"],
        content=email.get("content", ""),
    )
    update_email(email_id, {"ai_summary": summary})

    return {"status": "summarized", "ai_summary": summary}

"""
Prompt templates for all AI-powered features in MemAG.
Each prompt is designed to produce structured, parseable output.
"""

# ── Email Summary Prompt ───────────────────────────────────────────────
EMAIL_SUMMARY_PROMPT = """You are an AI executive assistant analyzing an email for a busy professional.

Analyze the following email and provide:
1. A list of 2-4 key points (most important information)
2. A list of 2-3 suggested actions the user should take

Email Details:
- From: {sender}
- Subject: {subject}
- Content: {content}

Respond in this exact JSON format:
{{
    "key_points": [
        "point 1",
        "point 2",
        "point 3"
    ],
    "suggested_actions": [
        "action 1",
        "action 2",
        "action 3"
    ]
}}
"""


# ── Priority Scoring Prompt ────────────────────────────────────────────
PRIORITY_SCORING_PROMPT = """You are an AI urgency analyzer for an executive's email inbox.

Analyze the following email and score its urgency from 0-20 based on:
- Time sensitivity and explicit deadlines
- Blocking issues or dependencies mentioned
- Urgency signals in the language (ASAP, urgent, critical, etc.)
- Impact if delayed

Email Details:
- From: {sender}
- Subject: {subject}
- Deadline: {deadline}
- Content Preview: {preview}

Respond in this exact JSON format:
{{
    "ai_urgency_score": <number 0-20>,
    "reasoning": "Brief explanation of urgency assessment"
}}
"""


# ── Reply Generation Prompt ────────────────────────────────────────────
REPLY_GENERATION_PROMPT = """You are an AI assistant drafting an email reply on behalf of {user_name}.

Compose a reply to the following email in a {tone} tone.

Original Email:
- From: {sender}
- Subject: {subject}
- Content: {content}

Key context from memory:
{memory_context}

Tone guidelines:
- Concise: Short, to the point, no unnecessary pleasantries. 2-3 sentences max.
- Formal: Professional language, proper salutations, thorough but measured.
- Direct: Clear and actionable, addresses each point explicitly, no ambiguity.

Write ONLY the reply body text. Do not include "Subject:" or email headers.
Start with the greeting and end with the sign-off.
"""


# ── Dashboard AI Summary Prompt ────────────────────────────────────────
DASHBOARD_SUMMARY_PROMPT = """You are an AI executive assistant creating a morning briefing.

Given these emails in the user's inbox, create a brief summary of priorities for today.

Emails:
{emails_summary}

Respond in this exact JSON format:
{{
    "high_priority_count": <number>,
    "high_priority_description": "Brief description of urgent items",
    "replies_ready_count": <number>,
    "replies_ready_description": "Who needs replies",
    "meeting_requests": <number>,
    "meeting_description": "Brief description of meeting requests",
    "time_sensitive_count": <number>
}}
"""


# ── Email Type Classification Prompt ───────────────────────────────────
EMAIL_CLASSIFICATION_PROMPT = """Classify this email into one of these types:
- Meeting request
- Action required
- FYI / Informational
- Follow-up
- Urgent

Email Subject: {subject}
Email Preview: {preview}

Respond with ONLY the type label, nothing else.
"""

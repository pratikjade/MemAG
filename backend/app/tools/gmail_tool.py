from langchain_core.tools import tool

@tool
def send_email(to: str, subject: str, body: str) -> str:
    """Send an email using Gmail API."""
    return f"Email mock-sent to {to} with subject: {subject}"

@tool
def read_emails(query: str, limit: int = 5) -> str:
    """Read recent emails from Gmail matching a query."""
    return f"Mock read emails matching '{query}' (limit {limit})"

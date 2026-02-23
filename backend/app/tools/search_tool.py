from langchain_core.tools import tool

@tool
def search_web(query: str) -> str:
    """Search the web for real-time information to augment context."""
    return f"Mock search results for: '{query}'"

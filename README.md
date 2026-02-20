# MemAG - Memory-Augmented Multi-Agent Email Assistant

A production-grade AI system using **LangChain** and **LangGraph** for intelligent email processing with persistent memory.

## 🎯 Overview

MemAG implements the **lesson_5.ipynb** pattern from AI Agents course, featuring:

- ✅ **LangGraph StateGraph** for workflow orchestration
- ✅ **LangGraph InMemoryStore** with semantic search
- ✅ **LangMem** for memory management tools
- ✅ **LangChain create_react_agent** for ReAct pattern
- ✅ **Three types of memory**: Semantic, Episodic, Procedural

## 🏗️ Architecture

### Email Processing Workflow

```
START
  ↓
triage_router (classify email using procedural memory + few-shot examples)
  ↓
  ├─→ IGNORE → END
  ├─→ NOTIFY → END
  └─→ RESPOND → response_agent (ReAct with tools) → END
```

### Three Types of Memory

1. **Semantic Memory** - Long-term facts about contacts, preferences
2. **Episodic Memory** - Past email examples for few-shot learning
3. **Procedural Memory** - Dynamic instructions and triage rules

## 📦 Installation

```bash
# Clone repository
cd MemAG

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -e .
```

## 🔧 Configuration

Create `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## 🚀 Quick Start

### Run the Example

```bash
python examples/basic_usage.py
```

### Use in Your Code

```python
from memag.agents.email_agent import create_email_agent

# Create agent
agent = create_email_agent()

# Process email
email_input = {
    "author": "alice@company.com",
    "to": "john@company.com",
    "subject": "Quick question",
    "email_thread": "Hi John, can you help with..."
}

config = {"configurable": {"langgraph_user_id": "john_doe"}}

response = agent.invoke({"email_input": email_input}, config=config)

# View results
for msg in response["messages"]:
    print(f"{msg.type}: {msg.content}")
```

## 💾 Memory Management

```python
from memag.memory.manager import MemoryManager

memory = MemoryManager("user_id")

# Procedural memory (instructions)
memory.update_prompt("agent_instructions", "Always be concise")
instructions = memory.get_prompt("agent_instructions")

# Semantic memory (facts)
memory.store_memory("Alice prefers morning meetings")
results = memory.search_memories("meeting preferences")

# Episodic memory (examples)
memory.store_example(email_dict, label="respond")
similar = memory.search_examples(new_email)
```

## 🛠️ Available Tools

The agent has access to:

1. **write_email** - Send emails
2. **schedule_meeting** - Schedule calendar meetings
3. **check_calendar_availability** - Check available times
4. **manage_memory** - Store information in long-term memory
5. **search_memory** - Search stored memories

## 📁 Project Structure

```
MemAG/
├── src/memag/
│   ├── agents/
│   │   └── email_agent.py      # LangGraph workflow
│   ├── core/
│   │   ├── llm.py              # LangChain LLM
│   │   ├── prompts.py          # Prompt templates
│   │   └── config.py           # Configuration
│   ├── memory/
│   │   └── manager.py          # InMemoryStore wrapper
│   └── tools/
│       ├── gmail_tool.py       # Email tools
│       └── memory_tools.py     # LangMem tools
├── examples/
│   └── basic_usage.py          # Working example
└── tests/                      # Test suite
```

## 📚 Documentation

- **[LANGCHAIN_IMPLEMENTATION.md](LANGCHAIN_IMPLEMENTATION.md)** - Complete implementation guide
- **[CLEANUP_SUMMARY.md](CLEANUP_SUMMARY.md)** - What changed from original
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide

## 🎓 Key Concepts

### Triage Classification

Emails are automatically classified as:
- **IGNORE** - Marketing, spam, mass announcements
- **NOTIFY** - Important info that doesn't need response
- **RESPOND** - Requires a reply

### Dynamic Prompts

Instructions can be updated based on feedback:

```python
from langmem import create_multi_prompt_optimizer

optimizer = create_multi_prompt_optimizer(
    "anthropic:claude-3-5-sonnet-latest",
    kind="prompt_memory"
)

# Update prompts based on conversation feedback
updated = optimizer.invoke({
    "trajectories": [(messages, "Always sign emails 'John Doe'")],
    "prompts": prompts
})
```

## 🧪 Testing

```bash
# Run tests
pytest

# Run example
python examples/basic_usage.py
```

## 🔐 Security

- Never commit `.env` file
- Use environment variables for API keys
- Implement authentication for production use

## 📝 License

MIT License - see LICENSE file

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines

## 🗺️ Roadmap

- [x] LangGraph StateGraph workflow
- [x] InMemoryStore with semantic search
- [x] LangMem memory tools
- [x] Three types of memory
- [ ] Actual Gmail API integration
- [ ] FastAPI endpoints for LangGraph
- [ ] Prompt optimization workflow
- [ ] Human-in-the-loop feedback
- [ ] Web UI

## 📊 Status

**Current Version**: 0.2.0 (LangChain/LangGraph)

✅ Core workflow implemented  
✅ Memory system working  
✅ Example ready to run  
⚠️ API routes need refactoring  
⚠️ Tests need updating  

## 📧 Support

- **Documentation**: See docs in this repository
- **Issues**: Open a GitHub issue
- **Reference**: Based on lesson_5.ipynb from AI Agents course

---

**Built with LangChain, LangGraph, and LangMem** 🚀
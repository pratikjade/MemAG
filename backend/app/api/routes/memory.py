from fastapi import APIRouter
from pydantic import BaseModel
from app.langchain.memory import store_memory, search_memory

router = APIRouter()


class MemoryInput(BaseModel):
    text: str


class MemoryQuery(BaseModel):
    query: str


@router.post("/store")
def store(data: MemoryInput):
    return store_memory(data.text)


@router.post("/search")
def search(data: MemoryQuery):
    return search_memory(data.query)
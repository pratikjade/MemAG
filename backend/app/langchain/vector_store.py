from langchain_chroma import Chroma
from app.langchain.embeddings import get_embeddings
from app.core.config import settings


def get_vector_store():
    embeddings = get_embeddings()

    vector_store = Chroma(
        persist_directory=settings.vector_db_path,
        embedding_function=embeddings,
        collection_name=settings.vector_db_collection,
    )

    return vector_store
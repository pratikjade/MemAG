from langchain_community.vectorstores import Chroma
from app.langchain.embeddings import get_embeddings

DB_PATH = "./memory_db"


def get_vector_store():
    embeddings = get_embeddings()

    vector_store = Chroma(
        persist_directory=DB_PATH,
        embedding_function=embeddings
    )

    return vector_store
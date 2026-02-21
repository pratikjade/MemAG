from app.langchain.vector_store import get_vector_store


def store_memory(text: str):

    vector_store = get_vector_store()

    vector_store.add_texts([text])

    return {"status": "stored"}


def search_memory(query: str):

    vector_store = get_vector_store()

    docs = vector_store.similarity_search(query, k=3)

    return [doc.page_content for doc in docs]
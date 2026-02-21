from langchain_huggingface import HuggingFaceEmbeddings
#from langchain_openai import OpenAIEmbeddings

def get_embeddings():
    return HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2" #"text-embedding-3-small"
    )
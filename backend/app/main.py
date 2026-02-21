from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from app.api.routes.router import router


app = FastAPI(
    title="MemAG API",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def root():
    return {"message": "MemAG backend running"}
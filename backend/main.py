from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
import os

app = FastAPI()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client.chatbot

class ChatMessage(BaseModel):
    user_query: str
    bot_response: str

@app.post("/chat")
async def chat_endpoint(chat: ChatMessage):
    # Save chat to MongoDB
    await db.chats.insert_one(chat.dict())
    return {"message": "Chat saved", "response": chat.bot_response}

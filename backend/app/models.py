from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Note(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    content: str = ""
    created_at: datetime = Field(default_factory=datetime.utcnow)

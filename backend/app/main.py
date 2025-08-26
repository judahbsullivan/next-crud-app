from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select, Session
from .models import Todo, Note
from .db import init_db, get_session
import httpx

app = FastAPI()
origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods="*", allow_headers="*")

@app.on_event("startup")
def on_startup() -> None:
    init_db()

@app.get("/health")
def health() -> dict:
    return {"status": "ok"}

@app.get("/todos")
def list_todos(session: Session = Depends(get_session)):
    return session.exec(select(Todo).order_by(Todo.created_at.desc())).all()

@app.post("/todos", status_code=201)
def create_todo(todo: Todo, session: Session = Depends(get_session)):
    todo.id = None
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, todo: Todo, session: Session = Depends(get_session)):
    item = session.get(Todo, todo_id)
    if not item:
        raise HTTPException(404, "Todo not found")
    item.title = todo.title
    item.completed = todo.completed
    session.add(item)
    session.commit()
    session.refresh(item)
    return item

@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int, session: Session = Depends(get_session)):
    item = session.get(Todo, todo_id)
    if not item:
        raise HTTPException(404, "Todo not found")
    session.delete(item)
    session.commit()
    return None

@app.get("/notes")
def list_notes(session: Session = Depends(get_session)):
    return session.exec(select(Note).order_by(Note.created_at.desc())).all()

@app.post("/notes", status_code=201)
def create_note(note: Note, session: Session = Depends(get_session)):
    note.id = None
    session.add(note)
    session.commit()
    session.refresh(note)
    return note

@app.put("/notes/{note_id}")
def update_note(note_id: int, note: Note, session: Session = Depends(get_session)):
    item = session.get(Note, note_id)
    if not item:
        raise HTTPException(404, "Note not found")
    item.title = note.title
    item.content = note.content
    session.add(item)
    session.commit()
    session.refresh(item)
    return item

@app.delete("/notes/{note_id}", status_code=204)
def delete_note(note_id: int, session: Session = Depends(get_session)):
    item = session.get(Note, note_id)
    if not item:
        raise HTTPException(404, "Note not found")
    session.delete(item)
    session.commit()
    return None

@app.get("/weather")
async def weather(lat: float, lon: float):
    url = ("https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m".format(lat=lat, lon=lon))
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.get(url)
        r.raise_for_status()
        data = r.json()
        return data.get("current", {})

from sqlmodel import SQLModel, Session, create_engine

engine = create_engine("sqlite:///backend.db", echo=False)

def init_db() -> None:
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

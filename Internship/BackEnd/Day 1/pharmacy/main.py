from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pharmacy.routers import admin, users, inventory
from pharmacy.database.core import Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    #Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    yield

app = FastAPI(lifespan=lifespan)
app.include_router(admin.router)
app.include_router(users.router)
app.include_router(inventory.router)

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "http://localhost:63342",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

'''
@app.get("/ping")
def ping_pong():
    return {"message": "pong"}

@app.get("/name/{first_name}")  # curly braces around making it a variable
def get_first_name(first_name: str) -> dict[str, str]:
    return{"name": "first_name"}


@app.post("/name")  
def get_surname(surname: str = Body()) -> dict[str, str]: # will appear in the body in the page
    return{"name": "surname"}


@app.post("/Fullname")
def get_full_name(Full_name: str = Body()) -> dict[str,str]:
    return{"Fullname": Full_name.split(' ')}

@app.post("/join_name")
def get_full_name(name: str = Body()) -> dict[str,str]:
    return{"join_name": name.replace('-')}
'''
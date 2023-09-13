from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from BackEnd.routers import admin_routers, user_routers, inventory_routers
from BackEnd.database.database_core import Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    #Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    yield

app = FastAPI(lifespan=lifespan)
app.include_router(admin_routers.router)
app.include_router(user_routers.router)
app.include_router(inventory_routers.router)

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




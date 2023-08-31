from typing import List
from fastapi import FastAPI, HTTPException
from uuid import UUID
from model import User, Gender, Role, UserUpdateRequest

app = FastAPI()

database: List[User] = [
    User(
        id=UUID("79f3efce-dd2e-41f8-a4ba-c5784647bc8f"), 
        first_name="Jane", 
        last_name="Nakita",
        middle_name="Middle",
        gender=Gender.female,
        roles=[Role.student]
    ),
    User(
        id=UUID("6a90711b-cf88-4f80-a976-75b4ff22a3f4"), 
        first_name="Damian", 
        last_name="Turkson",
        middle_name="Middle",
        gender=Gender.male,
        roles=[Role.admin, Role.user]
    )
]

@app.get("/")
def root():
    return {"Hello": "World"}

@app.get("/api/v1/users")
async def fetch_users():
    return database

@app.post("/api/v1/users")
async def register_user(user: User):
    database.append(user)
    return {"id": user.id}

@app.delete("/api/v1/users/{user_id}")
async def delete_user(user_id: UUID):
    for user in database:
        if user.id == user_id:
            database.remove(user)
            return
    raise HTTPException(
        status_code = 404,
        detail=f"user with id: {user_id} does not exist"
    )

@app.put("/api/v1/users/{user_id}")
async def updat_user(user_update: UserUpdateRequest, user_id: UUID):
    for user in database:
        if user.id == user_id:
            if user_update.first_name is not None:
                user.first_name = user_update.first_name
            if user_update.last_name is not None:
                user.last_name = user_update.last_name
            if user_update.middle_name is not None:
                user.middle_name = user_update.middle_name
            if user_update.roles is not None:
                user.roles = user_update.roles
            return
    raise HTTPException(
        status_code=404,
        detail=f"user with id: {user_id} does not exists"
    )



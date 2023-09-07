from pydantic import BaseModel, EmailStr
from datetime import date

class AdminBase(BaseModel):
    username: str
    email: EmailStr

class AdminCreate(AdminBase):
    password: str

class AdminSchema(AdminBase):
    id: int
from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID, uuid4
from enum import Enum

# Gender Enum
class Gender(str, Enum):
    male = "male"
    female = "female"

# Role Enum
class Role(str, Enum):
    admin = "admin"
    user = "user"
    student = "student"

# User Model
class User(BaseModel):
    id: Optional[UUID] = Field(default_factory=uuid4)
    first_name: str
    last_name: str
    middle_name: Optional[str]
    gender: Gender
    roles: List[Role]

# update model
class UserUpdateRequest(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    middle_name: Optional[str]
    roles: Optional[List[Role]]
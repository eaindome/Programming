from pydantic import BaseModel
from typing import Optional



class SignUpModel(BaseModel):
    id: Optional[int]
    username: str
    email: str
    password: str
    is_staff: Optional[bool]
    is_active: Optional[bool]

    class Config:
        orm_mode = True
        schema_extra = {
            'example': {
                "username": "johndoe",
                "email": "johndoe@gmail.com",
                "password": "123456789",
                "is_staff": False,
                "is_active": True
            }
        }

class Settings(BaseModel):
    auth_jwt_secret_key: str='your-secured-jwt-secret-key'

class LoginModel(BaseModel):
    username: str
    password: str

class OrderModel(BaseModel):
    id: Optional[int]
    quantity: int
    order_status: Optional[str]="PENDING"
    pizza_sizes: Optional[str]="MEDIUM"
    flavour: Optional[str]
    user_id: Optional[int]
    
    class Config:
        orm_mode = True
        schema_extra = {
            'example': {
                "quantity": "johndoe",
                "order_status": "johndoe@gmail.com",
                "pizza_status": "123456789",
                "flavour": "spicy"
            }
        }




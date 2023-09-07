from pydantic import BaseModel, EmailStr
from datetime import date

class InventoryBase(BaseModel):
    name: str
    quantity: int 
    price: float

class InventoryCreate(InventoryBase):
    pass

class InventorySchema(InventoryBase):
    id: int


# poetry add python-multipart "python-jose[cryptography]" "passlib[bcrypt]"
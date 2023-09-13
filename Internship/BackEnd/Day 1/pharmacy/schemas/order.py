from pydantic import BaseModel, EmailStr
from pharmacy.schemas.cart_items import CartItemSchema

'''
class OrderSchema(BaseModel):
    id: int
    cart_item: list(CartItemSchema)

'''

''' 
class OrderBase(BaseModel):
    status: str

class OrderCreate(OrderBase):
    pass
'''

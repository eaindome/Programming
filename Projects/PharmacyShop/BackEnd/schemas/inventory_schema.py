from pydantic import BaseModel

class InventoryBase(BaseModel):
    name: str
    description: str
    category: str
    price: float
    quantity: int 

class InventoryCreate(InventoryBase):
    pass

class InventorySchema(InventoryBase):
    id: int
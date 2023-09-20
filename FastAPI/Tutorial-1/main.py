from fastapi import FastAPI, Query, HTTPException, status
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    brand: Optional[str] = None

class UpdateItem(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    brand: Optional[str] = None

inventory = {}

@app.get('/')
def home():
    return {"Data": "Testing"}

@app.get("/about")
def about():
    return {"Data": "About"}

@app.get("/get-item/{item_id}/{name}")
def get_item(item_id: int, name: str):
    return inventory[item_id]

@app.get("/get-by-name")
def get_item_by_name(name: str | None = None):
    for item_id in inventory:
        if inventory[item_id].name == name:
            return inventory[item_id]
        # return {"Data": "Not found"}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    
@app.post("/create-item")
def create_item(item_id: int, item: Item):
    if item_id in inventory:
        # return {"Error": "Item already exists."}  
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Item already exists."
        )
    
    '''
    inventory[item_id] = {
        "name": item.name,
        "price": item.price,
        "brand": item.brand
    }'''

    inventory[item_id] = item
    return inventory[item_id]

@app.put("/update-item/{item_id}")
def update_itme(item_id: int, item: Item):
    if item_id not in inventory:
        # return {"Error": "Item does not exist"}
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item does not exist"
        )
    
    if item.name != None:
        inventory[item_id].name = item.name
    if item.price != None:
        inventory[item_id].price = item.price
    if item.brand != None:
        inventory[item_id].brand = item.brand
    return inventory[item_id]

@app.delete("/delete-item")
def delete_item(item_id: int = Query(..., description="The ID of the item to delete > 0")):
    if item_id not in inventory:
        # return {"Error": "Item does not exist"}
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item does not exist"
        )
    
    del inventory[item_id]
    return {"Success": "Item deleted!"}
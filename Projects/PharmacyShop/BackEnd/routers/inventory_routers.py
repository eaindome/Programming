from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException

from BackEnd.database.models.inventory_model import Inventory
from BackEnd.dependencies.database_dependency import Database, AnnotatedInventory
from BackEnd.schemas.inventory_schema import InventoryCreate, InventorySchema

import sqlalchemy.exc
from sqlalchemy import select

router = APIRouter(prefix="/inventories", tags=["Inventories"])

@router.post("/", response_model=InventorySchema)
def create_inventory(inventory_data: InventoryCreate, database: Database) -> Inventory:
    inventory = Inventory(**inventory_data.model_dump())
    
    try:
        database.add(inventory)
        database.commit()
        database.refresh(inventory)

        return inventory
    except sqlalchemy.exc.IntegrityError:
        database.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail = "inventory already exists"
        )

@router.get("/", response_model=list[InventorySchema])
def get_list_of(database: Database) -> list[Inventory]:
    return database.scalars(select(Inventory)).all()
     

@router.get("/{inventory_id}", response_model=InventorySchema)
def get_inventory(inventory: AnnotatedInventory) -> Inventory:  
    return inventory

@router.delete("/{inventory_id}")
def delete_inventory(inventory: AnnotatedInventory, database: Database) -> None:
    database.delete(inventory)
    database.commit()
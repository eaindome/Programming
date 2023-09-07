from typing import Annotated

from fastapi import status, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from pharmacy.database.core import SessionMaker
from pharmacy.database.models.admin import Admin
#from pharmacy.database.models.cart_items import CartItem
from pharmacy.database.models.users import User
from pharmacy.database.models.inventory import Inventory

# Database connection
def database_connection():
    with SessionMaker() as connection:
        yield connection

Database = Annotated[Session, Depends(database_connection)]

# Admin
def get_admin_or_404(database: Database, admin_id: int) -> Admin:
    admin: Admin | None = database.get(Admin, admin_id)

    if admin is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user not found"
        )
    return admin

# User
def get_user_or_404(database: Database, user_id: int) -> User:
    user: User | None = database.get(User, user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user not found"
        )
    return user

# Inventory
def get_inventory_or_404(database: Database, inventory_id: int) -> Inventory:
    inventory: Inventory | None = database.get(Inventory, inventory_id)

    if inventory is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user not found"
        )
    return Inventory

# Cart Item
'''
def get_cart_item_or_404(database: Database, cart_item_id: int) -> CartItem:
    cart_item: CartItem | None = database.get(CartItem, cart_item_id)

    if cart_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="user not found"
        )
    return CartItem
'''
# Annotations
AnnotatedAdmin = Annotated[Admin, Depends(get_admin_or_404)]
#AnnotatedCartItem = Annotated[CartItem, Depends(get_cart_item_or_404)]
AnnotatedUser = Annotated[User, Depends(get_user_or_404)]
AnnotatedInventory = Annotated[Inventory, Depends(get_inventory_or_404)]




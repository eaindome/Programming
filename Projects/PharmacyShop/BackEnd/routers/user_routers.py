from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from fastapi.security import OAuth2PasswordRequestForm

#from BackEnd.database.models.cart_items import CartItem
#from BackEnd.database.models.orders import Order
from BackEnd.database.models.user_model import User
from BackEnd.dependencies.auth import AuthenticatedUser, get_authenticated_admin
from BackEnd.dependencies.database_dependency import Database, AnnotatedUser, get_inventory_or_404 #AnnotatedCartItem
from BackEnd.dependencies.jwt import create_token

#from BackEnd.enums import OrderStatus

from BackEnd.schemas.token_schema import Token
#rom BackEnd.schemas.cart_items import CartItemCreate, CartItemSchema
#from BackEnd.schemas.order import OrderSchema
from BackEnd.schemas.user_schema import UserCreate, UserSchema
from BackEnd.security import get_hash, password_matches_hashed

import sqlalchemy.exc
from sqlalchemy import select


router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", response_model=UserSchema)
def create_user(user_data: UserCreate, database: Database) -> User:
    user_data.password = get_hash(user_data.password)
    user = User(**user_data.model_dump())
    
    ''' user = User(
        username=user_data.username, 
        email=user_data.email,
        contact=user_data.contact,
        address=user_data.address,
        password=user_data.password,
        date_of_birth=user_data.date_of_birth,
    )'''
    
    try:
        database.add(user)
        database.commit()
        database.refresh(user)

        return user
    except sqlalchemy.exc.IntegrityError:
        database.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail = " user already exists"
        )

@router.get("/", response_model=list[UserSchema], dependencies=[Depends(get_authenticated_admin)])
def get_list_of_users(database: Database) -> list[User]:
    return database.scalars(select(User)).all()

@router.post("/authenticate", response_model=Token, dependencies=[Depends(get_authenticated_admin)])
def login_for_access_token(
    database: Database,
    credentials: OAuth2PasswordRequestForm = Depends(),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="incorrect username or password"
    )

    user: User | None = database.scalar(
        select(User).where(User.username == credentials.username)
    )

    if user is None:
        raise credentials_exception
    
    if not password_matches_hashed(plain=credentials.password, hashed=user.password):
        raise credentials_exception
    
    data = {"sub": str(id)}

    token = create_token(data=data)

    return {"token_type": "bearer", "access_token": token}

@router.get("/current", response_model=UserSchema)
def get_current_user(user: AuthenticatedUser) -> User:
    return user

'''
@router.post("/current/cart-items", response_model=CartItemSchema)
def add_item_to_cart(
    user: AuthenticatedUser, 
    cart_item_data: CartItemCreate,
    database: Database
) -> CartItem:
    inventory = get_inventory_or_404(database=database, inventory_id=cart_item_data.inventory_id)

    if cart_item_data.quantity > inventory.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="quantity is more than available stock"
        )
    
    cart_item = CartItem(**cart_item_data.model_dump(), user_id=user.id)

    database.add(cart_item)
    database.commit()
    database.refresh()

    return cart_item


@router.get("/current/cart-items", response_model=list[CartItemSchema])
def get_list_of_cart_items(user: AuthenticatedUser, database: Database) -> list[CartItem]:
    return database.scalars(select(CartItem).where(CartItem.user_id == user.id)).all()

@router.post("/current/orders")
def place_order(user: AuthenticatedUser, database: Database) -> None:
    cart_items = database.scalars(select(CartItem).where(CartItem.user_id == user.id)).all()

    if not cart_items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="cannot place an order if cart is empty"
        )
    
    checkouts: list[Checkout] = []
    
    order = Order(status=OrderStatus.PENDING.value, user_id=user.id)

    database.add(order)
    database.commit()
    database.refresh(order)

    
    for cart_item in cart_items:
        inventory: Inventory | None = database.get(Inventory, cart_item.inventory_id)

        if inventory is None:
            continue
        if cart_item.quantity > inventory.quantity:
            database.delete(order)
            database.commit()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Not enough"
            )
        checkout = Checkout(
            order_id=order.id,
            cart_item_id=cart_item.id,
            sub_total=cart_item.quantity * inventory.price,
        )

        checkouts.append(checkout)
        inventory.quantity -= cart_item.quantity

    database.add()



@router.get("/current/orders", response_model=list[OrderSchema])
def get_list_of_orders(database: Database, user: AnnotatedCartItem):
    ...


@router.delete("/current/cart-items/{cart_item_id}")
def delete_item_from_cart(
    user: AuthenticatedUser, 
    database: Database, 
    cart_item: AnnotatedCartItem
) -> None:
    if cart_item.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="not authorised"
        )
    database.delete(cart_item)
    database.commit()
'''

@router.get("/{user_id}", response_model=UserSchema)
def get_user(user: AnnotatedUser) -> User:  
    return user 

@router.delete("/{user_id}", dependencies=[Depends(get_authenticated_admin)])
def delete_user(user: AnnotatedUser, database: Database) -> None:
    database.delete(user)
    database.commit()
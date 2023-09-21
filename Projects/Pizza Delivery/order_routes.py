from database import Session, engine
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi_jwt_auth import AuthJWT
from fastapi.encoders import jsonable_encoder
from models import User, Order
from schemas import OrderModel


order_router = APIRouter(
    prefix="/orders",
    tags=['Orders']
)

session = Session(bind=engine)

def authorization(Authorize: AuthJWT=Depends()):
    try:
        Authorize.jwt_required()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

@order_router.get('/', status_code=status.HTTP_200_OK)
async def hello(Authorize: AuthJWT=Depends()):
    authorization(Authorize)
    return {"message": "Hello World"}

# make an order
@order_router.post('/', status_code=status.HTTP_200_OK)
async def place_an_order(order: OrderModel, Authorize: AuthJWT=Depends()):
    try:
        Authorize.jwt_required()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    current_user = Authorize.get_jwt_subject()

    user = session.query(User).filter(User.username==current_user).first()

    new_order = Order(
        pizza_size = order.pizza_sizes,
        quantity = order.quantity
    )
    new_order.user = user

    session.add(new_order)
    session.commit()

    response = {
        "pizza size": new_order.pizza_sizes,
        "quantity": new_order.quantity,
        "id": new_order.id,
        "order status": new_order.order_status
    }

    return jsonable_encoder(response)

# get a list of orders made
@order_router.get('/orders', status_code=status.HTTP_200_OK)
async def get_list_of_orders(Authorize: AuthJWT=Depends()):
    authorization(Authorize)

    current_user=Authorize.get_jwt_subject()

    user = session.query(User).filter(User.username==current_user).first()

    if user.is_staff:
        order = session.query(Order).all()

        return jsonable_encoder(order)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="You are not a staff"
    )

# get a list of orders
@order_router.get('/orders/{order_id}', status_code=status.HTTP_200_OK)
async def retrieve_an_order(order_id: int, Authorize: AuthJWT=Depends()):
    authorization(Authorize=Authorize)

    user = Authorize.get_jwt_subject()
    current_user = session.query(User).filter(User.username==user.username).first()

    if current_user.is_staff:
        order = session.query(Order).filter(Order.id==order_id).first()

        return jsonable_encoder(order)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="You are not a staff"
    )

# get user's orders
@order_router.get('/user/orders', status_code=status.HTTP_200_OK)
async def get_user_orders(Authorize: AuthJWT=Depends()):
    authorization(Authorize)

    user = Authorize.get_jwt_subject()
    current_user = session.query(User).filter(User.username==user.username).first()

    return jsonable_encoder(current_user.orders)

# get a specific order
@order_router.get(
    '/user/orders/{order_id}', 
    response_model=OrderModel, 
    status_code=status.HTTP_200_OK
)
async def get_specific_order(order_id: int, Authorize: AuthJWT=Depends()):
    authorization(Authorize)

    user = Authorize.get_jwt_subject()
    current_user = session.query(User).filter(User.username==user).first()
    orders = current_user.orders

    for order in orders:
        if order.id == order_id:
            return order
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Order does not exist."
    )





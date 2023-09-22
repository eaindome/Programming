from database import Session, engine
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi_jwt_auth import AuthJWT
from fastapi.encoders import jsonable_encoder
from models import User, Order
from schemas import OrderModel, OrderStatusModel


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

# as sample hello world
@order_router.get('/', status_code=status.HTTP_200_OK)
async def hello(Authorize: AuthJWT=Depends()):
    authorization(Authorize)
    return {"message": "Hello World"}

# make an order
@order_router.post('/', status_code=status.HTTP_200_OK)
async def place_an_order(order: OrderModel, Authorize: AuthJWT=Depends()):
    """
        # Placing / Creating an order
        Required Fields:
            i. quantity : integer
            ii. pizza size : string
    """
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
@order_router.get('/order', status_code=status.HTTP_200_OK)
async def get_list_of_orders(Authorize: AuthJWT=Depends()):
    """
        # List all orders
        List all orders made to the firm. Can only be accessed by staff
    """
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

# get an orders
@order_router.get('/order/{order_id}', status_code=status.HTTP_200_OK)
async def retrieve_an_order(order_id: int, Authorize: AuthJWT=Depends()):
    """
        # Get an order by id
        Only accessible to staff 
    """
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
    """
        # Get current user's list of orders
        Accessible by users
    """
    authorization(Authorize)

    user = Authorize.get_jwt_subject()
    current_user = session.query(User).filter(User.username==user.username).first()

    return jsonable_encoder(current_user.orders)

# get a specific order
@order_router.get(
    '/user/order/{order_id}',
    status_code=status.HTTP_200_OK
)
async def get_specific_order(order_id: int, Authorize: AuthJWT=Depends()):
    """
        # Get a specific order by the current user
        Accessible to Users
    """
    authorization(Authorize)

    user = Authorize.get_jwt_subject()
    current_user = session.query(User).filter(User.username==user).first()
    orders = current_user.orders

    for order in orders:
        if order.id == order_id:
            return jsonable_encoder(order)
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Order does not exist."
    )

# update an order
@order_router.put('/order/update/{order_id}')
async def update_order(order_id: int, order: OrderModel, Authorize: AuthJWT=Depends()):
    """
        # Update a specific order
        Accessible to users
        Fields required:
            - quantity : integer
            - pizza sizes : string
    """
    authorization(Authorize=Authorize)

    order_update=session.query(Order).filter(Order.id==order_id).first()  

    order_update.quantity = order.quantity
    order_update.pizza_sizes = order.pizza_sizes

    session.commit()

    return jsonable_encoder(order_update)


# update an order status
@order_router.patch('/order/update/{order_id}')
async def update_order_status(order_id: int, order: OrderStatusModel, Authorize: AuthJWT=Depends()):
    """
        # Update an order's status
        Accessible to staff
        Required Fields:
            - order status : string
    """
    authorization(Authorize=Authorize)

    user = Authorize.get_jwt_subject()
    current_user = session.query(User).filter(User.username==user).first()

    if current_user.is_staff:
        order_stats_update=session.query(Order).filter(Order.id==order_id).first()

        order_stats_update.order_status=order.order_status

        session.commit()
        response = {
            "order_id": order_stats_update.id,
            "quantity": order_stats_update.quantity,
            "pizza_size": order_stats_update.pizza_sizes,
            "order_status": order_stats_update.order_status
        }

        return jsonable_encoder(response)

# delete an order
@order_router.delete('/order/delete/{order_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_an_order(order_id:int, Authorize: AuthJWT=Depends()):
    """
        # Deletes an order by id
        Accessible to everyone
    """
    authorization(Authorize=Authorize)

    delete_order = session.query(Order).filter(Order.id==order_id).first()
    session.delete(delete_order)
    session.commit()

    return delete_order




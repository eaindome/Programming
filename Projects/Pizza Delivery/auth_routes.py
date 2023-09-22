from database import Session, engine
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi_jwt_auth import AuthJWT
from fastapi.encoders import jsonable_encoder
from models import User
from schemas import SignUpModel, LoginModel
from werkzeug.security import generate_password_hash, check_password_hash


auth_router = APIRouter(
    prefix="/auth",
    tags=['Auth']
)

session = Session(bind=engine)

# a sample hello world for test
@auth_router.get('/')
async def hello(Authorize: AuthJWT=Depends()):
    """
        # Sample hello world to test
    """
    try:
        Authorize.jwt_required()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    return {"message": "Hello World"}

# Sign Up route
@auth_router.post('/signup', status_code=status.HTTP_201_CREATED)
async def sign_up(user: SignUpModel):
    """
        # Sign up / Register account
        Required Fields:
            - username: string
            - email: string
            - password: string
            - is_staff: string
            - is_active: string
    """
    db_email = session.query(User).filter(User.email==user.email).first()

    if db_email is not None:
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with email already exists"
        )
    
    db_username = session.query(User).filter(User.username==user.username).first()

    if db_username is not None:
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with username already exists"
        )
    
    new_user = User(
        username = user.username,
        email = user.email,
        password = generate_password_hash(user.password),
        is_staff = user.is_staff,
        is_active = user.is_active
    )

    session.add(new_user)

    session.commit()

    return new_user

# Login route
@auth_router.post('/login', status_code=status.HTTP_200_OK)
async def login(user: LoginModel, Authorize: AuthJWT=Depends()):
    """
        # Login route
        Required Fields:
            - username: string
            - password: string
    """
    db_user = session.quer(User).filter(User.username==user.username).first()

    # check if user exist
    if db_user and check_password_hash(db_user.password, password=user.password):
        access_token = Authorize.create_access_token(subject=db_user.username)
        refresh_token = Authorize.create_refresh_token(subject=db_user.username)

        response = {
            "access": access_token,
            "refresh": refresh_token
        }

        return jsonable_encoder(response)
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid username or password"
    )

# refreshing tokens
@auth_router.get('/refresh-token')
async def refresh_token(Authorize: AuthJWT=Depends()):
    """
        # Refresh token route. Creating a fresh token
        Required Field:
            - 
    """
    try:
        Authorize.jwt_refresh_token_required()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    current_user = Authorize.get_jwt_subject()

    access_token = Authorize.create_access_token(subject=current_user)

    return jsonable_encoder({"access-token": access_token})



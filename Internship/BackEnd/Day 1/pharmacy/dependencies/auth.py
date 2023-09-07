from typing import Annotated

from fastapi import Depends, status
from fastapi.exceptions import HTTPException
from jose import jwt, JWTError

from pharmacy.database.models.users import User
from pharmacy.database.models.admin import Admin
from pharmacy.dependencies.database import Database
from pharmacy.dependencies.oauth_schemes import user_scheme, admin_scheme


def get_authenticated_user(database: Database, token: str =Depends(user_scheme)) -> User:
    token_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="invalid credentials",
    )

    try:
        data: dict[str, str] = jwt.decode(
            token=token, key="something", algorithms=["HS256"]
        )
    except JWTError:
        raise token_exception
    
    user_id = int(data["sub"])

    user: User | None = database.get(User, user_id)

    if user is None:
        raise token_exception
    
    return user

AuthenticatedUser = Annotated[User, Depends(get_authenticated_user)]

def get_authenticated_admin(database: Database, token: str =Depends(admin_scheme)) -> User:
    token_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="invalid credentials",
    )

    try:
        data: dict[str, str] = jwt.decode(
            token=token, key="something", algorithms=["HS256"]
        )
    except JWTError:
        raise token_exception
    
    admin_id = int(data["sub"])

    admin: Admin | None = database.get(Admin, admin_id)

    if admin is None:
        raise token_exception
    
    return admin

AuthenticatedAdmin = Annotated[Admin, Depends(get_authenticated_admin)]












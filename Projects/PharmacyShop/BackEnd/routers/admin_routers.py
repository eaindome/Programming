from fastapi import APIRouter, status, Depends
from fastapi.exceptions import HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from BackEnd.database.models.admin_model import Admin
from BackEnd.dependencies.auth import AuthenticatedAdmin, get_authenticated_admin
from BackEnd.dependencies.database_dependency import Database, AnnotatedAdmin
from BackEnd.dependencies.jwt import create_token
from BackEnd.schemas.admin_schema import AdminCreate, AdminSchema
from BackEnd.schemas.token_schema import Token
from BackEnd.security import get_hash, password_matches_hashed

import sqlalchemy.exc
from sqlalchemy import select

router = APIRouter(prefix="/admin", tags=["Admin"])

# create an admin
@router.post("/", response_model=AdminSchema)
def create_admin(admin_data: AdminCreate, database: Database) -> Admin:
    admin_data.password = get_hash(admin_data.password)
    admin = Admin(**admin_data.model_dump())
    
    try:
        database.add(admin)
        database.commit()
        database.refresh(admin)

        return admin
    except sqlalchemy.exc.IntegrityError:
        database.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail = " admin already exists"
        )

# get a list of admins
@router.get("/", response_model=list[AdminSchema]) #, dependencies=[Depends(get_authenticated_admin)])
def get_list_of_admins(database: Database) -> list[Admin]:
    return database.scalars(select(Admin)).all()

# login access token
@router.post("/authenticate", response_model=Token)
def login_for_access_token(
    database: Database,
    credentials: OAuth2PasswordRequestForm = Depends(),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="incorrect username or password"
    )

    admin: Admin | None = database.scalar(
        select(Admin).where(Admin.username == credentials.username)
    )

    if admin is None:
        raise credentials_exception
    
    if not password_matches_hashed(plain=credentials.password, hashed=admin.password):
        raise credentials_exception
    
    data = {"sub": str(admin.id)}

    token = create_token(data=data)

    return {"token_type": "bearer", "access_token": token}

# get current admin
@router.get("/current", response_model=AdminSchema)
def get_current_admin(admin: AuthenticatedAdmin) -> Admin:
    return admin 

# get admin by id
@router.get("/{admin_id}", response_model=AdminSchema,dependencies=[Depends(get_authenticated_admin)])
def get_admin(admin: AnnotatedAdmin) -> Admin:  
    return admin

# delete an admin
@router.delete("/{admin_id}", dependencies=[Depends(get_authenticated_admin)])
def delete_admin(admin: AnnotatedAdmin, database: Database) -> None:
    database.delete(admin)
    database.commit()
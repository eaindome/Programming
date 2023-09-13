from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from BackEnd.database.database_core import Base

# creating an object mapper with an orm(object relational mapper)
# creating admin table
class Admin(Base):
    __tablename__ = "pharmacy_admin"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
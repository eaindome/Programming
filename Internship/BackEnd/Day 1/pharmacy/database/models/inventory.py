from datetime import date
from sqlalchemy import String, Date
from sqlalchemy.orm import Mapped, mapped_column
from pharmacy.database.core import Base

# creating an object mapper with an orm(object relational mapper)
# creating inventory table
class Inventory(Base):
    __tablename__ = "inventory"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False)
    price: Mapped[float] = mapped_column(nullable=False)
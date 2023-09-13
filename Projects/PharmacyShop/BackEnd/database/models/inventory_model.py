from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from BackEnd.database.database_core  import Base

# creating an object mapper with an orm(object relational mapper)
# creating inventory table
class Inventory(Base):
    __tablename__ = "inventory"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String)
    category: Mapped[str] = mapped_column(String)
    price: Mapped[float] = mapped_column(nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False)
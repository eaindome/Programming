from pharmacy.database.core import Base

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

# creating an object mapper with an orm(object relational mapper)
# creating order table
'''
class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)'''
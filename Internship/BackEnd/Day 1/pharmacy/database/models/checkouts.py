from pharmacy.database.core import Base

from sqlalchemy.orm import Mapped, mapped_column

# creating an object mapper with an orm(object relational mapper)
# creating checkout table
'''
class CheckOut(Base):
    __tablename__ = "checkouts"

    cart_item_id: Mapped[int] = mapped_column(ForeignKey("cart_items.id"), primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"), primary_key=True)
    subtotal_price: Mapped[float] = mapped_column(nullable=False)'''
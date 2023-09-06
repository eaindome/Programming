from pharmacy.database.core import Base

from sqlalchemy.orm import Mapped, mapped_column

# creating an object mapper with an orm(object relational mapper)
# creating cart item table

'''
class CartItem(Base):
    __tablename__ = "cart_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    inventory_id: Mapped[int] = mapped_column(Foreignkey("inventory.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False)'''
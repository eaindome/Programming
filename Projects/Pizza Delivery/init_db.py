from database import engine, Base 
from models import User, Order

Base.metadata.create_all(bind=engine)


# run python init_db.py in the terminal
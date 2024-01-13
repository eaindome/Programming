from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:Eai%402460@localhost:5432/itsupport1"

engine = create_engine(DATABASE_URL)

try:
    connection = engine.connect()
    print("Connection to PostgreSQL DB successful")
except Exception as e:
    print("Error occurred:", str(e))
finally:
    connection.close()
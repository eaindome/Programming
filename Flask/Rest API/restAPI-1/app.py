import os
import psycopg2
from datetime import datetime, timezone
from dotenv import load_dotenv
from flask import Flask, request

# SQL queries
CREATE_ROOMS_TABLE = (
    "CREATE TABLE IF NOT EXISTS rooms (id SERIAL PRIMARY KEY, name TEXT);"
)

CREATE_TEMPS_TABLE = """CREATE TABLE IF NOT EXISTS tempERATURES (room_id INTEGER, temperature REAL,
                        date TIMESTAMP, FOREIGN KEY(room_id) REFERENCES rooms (id) ON DELETE CASCADE);"""

INSERT_ROOM_RETURN_ID = "INSERT INTO rooms (name) VALUES (%s) RETURNING id;"
INSERT_TEMP = (
    "INSERT INTO temperatures (room_id, temperature, date) VALUES (%s, %s, %s);"
)

GLOBAL_NUMBER_OF_DAYS = (
    """SELECT COUNT(DISTINCT DATE(date)) AS days FROM temperatures;"""
)
GLOBAL_AVG_TEMP = """SELECT AVG(temperature) AS avg_temp FROM temperatures;"""

load_dotenv()   # Load the environment variables from the .env file

# Create the Flask app
app = Flask(__name__)
url = os.getenv("DATABASE_URL") 
connection = psycopg2.connect(url)   # Connect to the database

# Home page
@app.get("/")
def home():
    return "Hello, World!"

# Create a room
@app.post("/api/room")
def create_room():
    data = request.get_json()
    name = data["name"]
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_ROOMS_TABLE)
            cursor.execute(INSERT_ROOM_RETURN_ID, (name,))
            room_id = cursor.fetchone()[0]
    return {"id": room_id, "message": f"Room {name} created successfully."}, 201

# Add a temperature to a room
@app.post("/api/temperature")
def add_temp():
    data = request.get_json()
    temperature = data["temperature"]
    room_id = data["room"]
    try:
        date = datetime.strptime(data["date"], "%m-%d-%Y %H:%M:%S.%f")
    except KeyError:
        date = datetime.now(timezone.utc)
        
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_TEMPS_TABLE)
            cursor.execute(INSERT_TEMP, (room_id, temperature, date))
            
    return {"message": f"Temperature {temperature} added successfully."}, 201

# Get the average temperature for a room
@app.get("/api/average")
def get_gloabl_avg():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GLOBAL_AVG_TEMP)
            average = cursor.fetchone()[0]
            cursor.execute(GLOBAL_NUMBER_OF_DAYS)
            days = cursor.fetchone()[0]
        
    return {"average": round(average, 2), "days": days}


import psycopg2

# Corrected Database Credentials
db_username = 'postgres'
db_password = 'Eai@810675'  
db_host = 'localhost'
db_port = 5432
db_name = 'crypto_data'

# Forming the connection string
conn_str = f"dbname='{db_name}' user='{db_username}' host='{db_host}' port='{db_port}' password='{db_password}'"

# Attempting to connect
try:
    conn = psycopg2.connect(conn_str)
    # If connection is successful, you can proceed with your operations here
    print("Connected to the database successfully")
except psycopg2.OperationalError as e:
    print(f"An error occurred: {e}")
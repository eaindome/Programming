import sqlite3
from database.database import (
    create_tables,
    register_manufacturer, register_distributor, 
    register_retailer, register_user
)
from users.auth import authenticate_user
from users.roles import manufacturer_actions, distributor_actions, retailer_actions, user_actions

def main():
    create_tables()
    
    # Add sample users (normally, you'd have a separate registration process)
    try:
        register_manufacturer("manufacturer", "password", "ManuCo", "123 Street", "City", "ProductA", "FDA123", "FDA987")
        register_distributor("distributor", "password", "DistCo", "DistributorCity")
        register_retailer("retailer", "password", "RetailCo", "RetailerCity")
        register_user("user", "password")
    except sqlite3.IntegrityError:
        pass  # Ignore if users already exist

    while True:
        username = input("Enter username: ")
        password = input("Enter password: ")
        
        role = authenticate_user(username, password)
        
        if role:
            if role == 'manufacturer':
                manufacturer_actions(username=username)
            elif role == 'distributor':
                distributor_actions(username=username)
            elif role == 'retailer':
                retailer_actions(username=username)
            elif role == 'user':
                user_actions()
        else:
            print("Invalid username or password.")
        
        exit_choice = input("Do you want to exit the application? (yes/no): ")
        if exit_choice.lower() == 'yes':
            break

if __name__ == "__main__":
    main()


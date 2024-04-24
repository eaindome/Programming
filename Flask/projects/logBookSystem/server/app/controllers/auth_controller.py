from flask import session
from flask_login import login_user, logout_user
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash, check_password_hash
from app.database.models.user_model import User
from app.database import db

class AuthController:
    # function to login a user
    def login(self, username, password):
        user = User.query.filter_by(username=username).first()          # get the user from the database
        if user and check_password_hash(user.user_password, password):  # check if the user exists and the password is correct
            # login the user
            login_user(user)        # `login_user` is a function from `flask_login
            #session['username'] = user.username
            #print(f"User {user.username} logged in, session: {session}")
            return {
                "message": "Logged in successfully", "username": user.username
            }, 200
        else:
            return {
                "message": "Invalid username or password"
            }, 401
    
    # function to logout a user      
    def logout(self):
        # logout the user
        logout_user()       #`logout_user` is a function from `flask_login
        return {
            "message": "Logged out successfully"
        }, 200
    
    # function to register a new user
    def register(self, username, password, role):
        user = User.query.filter_by(username=username).first()  # check if the user already exists
        if user:
            return {
                "message": "User already exists"
            }, 400
        
        new_user = User(username=username, user_password=generate_password_hash(password=password), user_role=role)
        new_user.save()
        return {
            "message": "User created successfully"
        }, 201
        
    # function to reset a user's password
    def reset_password(self, username, password):
        try:
            user = User.query.filter_by(username=username).first()  # check if the user exists
            if user:
                user.user_password = generate_password_hash(password=password)
                user.save()
                return {
                    "message": "Password reset successfully"
                }, 200
            else:
                return {
                    "message": "User does not exist"
                }, 404
        except SQLAlchemyError as e:
            db.session.rollback()
            return {
                "message": "Database error occurred."
            }, 500
        except Exception as e:
            return {
                "message": "An error occurred."
            }, 500
    




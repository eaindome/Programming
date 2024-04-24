from app.database.models.user_model import User
from app.database import db
from flask import request
from flask_login import current_user
from werkzeug.security import generate_password_hash
from app.database.models.user_model import User
from app.database import db
from flask import request
from flask_login import current_user
from werkzeug.security import generate_password_hash

class UserController:
    # function to add a user
    @staticmethod
    def add_user(username, user_password, user_role, start_date=None, end_date=None):
        # check if the user is an admin or worker
        if not current_user.is_admin() and not current_user.is_worker():
            return {
                "message": "You are not authorized to add a user"
            }, 401
            
        # Validate required fields
        if not username or not user_password or not user_role:
            return {
                "message": "Username, user_password, and user_role are required fields"
            }, 400

        # Validate user_role
        if user_role not in ["Admin", "Worker", "Intern", "Service Personnel"]:
            return {
                "message": "Invalid user_role. Allowed values are Admin, Worker, Intern, Service Personnel"
            }, 400
        
        # check if the user already exists
        if User.query.filter_by(username=username).first():
            return {
                "message": "User already exists"
            }, 403
        
        # create a new user
        new_user = User(
            username=username, 
            user_password=generate_password_hash(user_password),
            user_role=user_role,
            start_date=start_date,
            end_date=end_date
        )
        new_user.save()  # save the new user
        return {
            "message": "User added successfully",
        }, 201
    
    # function to get all users
    @staticmethod
    def get_all_users():
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=10, type=int)
        
        users = User.query.paginate(page=page, per_page=per_page, error_out=False)
        return {
            "users": [{
                "username": user.username,
                "user_role": user.user_role,
                "start_date": user.start_date,
                "end_date": user.end_date
            } for user in users],
            
            "total_pages": users.pages,
            "current_page": users.page,
            "total_users": users.total
        }
    
    # function to get a user by role
    @staticmethod
    def get_users_by_role(role, year=None):
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=10, type=int)

        if year:
            users = User.query.filter(
                (User.user_role == role) &
                (
                    (db.extract('year', User.start_date) == year) |
                    (db.extract('year', User.end_date) == year)
                )
            ).paginate(page=page, per_page=per_page, error_out=False)
        else:
            users = User.query.filter_by(user_role=role).paginate(page=page, per_page=per_page, error_out=False)

        return {
            "users": [{"username": user.username, "user_role": user.user_role} for user in users.items],
            "total_pages": users.pages,
            "current_page": users.page,
            "total_users": users.total
        }

    # function to get interns by year
    @staticmethod
    def get_interns_by_year(year):
        interns = UserController.get_users_by_role("Intern", year)
        if interns["users"]:
            return interns
        return {
            "message": "No interns found"
        }

    # function to get workers by year
    @staticmethod
    def get_workers_by_year(year):
        # query for the workers of the given year
        workers = UserController.get_users_by_role("Worker", year)
        if workers["users"]:
            return workers
        return {
            "message": "No workers found"
        }

    # function to get service personnel by year
    @staticmethod
    def get_service_personnel_by_year(year):
        # query for the service personnel of the given year
        service_personnel = UserController.get_users_by_role("Service Personnel", year)
        if service_personnel["users"]:
            return service_personnel
        return {
            "message": "No service personnel found"
        }

    # function to get admins by year
    @staticmethod
    def get_admins_by_year(year):
        # query for the admins of the given year
        admins = UserController.get_users_by_role("Admin", year)
        if admins["users"]:
            return admins
        return {
            "message": "No admins found"
        }
    
    # function to update a user
    @staticmethod
    def update_user(username, user_password=None, user_role=None, start_date=None, end_date=None):
        # check if the user is in the database
        user = User.query.filter_by(username=username).first()
        if not user:
            return {
                "message": "User does not exist"
            }, 404
            
        # validate user_role
        if user_role and user_role not in ["Admin", "Worker", "Intern", "Service Personnel"]:
            return {
                "message": "Invalid user_role. Allowed values are Admin, Worker, Intern, Service Personnel"
            }, 400
            
        # update the user
        user.username = username
        if user_password:
            user.user_password = generate_password_hash(user_password)
        if user_role:
            user.user_role = user_role
        if start_date:
            user.start_date = start_date
        if end_date:
            user.end_date = end_date
        user.save()
        return {
            "message": "User updated successfully"
        }, 200
    
    # function to search for a user by name
    @staticmethod
    def search_user_by_name(search_term):
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=10, type=int)
        
        # query the database for the user
        users = User.query.filter(User.username.ilike(f'%{search_term}%')).paginate(page=page, per_page=per_page, error_out=False)
        if users:
            return {
                "users": [{
                    "username": user.username,
                    "user_role": user.user_role,
                    "start_date": user.start_date,
                    "end_date": user.end_date
                } for user in users],
                
            "total_pages": users.pages,
            "current_page": users.page,
            "total_users": users.total
            }, 200
        
        return {
            "message": "User not found"
        }, 404
        
    # function to search for a user by role
    @staticmethod
    def search_user_by_role(search_term):
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=10, type=int)

        users = User.query.filter(User.user_role.ilike(f'%{search_term}%')).paginate(page=page, per_page=per_page, error_out=False)
        if users.items:
            return {
                "users": [{
                    "username": user.username,
                    "user_role": user.user_role,
                    "start_date": user.start_date,
                    "end_date": user.end_date
                } for user in users.items],
                
                "total_pages": users.pages,
                "current_page": users.page,
                "total_users": users.total
            }, 200
            
        return {
            "message": "User not found"
        }, 404
            
    # function to delete a user
    @staticmethod
    def delete_user(user_id):
        # check if the user is an admin or worker
        if not current_user.is_admin() and not current_user.is_worker():
            return {
                "message": "You are not authorized to delete a user"
            }, 403
        
        # check if the user exists
        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            return {
                "message": "User does not exist"
            }, 404
        
        # delete the user
        user.delete()
        return {
            "message": "User deleted successfully"
        }, 200
            
    # function to get the information of a logged-in user
    @staticmethod
    def get_logged_in_user():
        if current_user.is_authenticated:
            return {
                "username": current_user.username,
                "user_role": current_user.user_role,
                "start_date": current_user.start_date,
                "end_date": current_user.end_date
            }
        else:
            return {
                "message": "No logged-in user"
            }


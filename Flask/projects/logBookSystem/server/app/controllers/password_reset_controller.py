from app.database.models.reset_password_model import PasswordReset
from app.database import db
from flask import abort
from sqlalchemy import or_, cast,String

class PasswordResetController:
    @staticmethod
    def create_password_reset(data):
        if not isinstance(data, dict):
            abort(400, description="Invalid data format. Expected a dictionary.")
        try:
            # create a new password_reset object
            password_reset = PasswordReset(**data)
            password_reset.save()
            return {
                'message': 'Password Reset data added successfully',
                'status': True
            }, 201
        except Exception as e:
            print(f'Exception from controller: {e}'
                  f'data: {data}')
            abort(500, description=str(e))

    @staticmethod
    def get_password_reset(reset_id):
        password_reset = PasswordReset.query.get(reset_id)
        if password_reset:
            return {
                'message': 'Password Reset data found',
                'status': True,
                'data': password_reset.to_dict()
            }, 200
        else:
            return {
                'message': 'Password Reset data not found',
                'status': False
            }, 404

    @staticmethod
    def get_all_password_reset():
        password_resets = PasswordReset.query.all()
        if password_resets:
            return {
                'message': 'Password Reset data found',
                'status': True,
                'data': [password_reset.to_dict() for password_reset in password_resets]
            }, 200
        else:
            return {
                'message': 'No Password Reset data found',
                'status': False
            }, 404

    @staticmethod
    def update_password_reset(reset_id, data):
        password_reset = PasswordReset.query.get(reset_id)
        if password_reset:
            try:
                password_reset.update(data)
                return {
                    'message': 'Password Reset data updated successfully',
                    'status': True
                }, 200
            except Exception as e:
                abort(500, description=str(e))
        else:
            return {
                'message': 'Password Reset data not found',
                'status': False
            }, 404

    @staticmethod
    def delete_password_reset(reset_id):
        password_reset = PasswordReset.query.get(reset_id)
        if password_reset:
            try:
                password_reset.delete()
                return {
                    'message': 'Password Reset deleted successfully',
                    'status': True
                }, 200
            except Exception as e:          # in case of any errors, return a server error
                abort(500, description=str(e))
        else:                                   # if a vendor is not found, return a 404 error  
            return {
                'message': 'Password Reset data not found',
                'status': False
            }, 404
            
    @staticmethod
    def search_password_reset(search_query):
        password_resets = PasswordReset.query.filter(
            or_(
                PasswordReset.staff_name.contains(search_query),
                PasswordReset.staff_username.contains(search_query),
                PasswordReset.district.contains(search_query),
                PasswordReset.remarks.contains(search_query),
                PasswordReset.reset_by.contains(search_query),
                cast(PasswordReset.reset_id, String).contains(search_query)
            )
        ).all()
        if password_resets:
            return {
                'message': 'Password Reset data found',
                'status': True,
                'data': [password_reset.to_dict() for password_reset in password_resets]
            }, 200
        else:
            return {
                'message': 'No Password Reset data found for the provided search term',
                'status': False
            }, 404

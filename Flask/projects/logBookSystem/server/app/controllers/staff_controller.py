from app.database.models.staff_model import Staff
from app.database import db
from flask import abort
from sqlalchemy import or_, cast, String

class StaffController:
    # function to add a staff
    @staticmethod
    def add_staff(data):
        # check if data is a dictionary
        if not isinstance(data, dict):
            abort(400, description="Invalid data format. Expected a dictionary.")
        try:
            if data['date_in'] == '':
                data['date_in'] = None
            if data['date_out'] == '':
                data['date_out'] = None
            # create a new staff object
            new_staff = Staff(**data)
            new_staff.save()
            return {
                'message': 'Staff added successfully',
                'status': True
            }, 201
        except Exception as e:   # in case of any errors, return a server error
            print(f"Exception from controller: {e}")
            print(f"data: {data}")
            abort(500, description=str(e))
      
    # function to get a staff by id  
    @staticmethod
    def get_staff(staff_record_id):
        staff = Staff.query.get(staff_record_id)    # query the database for a staff with the given id
        if staff:                                  # if a staff is found, return the staff
            return {
                'message': 'Staff found',
                'status': True,
                'data': staff.to_dict()
            }, 200
        else:                                   # if a staff is not found, return a 404 error
            return {
                'message': 'Staff not found',
                'status': False
            }, 404

    # function to get all staffs 
    @staticmethod
    def get_all_staffs():
        # query the database for all staffs
        staffs = Staff.query.all()
        
        if staffs:
            # return a list of all staffs
            return {
                'message': 'Staffs retrieved successfully',
                'status': True,
                'Staffs': [staff.to_dict() for staff in staffs]
            }, 200
        else:
            return {
                'message': 'No Staff data found',
                'status': False
            }, 404
    
    # function to update a staff       
    @staticmethod
    def update_staff(staff_record_id, data):
        if not isinstance(data, dict):                                # check if data is a dictionary
            abort(400, description="Invalid data format. Expected a dictionary.")
        staff = Staff.query.get(staff_record_id)               # query the database for a staff with the given id
        if staff:
            # update the staff
            try:
                if data['date_in'] == '':
                    data['date_in'] = None
                if data['date_out'] == '':
                    data['date_out'] = None
                staff.update(data)
                return {
                    'message': 'Staff updated successfully',
                    'status': True
                }, 200
            except Exception as e:              # in case of any errors, return a server error
                abort(500, description=str(e))
        else:
            # if a staff is not found, return a 404 error
            return {
                'message': 'Staff not found',
                'status': False
            }, 404
    
    @staticmethod
    def delete_staff(staff_record_id):
        staff = Staff.query.get(staff_record_id)   # query the database for a staff with the given id
        if staff:                                  # if a staff is found, delete the staff
            try:                    # try to delete the staff
                staff.delete()
                return {
                    'message': 'Staff deleted successfully',
                    'status': True
                }, 200
            except Exception as e:          # in case of any errors, return a server error
                abort(500, description=str(e))
        else:                                   # if a staff is not found, return a 404 error  
            return {
                'message': 'Staff not found',
                'status': False
            }, 404

    @staticmethod
    def search_staff(search_query):
        staffs = Staff.query.filter(
            or_(
                cast(Staff.staff_num, String).contains(search_query),
                Staff.district.contains(search_query),
                Staff.email.contains(search_query),
                Staff.username.contains(search_query),
                cast(Staff.staff_record_id, String).contains(search_query),
                Staff.complaint.contains(search_query),
                Staff.pc_brand.contains(search_query),
                Staff.pc_serial_num.contains(search_query)
            )
        ).all()
        if staffs:
            return {
                'message': 'Staff data found',
                'status': True,
                'data': [staff.to_dict() for staff in staffs]
            }, 200
        else:
            return {
                'message': 'No Staff data found for the provided search term',
                'status': False
            }, 404

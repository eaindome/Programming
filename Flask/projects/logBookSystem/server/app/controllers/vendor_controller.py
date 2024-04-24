from app.database import db
from app.database.models.vendor_model import Vendor
from flask import abort
from sqlalchemy import or_, cast, String

class VendorController:
    # function to add a vendor
    @staticmethod
    def add_vendor(data):
        # check if data is a dictionary
        if not isinstance(data, dict):
            abort(400, description="Invalid data format. Expected a dictionary.")
        try:
            if data['date_in'] == '':
                data['date_in'] = None
            if data['date_out'] == '':
                data['date_out'] = None
            # create a new vendor object
            new_vendor = Vendor(**data)
            new_vendor.save()
            return {
                'message': 'Vendor added successfully',
                'status': True
            }, 201
        except Exception as e:   # in case of any errors, return a server error
            print(f'Exception from controller: {e}')
            abort(500, description=str(e))
      
    # function to get a vendor by id  
    @staticmethod
    def get_vendor(vendor_book_id):
        vendor = Vendor.query.get(vendor_book_id)    # query the database for a vendor with the given id
        if vendor:                                  # if a vendor is found, return the vendor
            return {
                'message': 'Vendor found',
                'status': True,
                'data': vendor.to_dict()
            }, 200
        else:                                   # if a vendor is not found, return a 404 error
            return {
                'message': 'Vendor not found',
                'status': False
            }, 404

    # function to get all vendors 
    @staticmethod
    def get_all_vendors():
        # query the database for all vendors
        vendors = Vendor.query.all()
        
        if vendors:
            # return a list of all vendors
            return {
                'message': 'Vendors retrieved successfully',
                'status': True,
                'vendors': [vendor.to_dict() for vendor in vendors]
            }, 200
        else:
            return {
                'message': 'No Vendor data found',
                'status': False
            }, 404
    
    # function to update a vendor        
    @staticmethod
    def update_vendor(vendor_book_id, data):
        if not isinstance(data, dict):                                # check if data is a dictionary
            abort(400, description="Invalid data format. Expected a dictionary.")
        vendor = Vendor.query.get(vendor_book_id)               # query the database for a vendor with the given id
        if vendor:
            # update the vendor
            try:
                if data['date_in'] == '':
                    data['date_in'] = None
                if data['date_out'] == '':
                    data['date_out'] = None
                vendor.update(data)
                return {
                    'message': 'Vendor updated successfully',
                    'status': True
                }, 200
            except Exception as e:              # in case of any errors, return a server error
                abort(500, description=str(e))
        else:
            # if a vendor is not found, return a 404 error
            return {
                'message': 'Vendor not found',
                'status': False
            }, 404
    
    @staticmethod
    def delete_vendor(vendor_book_id):
        vendor = Vendor.query.get(vendor_book_id)   # query the database for a vendor with the given id
        if vendor:                                  # if a vendor is found, delete the vendor
            try:                    # try to delete the vendor
                vendor.delete()
                return {
                    'message': 'Vendor deleted successfully',
                    'status': True
                }, 200
            except Exception as e:          # in case of any errors, return a server error
                abort(500, description=str(e))
        else:                                   # if a vendor is not found, return a 404 error  
            return {
                'message': 'Vendor not found',
                'status': False
            }, 404

    @staticmethod
    def search_vendor(search_query):
        vendors = Vendor.query.filter(
            or_(
                Vendor.company_name.contains(search_query),
                Vendor.phone_number.contains(search_query),
                Vendor.district.contains(search_query),
                Vendor.email.contains(search_query),
                Vendor.username.contains(search_query),
                cast(Vendor.vendor_book_id, String).contains(search_query),
                Vendor.complaint.contains(search_query),
                Vendor.pc_brand.contains(search_query),
                Vendor.pc_serial_num.contains(search_query)
            )
        ).all()
        if vendors:
            return {
                'message': 'FortiClient data found',
                'status': True,
                'data': [vendor.to_dict() for vendor in vendors]
            }, 200
        else:
            return {
                'message': 'No FortiClient data found for the provided search term',
                'status': False
            }, 404

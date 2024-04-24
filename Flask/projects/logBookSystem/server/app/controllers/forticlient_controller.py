from app.database.models.forticlient_model import FortiClientVPN
from app.database import db
from flask import abort
from sqlalchemy import or_, cast, String

class FortiClientController:
    @staticmethod
    def create_forticlient(data):
        if not isinstance(data, dict):
            abort(400, description="Invalid data format. Expected a dictionary.")
        try:
            # create a new forticlient object
            forticlient = FortiClientVPN(**data)
            forticlient.save()
            return {
                'message': 'Forticlient data added successfully',
                'status': True
            }, 201
        except Exception as e:
            print(f'Exception: {e}')
            abort(500, description=str(e))

    @staticmethod
    def get_forticlient(vpn_id):
        forticlient = FortiClientVPN.query.get(vpn_id)
        if forticlient:
            return {
                'message': 'Forticlient data found',
                'status': True,
                'data': forticlient.to_dict()
            }, 200
        else:
            return {
                'message': 'Forticlient data not found',
                'status': False
            }, 404

    @staticmethod
    def get_all_forticlient():
        forticlients = FortiClientVPN.query.all()
        if forticlients:
            return {
                'message': 'FortiClient data found',
                'status': True,
                'data': [forticlient.to_dict() for forticlient in forticlients]
            }, 200
        else:
            return {
                'message': 'No FortiClient data found',
                'status': False
            }, 404

    @staticmethod
    def update_forticlient(vpn_id, data):
        forticlient = FortiClientVPN.query.get(vpn_id)
        if forticlient:
            try:
                forticlient.update(data)
                return {
                    'message': 'Forticlient data updated successfully',
                    'status': True
                }, 200
            except Exception as e:
                abort(500, description=str(e))
        else:
            return {
                'message': 'Forticlient data not found',
                'status': False
            }, 404

    @staticmethod
    def delete_forticlient(vpn_id):
        forticlient = FortiClientVPN.query.get(vpn_id)
        if forticlient:
            try:
                forticlient.delete()
                return {
                    'message': 'Forticlient deleted successfully',
                    'status': True
                }, 200
            except Exception as e:          # in case of any errors, return a server error
                abort(500, description=str(e))
        else:                                   # if a vendor is not found, return a 404 error  
            return {
                'message': 'Forticlient data not found',
                'status': False
            }, 404
            
    @staticmethod
    def search_forticlient(search_query):
        forticlients = FortiClientVPN.query.filter(
            or_(
                FortiClientVPN.company_name.contains(search_query),
                FortiClientVPN.owners_name.contains(search_query),
                FortiClientVPN.email.contains(search_query),
                FortiClientVPN.username.contains(search_query),
                cast(FortiClientVPN.vpn_id, String).contains(search_query)
            )
        ).all()
        if forticlients:
            return {
                'message': 'FortiClient data found',
                'status': True,
                'data': [forticlient.to_dict() for forticlient in forticlients]
            }, 200
        else:
            return {
                'message': 'No FortiClient data found for the provided search term',
                'status': False
            }, 404


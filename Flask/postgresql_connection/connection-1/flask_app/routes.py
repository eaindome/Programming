from flask import request, jsonify
from flask_app import app, db
from flask_app.models import Temperature

# add a room temperature
@app.route('/api/temperature', methods=['POST'])
def add_temp():
    data = request.json
    new_temp = Temperature(room=data['room'], temperature=data['temperature'])   # create an instance of the temperature class
    db.session.add(new_temp)    # add the instance to the database
    db.session.commit()         # commit the changes
    
    return jsonify({'message': 'Temperature added successfully'}), 201
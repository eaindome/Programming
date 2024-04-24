from flask_app import app, db

# with app.app_context() tells the app that we are running the app
with app.app_context():
    # create the tables from the models into the database
    db.create_all()
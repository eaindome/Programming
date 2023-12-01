from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# create the flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Eai%402460@localhost/connection1'  # the database connection
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from flask_app import routes  # importing routes to avoid circular imports
from flask_migrate import Migrate

migrate = Migrate(app, db)
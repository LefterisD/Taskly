import os
from flask import Flask 
from flask_cors import CORS 
from .extensions import api, db
from .resources import ns

def create_app():
    app = Flask(__name__)

    cors_origins = os.getenv("CORS_ORIGINS", "")

    cors_origins_list = cors_origins.split(",") if cors_origins else []

    CORS(app, resources={r"/*": {"origins": cors_origins_list}})
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"

    api.init_app(app)
    db.init_app(app)

    api.add_namespace(ns)

        # Create tables
    with app.app_context():
        db.create_all()

    return app
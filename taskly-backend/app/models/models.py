from ..extensions import db
from datetime import datetime, timezone
from enum import Enum

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    color = db.Column(db.String(10))
    hours = db.Column(db.Float, nullable=False, default=0.0) 
    completed = db.Column(db.Boolean, default=False, nullable=False)
    completed_at = db.Column(db.DateTime, default=None, nullable=True)
    created = db.Column(db.DateTime, default=datetime.now(timezone.utc))
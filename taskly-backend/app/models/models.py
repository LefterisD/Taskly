from ..extensions import db
from datetime import datetime, timezone

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    color = db.Column(db.String(10))
    created = db.Column(db.DateTime, default=datetime.now(timezone.utc))
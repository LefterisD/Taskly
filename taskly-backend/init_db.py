from app import create_app
from app.extensions import db
from app.models.models import Todo  # Import your models here
from datetime import datetime, timezone

app = create_app()

with app.app_context():
    db.create_all()

    # Example: Insert initial data if the table is empty
    # if not Todo.query.first():
    sample_todo = Todo(id=100, name="Sample Todo", color="#FFBE0B", completed=False, hours=0, created=datetime.now(timezone.utc), completed_at=None)
    db.session.add(sample_todo)
    db.session.commit()

    print("Database initialized and populated.")

from flask_restx import fields
from .extensions import api
from datetime import datetime, timezone


todo_model = api.model("Todo", {
    "id": fields.Integer,
    "name": fields.String,
    "color": fields.String,
    "created": fields.DateTime,
    "hours": fields.Float,
    "completed": fields.Boolean,
    "completed_at": fields.DateTime
})



todo_input_model_post = api.model("TodoInputPost", {
    "name": fields.String,
    "color": fields.String,
    "created": fields.DateTime,
})

todo_input_model = api.model("TodoInput", {
    "name": fields.String,
    "color": fields.String,
    "created": fields.DateTime,
    "completed": fields.Boolean,
    "completed_at": fields.DateTime
})
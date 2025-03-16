from flask_restx import Resource, Namespace
from .models.models import *
from .api_models import todo_model, todo_input_model
from .extensions import db
from flask import request

ns = Namespace("api")

@ns.route("/todos")
class TodoListAPI(Resource):
    @ns.marshal_list_with(todo_model)
    def get(self):
        try:
            todos = Todo.query.all()

            return todos, 200
        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500
        

    @ns.expect(todo_input_model)
    @ns.marshal_with(todo_model)
    def post(self):
        try:
            data = request.json  

            created_at = datetime.fromisoformat(data["created"])

            todo = Todo(name=data["name"], color=data["color"], created=created_at)

            db.session.add(todo)
            db.session.commit()

            db.session.refresh(todo)  

            return todo, 201
     
        except Exception as e:
            db.session.rollback()  # Rollback if an error occurs
            return {"message": f"An error occurred: {str(e)}"}, 400

        finally:
            db.session.close()  # Ensure session is closed properly

@ns.route("/todos/<int:id>")
class TodoAPI(Resource):
    @ns.expect(todo_input_model)
    @ns.marshal_with(todo_model)
    def put(self, id):
        try:
            data = request.json  

            if not data:
                return {"message": "Invalid request, JSON body missing"}, 400 

            created_at = datetime.fromisoformat(data["created"])

            todo = Todo.query.get(id)

            if not todo:
                return {"message": "Todo not found"}, 404 

            print(todo)

            todo.name = data["name"]
            todo.color = data["color"]
            todo.created = created_at

            db.session.commit()

            db.session.refresh(todo) 

            return todo, 200
        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 404
        finally:
            db.session.close()  # Ensure session is closed properly
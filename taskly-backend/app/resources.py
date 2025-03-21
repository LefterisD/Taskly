from flask_restx import Resource, Namespace
from .models.models import *
from .api_models import todo_model, todo_input_model, todo_input_model_post
from .extensions import db
from flask import request
from sqlalchemy.sql import func

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
        

    @ns.expect(todo_input_model_post)
    @ns.marshal_with(todo_model)
    def post(self):
        try:
            data = request.get_json()  

            if not data:
                return {"message": "Invalid JSON payload"}, 400

            created_at = datetime.fromisoformat(data["created"].replace("Z", "+00:00"))

            todo = Todo(name=data["name"], color=data["color"], created=created_at)

            db.session.add(todo)
            db.session.commit()

            db.session.refresh(todo)  

            return todo, 201
     
        except Exception as e:
            db.session.rollback()  
            return {"message": f"An error occurred: {str(e)}"}, 400

        finally:
            db.session.close()  

@ns.route("/todos/<int:id>")
class TodoAPI(Resource):
    @ns.expect(todo_input_model)
    @ns.marshal_with(todo_model)
    def put(self, id):
        try:
            data = request.json  
            print(data)
            if not data:
                return {"message": "Invalid request, JSON body missing"}, 400 

            created_at = datetime.fromisoformat(data["created"].replace("Z", "+00:00"))

            completed_at = None
            if data["completed_at"]:
                completed_at = datetime.fromisoformat(data["completed_at"].replace("Z", "+00:00"))

            todo = Todo.query.get(id)

            if not todo:
                return {"message": "Todo not found"}, 404 

            todo.name = data["name"]
            todo.color = data["color"]
            todo.created = created_at
            todo.completed = data["completed"]
            todo.completed_at = completed_at

            db.session.commit() 
            db.session.refresh(todo) 

            return todo, 200
        except Exception as e:
            db.session.rollback() 
            return {"message": f"An error occurred: {str(e)}"}, 404
        finally:
            db.session.close()  

    def delete(self, id):
        try:
            todo = Todo.query.get(id)
            if not todo:
                return {"message": "Todo not found"}, 404 


            db.session.delete(todo)
            db.session.commit()

            return {"message": "Todo deleted successfully"}, 200 
        except Exception as e:
            db.session.rollback() 
            return {"message": f"An error occurred: {str(e)}"}, 404
        finally:
            db.session.remove()  


@ns.route("/todos/stats")
class TodoAPI(Resource):
    def get(self):
        try:
            todos = Todo.query.all()

            total_completed = db.session.query(func.count(Todo.id)).filter(Todo.completed ==True).scalar()
            total_in_progress = db.session.query(func.count(Todo.id)).filter(Todo.completed ==False).scalar()

            upcoming = 0
            total_hours = 0
            for todo in todos:
                if todo.created > datetime.now():
                    upcoming += 1
                if todo.completed and todo.completed_at:
                    time_difference = (todo.completed_at - todo.created).total_seconds() / 3600 
                    total_hours += time_difference 
            

            return {
                "completed": total_completed,
                "in_progress": total_in_progress,
                "upcoming": upcoming,
                "total_hours": total_hours
            }, 200
        
        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500
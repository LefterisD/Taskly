from flask import Flask
from flask_restx import Api, Resource

app = Flask(__name__)  # Initialize Flask
api = Api(app)  # Initialize Flask-RESTx

# Define a simple API route
@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello world"}, 200

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app

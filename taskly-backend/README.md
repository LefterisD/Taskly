# Taskly Backend

This is the backend service for the Taskly application, built using Flask and Flask-RESTx. It provides a RESTful API to manage tasks and integrates with an SQLite database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Docker Usage](#docker-usage)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Prerequisites

Ensure you have the following installed:

- Python 3.11+
- pip (Python package manager)
- Docker & Docker Compose (for containerized deployment)

## Installation

To run the application locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/taskly-backend.git
   cd taskly-backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Set up environment variables (see [Environment Variables](#environment-variables)).
5. Initialize the database:
   ```sh
   python init_db.py
   ```
6. Start the Flask application:
   ```sh
   flask run --host=0.0.0.0 --port=5000
   ```

## Environment Variables

Create a `.env` file in the project root and define the necessary environment variables:

```
FLASK_APP=app
FLASK_RUN_HOST=0.0.0.0
FLASK_DEBUG=True
DATABASE_URL=sqlite:///instance/taskly.db
```

## Docker Usage

You can run the application inside a Docker container:

### Build and Run the Container

```sh
docker build -t taskly-backend .
docker run -p 5000:5000 --env-file .env taskly-backend
```

### Using Docker Compose

If you have a `docker-compose.yml`, you can start the entire system (backend & frontend) with:

```sh
docker compose up --build
```

## API Documentation

Once the backend is running, you can access the API documentation at:

```
http://localhost:5000/
```

## Troubleshooting

- **Port already in use?** Stop any process running on port 5000:
  ```sh
  lsof -i :5000  # Find process ID
  kill -9 <PID>  # Kill the process
  ```
- **Issues with Docker volumes?** Try removing the database volume:
  ```sh
  docker volume rm taskly-backend_sqlite_data
  ```
- **Dependency issues?** Try reinstalling dependencies:
  ```sh
  pip install --no-cache-dir -r requirements.txt
  ```

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

### License

This project is licensed under the MIT License.

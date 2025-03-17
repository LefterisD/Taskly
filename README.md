# Taskly Project

## Overview

Taskly is a full-stack task management application built using Flask for the backend and React with Vite for the frontend. It is designed to provide a seamless and responsive user experience with modern web technologies.

## Design Process

The UI/UX design process was mapped out using Excalidraw. View the detailed wireframes and workflows here:
[Design Process](https://excalidraw.com/#json=9mFCYb2WTydmiEER0ve6D,I5LptkXEiaI3dCK0ZEtaFw)

## Tech Stack

### Frontend

- **React + Vite**: Chosen for its fast build times and modern development experience.
- **Material UI**: Provides a sleek and professional design with ready-to-use components.
- **Framer Motion**: Enables smooth animations and UI interactions.
- **TanStack Query**: Efficient data fetching, caching, and synchronization.

### Backend

- **Flask + Flask-RESTx**: A lightweight Python web framework with a built-in API toolkit.
- **Flask-SQLAlchemy**: ORM for handling database interactions efficiently.
- **Flask-CORS**: Enables cross-origin requests for seamless frontend-backend communication.
- **SQLite**: Lightweight database for storing tasks.

### Deployment & Containerization

- **Docker & Docker Compose**: Ensures consistent environment across development and production.
- **Nginx**: Serves the React frontend and acts as a reverse proxy for the backend.

## Project Structure

```
/taskly-frontend   # React frontend with Vite
/taskly-backend    # Flask backend with REST API
/docker-compose.yml  # Manages services using Docker
```

## Installation & Setup

### Prerequisites

- Docker & Docker Compose installed

### Steps to Run

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/taskly.git
   cd taskly
   ```
2. Use Makefile to run the project:
   ```sh
   make up
   ```
3. Access the frontend at `http://localhost:3000` and the backend at `http://localhost:5001`.

## Why These Technologies?

- **React + Vite**: Provides a fast and modern development experience.
- **Material UI**: Ensures a consistent design system with ready-made components.
- **Framer Motion**: Adds smooth animations for better user experience.
- **TanStack Query**: Optimizes API calls, caching, and state management.
- **Flask-RESTx**: Streamlines API development with Swagger documentation.

## API Endpoints

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | /api/todos/stats | Fetch all todo stats |
| GET    | /api/todos       | Fetch all todos      |
| POST   | /api/todos       | Create a new todo    |
| PUT    | /api/todos/{id}  | Update a todo        |
| DELETE | /api/todos/{id}  | Delete a todo        |

## Contributing

Contributions are welcome! Fork the repo, make your changes, and submit a pull request.

## License

MIT License

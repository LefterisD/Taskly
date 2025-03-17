# Taskly Frontend - README

## Project Overview

Taskly is a frontend React application built with Vite, utilizing Material UI and React Query for efficient state management. This project is containerized using Docker and served using Nginx.

## Technologies Used

- **React 19**
- **Vite** for fast builds and hot reloading
- **Material UI** for styling
- **React Router 7** for navigation
- **Axios** for API requests
- **Framer Motion** for animations
- **Docker** for containerization
- **Nginx** as a production server

---

## Local Development

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 recommended)
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/taskly-frontend.git
   cd taskly-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Run tests:
   ```sh
   npm run test
   ```
5. Open the browser and navigate to:
   ```sh
   http://localhost:3000
   ```

---

## Environment Variables

Create a `.env` file in the root directory and define:

```sh
VITE_API_BASE_URL=http://localhost:5001/
```

---

## Docker Setup

### Build and Run with Docker Compose

1. Ensure Docker is installed and running.
2. Use Docker Compose to build and run the frontend service:
   ```sh
   docker compose up --build
   ```
3. Open the browser and navigate to:
   ```sh
   http://localhost:3000
   ```

### Dockerfile Explanation

The frontend uses a **multi-stage build**:

1. **Node.js (Build Stage)**: Installs dependencies and builds the Vite React app.
2. **Nginx (Production Stage)**: Serves the built React app using Nginx.

**Key Docker Commands:**

- **Build the image manually:**
  ```sh
  docker build -t taskly-frontend .
  ```
- **Run the container:**
  ```sh
  docker run -p 3000:80 taskly-frontend
  ```
- **Stop and remove containers:**
  ```sh
  docker compose down
  ```

---

## Nginx Configuration

The `nginx.conf` file is used to serve the frontend and handle React routes:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

This ensures that React's client-side routing works even when users refresh the page.

---

## Troubleshooting

### Issue: React App Not Loading on Page Refresh

Ensure Nginx is correctly configured to serve the `index.html` for unknown routes. See the **Nginx Configuration** section.

### Issue: API Requests Failing

- Check if the backend is running and accessible at `http://localhost:5001/`.
- Verify the `VITE_API_BASE_URL` value in the `.env` file.

### Issue: Docker Build Not Reflecting Changes

Run:

```sh
docker compose up --build --force-recreate
```

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m "Description"`
4. Push the branch: `git push origin feature-name`
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

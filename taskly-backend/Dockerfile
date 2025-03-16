# Use the official Python image
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Copy the application files
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Initialize the database before starting the Flask app
RUN python init_db.py

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]


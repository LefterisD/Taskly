# Use the official Python image
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Copy the application files
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run the Flask app
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=5000"]

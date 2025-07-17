# Use official Python base image
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Copy the backend code into the image
COPY . .

# Install dependencies
RUN pip install --no-cache-dir fastapi uvicorn spacy && \
    python -m spacy download en_core_web_sm

# Expose port 8000
EXPOSE 8000

# Command to run the app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install necessary packages
RUN apt-get update && \
    apt-get install -y python3-tk xvfb x11vnc fluxbox && \
    pip install --no-cache-dir -r requirements.txt
RUN pip install --force-reinstall -v "mediapipe==0.10.9"

# Expose the VNC port
EXPOSE 5900

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Set the entrypoint to the startup script
CMD ["/start.sh"]
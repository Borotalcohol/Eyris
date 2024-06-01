#!/bin/bash

# Start Xvfb
Xvfb :99 -screen 0 1024x768x16 &

# Start fluxbox
fluxbox &

# Start x11vnc
x11vnc -display :99 -nopw -forever &

# Start ffmpeg to stream the webcam into the container
# ffmpeg -f avfoundation -framerate 30 -video_size 640x480 -i "0:0" -f v4l2 /dev/video0 &

# Set display and run the Tkinter app
export DISPLAY=:99
python /app/DatasetMaker.py

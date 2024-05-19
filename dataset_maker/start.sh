#!/bin/bash

# Start Xvfb
Xvfb :99 -screen 0 1024x768x16 &

# Start fluxbox
fluxbox &

# Start x11vnc
x11vnc -display :99 -nopw -forever &

# Set display and run the Tkinter app
export DISPLAY=:99
python /app/DatasetMaker.py
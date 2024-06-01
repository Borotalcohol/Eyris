import os
import cv2
import queue
import threading
import numpy as np
import tkinter as tk
from PIL import Image, ImageTk

import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

directions = ["left", "right", "up", "down", "center"]
model_path = './face_landmarker.task'
dataset_path = './dataset'
data_filename = 'landmarks.csv'
user_id = "christian_desktop_noglasses"

class VideoCapture:
  def __init__(self, name):
    self.cap = cv2.VideoCapture(name)
    self.q = queue.Queue()
    t = threading.Thread(target=self._reader)
    t.daemon = True
    t.start()

  def _reader(self):
    while True:
      ret, frame = self.cap.read()
      if not ret:
        break
      if not self.q.empty():
        try:
          self.q.get_nowait()
        except queue.Empty:
          pass
      self.q.put(frame)

  def read(self):
    while not self.q.empty():
      try:
          self.q.get_nowait()  # discard all frames in the queue
      except queue.Empty:
          break
    return self.q.get()  # get the latest frame

class SimpleTkinterWindow:
    def __init__(self, root, cap, landmarker, numeric_ids = [0,0,0,0,0]):
        self.curr_dir = 0
        self.cap = cap
        self.landmarker = landmarker
        self.numeric_ids = numeric_ids

        self.root = root
        self.root.title("Simple Tkinter Window")
        self.root.geometry("800x600")

        self.left_eye_text = tk.StringVar()
        self.left_eye_text.set("Previous Left Eye Image")
        self.left_eye = tk.Label(self.root, textvariable=self.left_eye_text, font=("Arial", 16))
        self.left_eye.grid(row=0, column=0, pady=10)

        self.right_eye_text = tk.StringVar()
        self.right_eye_text.set("Previous Right Eye Image")
        self.right_eye = tk.Label(self.root, textvariable=self.right_eye_text, font=("Arial", 16))
        self.right_eye.grid(row=0, column=1, pady=10)

        self.label_text = tk.StringVar()
        self.label_text.set(directions[self.curr_dir].upper())
        self.label = tk.Label(self.root, textvariable=self.label_text, font=("Arial", 68))
        self.label.grid(row=1, column=0, pady=10, columnspan=2)

        self.root.grid_rowconfigure(0, weight=1)
        self.root.grid_rowconfigure(1, weight=1)
        self.root.grid_columnconfigure(0, weight=1)
        self.root.grid_columnconfigure(1, weight=1)

        self.root.bind("<KeyPress-s>", self.update_label)

    def update_label(self, event):
        direction_label = directions[self.curr_dir]
        numeric_id = int(self.numeric_ids[self.curr_dir])

        file_name_l = f'{user_id}_{direction_label}_{numeric_id}_l.png'
        file_name_r = f'{user_id}_{direction_label}_{numeric_id}_r.png'

        face_landmarks, frame = get_face_landmarks(self.cap, self.landmarker)

        if (face_landmarks is None or frame is None):
            print("No face detected")
            return

        left_eye_landmarks = [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7]
        left_pupil_landmarks = [471, 470, 469, 472, 468]
        right_eye_landmarks = [362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381, 382]
        right_pupil_landmarks = [476, 475, 474, 477, 473]

        left_eye_image = get_grayscale_eye_image(left_eye_landmarks, face_landmarks, frame)

        if left_eye_image is None: return

        rgb_left_eye_image = cv2.cvtColor(left_eye_image, cv2.COLOR_BGR2RGB)
        left_eye_image = Image.fromarray(left_eye_image)
        left_tk_image = ImageTk.PhotoImage(Image.fromarray(rgb_left_eye_image))

        right_eye_image = get_grayscale_eye_image(right_eye_landmarks, face_landmarks, frame)

        if right_eye_image is None: return

        rgb_right_eye_image = cv2.cvtColor(right_eye_image, cv2.COLOR_BGR2RGB)
        right_eye_image = Image.fromarray(right_eye_image)
        right_tk_image = ImageTk.PhotoImage(Image.fromarray(rgb_right_eye_image))

        self.numeric_ids[self.curr_dir] += 1

        # Write landmarks data in csv file
        left_eye_landmarks_data = np.array([(face_landmarks[i].x, face_landmarks[i].y) for i in left_eye_landmarks + left_pupil_landmarks]).flatten()
        right_eye_landmarks_data = np.array([(face_landmarks[i].x, face_landmarks[i].y) for i in right_eye_landmarks + right_pupil_landmarks]).flatten()
        csv_record = f'{user_id}, {direction_label}, {", ".join(map(str, left_eye_landmarks_data))}, {", ".join(map(str, right_eye_landmarks_data))}\n'

        with open(data_filename, 'a') as f:
            f.write(csv_record)

        self.curr_dir = self.curr_dir + 1 if self.curr_dir < len(directions) - 1 else 0
        self.label_text.set(directions[self.curr_dir].upper())

        self.left_eye.configure(image=left_tk_image)
        self.left_eye.image = left_tk_image

        self.right_eye.configure(image=right_tk_image)
        self.right_eye.image = right_tk_image

        new_file_path_l = os.path.join(dataset_path, file_name_l)
        new_file_path_r = os.path.join(dataset_path, file_name_r)

        cv2.imwrite(new_file_path_l, np.array(left_eye_image))
        cv2.imwrite(new_file_path_r, np.array(right_eye_image))

def opencv_config():
    cap = VideoCapture('udp://localhost:12345')

    BaseOptions = mp.tasks.BaseOptions
    FaceLandmarker = mp.tasks.vision.FaceLandmarker
    FaceLandmarkerOptions = mp.tasks.vision.FaceLandmarkerOptions
    VisionRunningMode = mp.tasks.vision.RunningMode

    options = FaceLandmarkerOptions(
        base_options=BaseOptions(model_asset_path=model_path),
        running_mode=VisionRunningMode.IMAGE)

    landmarker = FaceLandmarker.create_from_options(options)
    return cap, landmarker


def get_face_landmarks(cap, landmarker):
    frame = cap.read()
    frame = cv2.flip(frame, 1)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame)
    face_landmarker_result = landmarker.detect(mp_image)

    if len(face_landmarker_result.face_landmarks) == 0: return None, None

    return face_landmarker_result.face_landmarks[0], frame

def get_grayscale_eye_image(eye_points, facial_landmarks, frame):
    if facial_landmarks is None: return None
                
    eye_region = np.array([(facial_landmarks[i].x * frame.shape[1], facial_landmarks[i].y * frame.shape[0]) for i in eye_points], np.int32)
    eye = frame
        
    min_x = np.min(eye_region[:, 0])
    max_x = np.max(eye_region[:, 0])
    min_y = np.min(eye_region[:, 1])
    max_y = np.max(eye_region[:, 1])

    eye = cv2.resize(eye[min_y:max_y, min_x:max_x], (200, 100), fx=0, fy=0)

    return eye

def get_current_numeric_ids():
    files = os.listdir(dataset_path)

    count_l = sum(1 for file in files if file.startswith(f'{user_id}_{directions[0]}')) / 2
    count_r = sum(1 for file in files if file.startswith(f'{user_id}_{directions[1]}')) / 2
    count_u = sum(1 for file in files if file.startswith(f'{user_id}_{directions[2]}')) / 2
    count_d = sum(1 for file in files if file.startswith(f'{user_id}_{directions[3]}')) / 2
    count_c = sum(1 for file in files if file.startswith(f'{user_id}_{directions[4]}')) / 2

    counters = [count_l, count_r, count_u, count_d, count_c]

    print(counters)

    return counters

if __name__ == "__main__":
    root = tk.Tk()
    cap, landmarker = opencv_config()
    num_ids = get_current_numeric_ids()
    app = SimpleTkinterWindow(root, cap, landmarker, num_ids)

    root.mainloop()
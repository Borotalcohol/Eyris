import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { inferenceDirectionClassifier } from "../utils/predict";

const WebcamComponent: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const leftEyeImageCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightEyeImageCanvasRef = useRef<HTMLCanvasElement>(null);
  var leftEyeImage: HTMLImageElement;
  var rightEyeImage: HTMLImageElement;

  useEffect(() => {
    const loadModels = async () => {
      // Load face-api.js models
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    };

    loadModels();
  }, []);

  const detectFaceLandmarks = async () => {
    if (webcamRef.current) {
      const video = webcamRef.current.video as HTMLVideoElement;
      const result = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      console.log(result);

      if (result.length > 0) {
        const landmarksPositions = result[0].landmarks.positions;

        const leftEye = landmarksPositions.slice(36, 42);
        const rightEye = landmarksPositions.slice(42, 48);

        // Create image elements for left and right eyes
        const _leftEyeImage = createEyeImage(video, leftEye);
        const _rightEyeImage = createEyeImage(video, rightEye);

        if (_leftEyeImage && _rightEyeImage) {
          const container = document.getElementById("eyesContainer");
          if (!container) return;
          container && (container.innerHTML = "");

          leftEyeImage = _leftEyeImage!;
          rightEyeImage = _rightEyeImage!;

          const leftEyeImageCanvas = leftEyeImageCanvasRef.current;
          const leftCtx = leftEyeImageCanvas!.getContext("2d");
          leftCtx!.drawImage(leftEyeImage, 0, 0, 200, 100);

          const rightEyeImageCanvas = rightEyeImageCanvasRef.current;
          const rightCtx = rightEyeImageCanvas!.getContext("2d");
          rightCtx!.drawImage(rightEyeImage, 0, 0, 200, 100);

          submitInference();

          container.appendChild(leftEyeImage);
          container.appendChild(rightEyeImage);

          document.body.appendChild(container);
        } else {
          console.log("Returned null");
        }
      }
    }
  };

  const createEyeImage = (
    video: HTMLVideoElement,
    eyePositions: faceapi.Point[]
  ) => {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    // Set canvas dimensions to match the video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame on the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const offsetX = [-5, 0, 0, 5, 0, 0];
    const offsetY = [0, -5, -5, 0, 5, 5];

    if (eyePositions.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(
        eyePositions[0].x + offsetX[0],
        eyePositions[0].y + offsetY[0]
      );

      for (let i = 1; i < eyePositions.length; i++) {
        ctx.lineTo(
          eyePositions[i].x + offsetX[i],
          eyePositions[i].y + offsetY[i]
        );
      }

      ctx.closePath();
      ctx.clip();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const minX =
      eyePositions.reduce(
        (min, pos) => Math.min(pos.x, min),
        eyePositions[0].x
      ) - 5;
    const maxX =
      eyePositions.reduce(
        (max, pos) => Math.max(pos.x, max),
        eyePositions[0].x
      ) + 5;
    const minY =
      eyePositions.reduce(
        (min, pos) => Math.min(pos.y, min),
        eyePositions[0].y
      ) - 5;
    const maxY =
      eyePositions.reduce(
        (max, pos) => Math.max(pos.y, max),
        eyePositions[0].y
      ) + 5;

    const imageData = ctx.getImageData(minX, minY, maxX - minX, maxY - minY);

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) return null;

    croppedCanvas.width = maxX - minX;
    croppedCanvas.height = maxY - minY;
    croppedCtx.putImageData(imageData, 0, 0);

    // Create a new canvas for the enlarged image
    const enlargedCanvas = document.createElement("canvas");
    const enlargedCtx = enlargedCanvas.getContext("2d");

    if (!enlargedCtx) return null;

    enlargedCanvas.width = 200;
    enlargedCanvas.height = 100;

    enlargedCtx.scale(-1, 1);

    // Draw the cropped image onto the enlarged canvas with a larger scale
    enlargedCtx.drawImage(
      croppedCanvas,
      0,
      0,
      croppedCanvas.width,
      croppedCanvas.height,
      -enlargedCanvas.width,
      0,
      enlargedCanvas.width,
      enlargedCanvas.height
    );

    // Create an image element and set its source to the enlarged canvas
    const enlargedImage = new Image();
    enlargedImage.src = enlargedCanvas.toDataURL();

    return enlargedImage;
  };

  const submitInference = async () => {
    var [inferenceResult, inferenceTime] = await inferenceDirectionClassifier(
      leftEyeImage.src,
      rightEyeImage.src
    );

    const container = document.getElementById("predictionLabel");
    if (!container) return;
    container && (container.innerHTML = "");

    const paragraph = document.createElement("p");

    paragraph.textContent = inferenceResult;
    paragraph.style.color = "white";

    container?.appendChild(paragraph);
  };

  const handleCapture = () => {
    detectFaceLandmarks();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Webcam
        ref={webcamRef}
        audio={false}
        width={640}
        height={480}
        screenshotFormat="image/jpeg"
      />
      <button
        className="px-5 py-2 mt-5 text-black bg-white rounded-md"
        onClick={handleCapture}
      >
        Capture
      </button>
      <div className="flex items-center justify-center gap-3">
        <canvas ref={leftEyeImageCanvasRef} width={200} height={100} />
        <canvas ref={rightEyeImageCanvasRef} width={200} height={100} />
      </div>
    </div>
  );
};

export default WebcamComponent;

import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import {
  FilesetResolver,
  FaceLandmarker,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import { inferenceDirectionClassifier } from "../utils/predict";

const WebcamComponent: React.FC = () => {
  let faceLandmarker: FaceLandmarker | null = null;
  const webcamRef = useRef<Webcam>(null);
  const leftEyeImageCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightEyeImageCanvasRef = useRef<HTMLCanvasElement>(null);
  var leftEyeImage: HTMLImageElement;
  var rightEyeImage: HTMLImageElement;

  useEffect(() => {
    const loadModels = async () => {
      await initializeFaceLandmarker();
    };

    loadModels();
  }, []);

  // useEffect(() => {
  //   // Set up interval to run inference every 250ms
  //   const inferenceInterval = setInterval(() => {
  //     detectFaceLandmarks();
  //   }, 250);

  //   // Clear the interval when the component is unmounted
  //   return () => clearInterval(inferenceInterval);
  // }, []);

  const initializeFaceLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "/models/face_landmarker.task",
      },
    });
  };

  const detectFaceLandmarks = async () => {
    if (webcamRef.current) {
      const video = webcamRef.current.video as HTMLVideoElement;

      if (faceLandmarker === null) {
        await initializeFaceLandmarker();
      }

      const faceLandmarkerResult = faceLandmarker!.detect(video);

      if (
        !faceLandmarkerResult ||
        faceLandmarkerResult.faceLandmarks.length === 0
      )
        return;

      const faceLandmarks = faceLandmarkerResult.faceLandmarks[0];

      const leftEyeNumbers = [
        33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144,
        163, 7,
      ];
      const rightEyeNumbers = [
        362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380,
        381, 382,
      ];

      const leftEyeLandmarks = leftEyeNumbers.map(
        (index) => faceLandmarks[index]
      );
      const rightEyeLandmarks = rightEyeNumbers.map(
        (index) => faceLandmarks[index]
      );

      // Create image elements for left and right eyes
      const _leftEyeImage = createEyeImage(video, leftEyeLandmarks);
      const _rightEyeImage = createEyeImage(video, rightEyeLandmarks);

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
      }
    }
  };

  const createEyeImage = (
    video: HTMLVideoElement,
    eyePositions: NormalizedLandmark[]
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

    if (eyePositions.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(
        eyePositions[0].x * canvas.width,
        eyePositions[0].y * canvas.height
      );

      for (let i = 1; i < eyePositions.length; i++) {
        ctx.lineTo(
          eyePositions[i].x * canvas.width,
          eyePositions[i].y * canvas.height
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
      ) * canvas.width;
    const maxX =
      eyePositions.reduce(
        (max, pos) => Math.max(pos.x, max),
        eyePositions[0].x
      ) * canvas.width;
    const minY =
      eyePositions.reduce(
        (min, pos) => Math.min(pos.y, min),
        eyePositions[0].y
      ) * canvas.height;
    const maxY =
      eyePositions.reduce(
        (max, pos) => Math.max(pos.y, max),
        eyePositions[0].y
      ) * canvas.height;

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

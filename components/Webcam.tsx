import Webcam from "react-webcam";
import React, { useRef, useEffect, ReactNode, useState } from "react";
import { FaceLandmarker } from "@mediapipe/tasks-vision";

import { getEyesDirectionPrediction } from "../utils/modelHelper";
import { extractEyesImages, isEyeClosed } from "../utils/eyeImageHelper";
import {
  initializeFaceLandmarker,
  detectFaceLandmarks,
} from "../utils/mediapipeHelper";

type Props = {
  children: ReactNode;
  onPrediction: Function;
};

const WebcamComponent = ({ children, onPrediction }: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const predictionParagraphRef = useRef<HTMLParagraphElement | null>(null);

  const leftEyeImageCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightEyeImageCanvasRef = useRef<HTMLCanvasElement>(null);
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(
    null
  );

  const [inferenceActive, setInferenceActive] = useState(false);

  const activatedSound = new Audio("/sounds/activated.mp3");
  const deactivatedSound = new Audio("/sounds/deactivated.mp3");

  const consequentClosedEyesThreshold = 8;
  let consequentClosedEyesPredictions = 0;

  useEffect(() => {
    const loadModels = async () => {
      const _faceLandmarker = await initializeFaceLandmarker();
      setFaceLandmarker(_faceLandmarker);
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (!faceLandmarker) return;

    const inferenceInterval = setInterval(() => {
      if (webcamRef.current && faceLandmarker) {
        // Fetch face landmarks always
        const video = webcamRef.current.video as HTMLVideoElement;
        const faceLandmarks = detectFaceLandmarks(video, faceLandmarker);

        if (faceLandmarks) {
          // Use face landmarks to detect blinking to activate or disable inference
          const leftEyeClosed = isEyeClosed(video, faceLandmarks, [159, 145]);
          const rightEyeClosed = isEyeClosed(video, faceLandmarks, [386, 374]);

          if (leftEyeClosed && rightEyeClosed) {
            consequentClosedEyesPredictions++;

            if (
              consequentClosedEyesPredictions === consequentClosedEyesThreshold
            ) {
              consequentClosedEyesPredictions = 0;
              setInferenceActive((prevState) => {
                const newState = !prevState;
                if (newState) activatedSound.play();
                else deactivatedSound.play();
                return newState;
              });
            }
          } else consequentClosedEyesPredictions = 0;

          extractEyesImages(
            video,
            faceLandmarks,
            leftEyeImageCanvasRef,
            rightEyeImageCanvasRef
          )
            .then(([leftEyeImage, rightEyeImage]) => {
              // Predict eyes position only when inference is in active state
              if (inferenceActive) {
                return getEyesDirectionPrediction(
                  leftEyeImage!,
                  rightEyeImage!
                );
              }
            })
            .then((prediction) => {
              if (!prediction) return;

              onPrediction(prediction);
              displayInferenceResult(prediction);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    }, 250);

    const cleanup = () => {
      clearInterval(inferenceInterval);
    };

    if (!faceLandmarker) cleanup();

    return cleanup;
  }, [inferenceActive, faceLandmarker]);

  const displayInferenceResult = (prediction: string) => {
    predictionParagraphRef.current!.textContent = prediction;
  };

  return (
    <div
      className={
        "flex flex-col justify-center gap-5 max-w-[1200px] p-3 w-full " +
        (inferenceActive ? "border-8 border-green-500" : "")
      }
    >
      <div className="flex items-center justify-center gap-3">
        <Webcam
          ref={webcamRef}
          audio={false}
          width={240}
          height={120}
          screenshotFormat="image/jpeg"
        />
        <canvas ref={leftEyeImageCanvasRef} width={200} height={100} />
        <canvas ref={rightEyeImageCanvasRef} width={200} height={100} />
        <button
          className="px-3 py-2 text-black bg-white rounded-md"
          onClick={() => setInferenceActive((prevState) => !prevState)}
        >
          {inferenceActive ? "Stop Inferencing" : "Start Inferencing"}
        </button>
      </div>
      <div
        ref={predictionParagraphRef}
        className="flex items-center justify-center text-center text-white"
      ></div>
      {children}
    </div>
  );
};

export default WebcamComponent;

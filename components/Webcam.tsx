import Webcam from "react-webcam";
import React, { useRef, useEffect, ReactNode, useState } from "react";
import { FaceLandmarker } from "@mediapipe/tasks-vision";

import { getEyesDirectionPrediction } from "../utils/modelHelper";
import { extractEyesImages, isEyeClosed } from "../utils/eyeImageHelper";
import {
  initializeFaceLandmarker,
  detectFaceLandmarks,
} from "../utils/mediapipeHelper";
import Draggable from "react-draggable";
import useMediaQuery from "@mui/material/useMediaQuery";

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

  const [landmarksDetectionActive, setLandmarksDetectionActive] =
    useState(true);
  const [inferenceActive, setInferenceActive] = useState(false);

  const webcamSizes = [140, 180, 240];

  const small = useMediaQuery("(max-width:768px)");
  const medium = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const large = useMediaQuery("(min-width: 1025px)");
  const breakpoints = [small, medium, large];
  const webcamWidth = webcamSizes[breakpoints.findIndex((_) => _)];

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

    if (!faceLandmarker || !landmarksDetectionActive) cleanup();

    return cleanup;
  }, [inferenceActive, landmarksDetectionActive, faceLandmarker]);

  const displayInferenceResult = (prediction: string) => {
    predictionParagraphRef.current!.textContent = prediction;
  };

  const onStartDragHandler = () => {
    // Stop the landmarker detection to improve fluid drag movement
    setLandmarksDetectionActive(false);
  };

  const onStopDragHandler = () => {
    // Resume the landmarker detection
    setLandmarksDetectionActive(true);
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-5 max-w-[1200px] p-3 w-full">
        {children}
      </div>
      <Draggable onStart={onStartDragHandler} onStop={onStopDragHandler}>
        <div className="fixed bottom-0 right-0 p-4 m-4 bg-[#2D2D2D] border border-white/30 text-white rounded-lg shadow-md cursor-grab">
          <div className="flex items-center justify-center gap-2 mb-3 text-sm text-center text-white md:text-md">
            {inferenceActive ? (
              <>
                Last prediction:{" "}
                <div
                  ref={predictionParagraphRef}
                  className="flex items-center justify-center font-bold text-center text-white uppercase"
                ></div>
              </>
            ) : (
              <p
                className={`w-auto text-center text-white break-words text-wrap max-w-[240px]`}
              >
                Inference Not Active
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <canvas
              className="rounded-tl-sm"
              ref={leftEyeImageCanvasRef}
              width={webcamWidth / 2}
              height={webcamWidth / 4}
            />
            <canvas
              className="rounded-tr-sm"
              ref={rightEyeImageCanvasRef}
              width={webcamWidth / 2}
              height={webcamWidth / 4}
            />
          </div>
          <Webcam
            ref={webcamRef}
            audio={false}
            width={webcamWidth}
            height={120}
            screenshotFormat="image/jpeg"
            className="rounded-b-sm"
          />
        </div>
      </Draggable>
      <div
        className={
          "fixed top-0 bottom-0 left-0 right-0 w-full h-full pointer-events-none " +
          (inferenceActive ? "border-[5px] border-green-500" : "")
        }
      ></div>
    </>
  );
};

export default WebcamComponent;

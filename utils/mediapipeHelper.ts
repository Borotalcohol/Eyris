import {
  FaceLandmarker,
  FilesetResolver,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";

export const initializeFaceLandmarker = async (): Promise<FaceLandmarker> => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm"
  );
  const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "/models/face_landmarker.task",
    },
  });

  return faceLandmarker;
};

export const detectFaceLandmarks = (
  video: HTMLVideoElement,
  faceLandmarker: FaceLandmarker
): NormalizedLandmark[] | null => {
  const faceLandmarkerResult = faceLandmarker.detect(video);

  if (!faceLandmarkerResult || faceLandmarkerResult.faceLandmarks.length === 0)
    return null;

  return faceLandmarkerResult.faceLandmarks[0];
};

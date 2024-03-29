import { NormalizedLandmark } from "@mediapipe/tasks-vision";

const leftEyeNumbers = [
  33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7,
];
const rightEyeNumbers = [
  362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381,
  382,
];
const closedEyeThreshold = 0.8;

export const loadEyeImages = (
  video: HTMLVideoElement,
  faceLandmarks: NormalizedLandmark[]
) => {
  const leftEyeLandmarks = leftEyeNumbers.map((index) => faceLandmarks[index]);
  const rightEyeLandmarks = rightEyeNumbers.map(
    (index) => faceLandmarks[index]
  );

  const leftEyeImage = createEyeImage(video, leftEyeLandmarks);
  const rightEyeImage = createEyeImage(video, rightEyeLandmarks);

  return { leftEyeImage, rightEyeImage };
};

export const handleImageLoaded = async (
  image: HTMLImageElement,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  checkImagesLoaded: Function
) => {
  image.onload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      image,
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
    await checkImagesLoaded();
  };
};

export const extractEyesImages = (
  video: HTMLVideoElement,
  faceLandmarks: NormalizedLandmark[],
  leftEyeImageCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  rightEyeImageCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>
): Promise<[HTMLImageElement, HTMLImageElement]> => {
  return new Promise(async (resolve, _) => {
    const { leftEyeImage, rightEyeImage } = loadEyeImages(video, faceLandmarks);

    let imagesLoaded = 0;

    const checkImagesLoaded = async () => {
      imagesLoaded++;

      if (imagesLoaded === 2) {
        resolve([leftEyeImage!, rightEyeImage!]);
      }
    };

    if (leftEyeImage && rightEyeImage) {
      handleImageLoaded(leftEyeImage, leftEyeImageCanvasRef, checkImagesLoaded);
      handleImageLoaded(
        rightEyeImage,
        rightEyeImageCanvasRef,
        checkImagesLoaded
      );
    }
  });
};

export const isEyeClosed = (
  video: HTMLVideoElement,
  landmarks: NormalizedLandmark[],
  positions: number[]
): boolean => {
  const filteredLandmarks = positions.map(
    (index) => landmarks[index].y * video.height
  );

  const upperPosition = filteredLandmarks[0];
  const lowerPosition = filteredLandmarks[1];

  return Math.abs(upperPosition - lowerPosition) < closedEyeThreshold;
};

export const createEyeImage = (
  video: HTMLVideoElement,
  eyePositions: NormalizedLandmark[]
) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const minX =
    eyePositions.reduce((min, pos) => Math.min(pos.x, min), eyePositions[0].x) *
    canvas.width;
  const maxX =
    eyePositions.reduce((max, pos) => Math.max(pos.x, max), eyePositions[0].x) *
    canvas.width;
  const minY =
    eyePositions.reduce((min, pos) => Math.min(pos.y, min), eyePositions[0].y) *
    canvas.height;
  const maxY =
    eyePositions.reduce((max, pos) => Math.max(pos.y, max), eyePositions[0].y) *
    canvas.height;

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

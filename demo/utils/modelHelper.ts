import * as ort from "onnxruntime-web";
import _ from "lodash";
import { inferenceDirectionClassifier } from "./predict";

let session: ort.InferenceSession | null;

export async function initializeDirectionClassifierModel() {
  // Create session and set options.
  session = await ort.InferenceSession.create(
    "./_next/static/chunks/pages/eye_direction_classifier_2.onnx",
    { executionProviders: ["webgl"], graphOptimizationLevel: "all" }
  );
  // console.log("Inference session created");
}

export async function runDirectionClassifierModel(
  leftEyePreprocessedData: any,
  rightEyePreprocessedData: any
): Promise<[any, number]> {
  if (!session) {
    await initializeDirectionClassifierModel();
  }

  var [results, inferenceTime] = await runInference(
    session!,
    leftEyePreprocessedData,
    rightEyePreprocessedData
  );
  return [results, inferenceTime];
}

async function runInference(
  session: ort.InferenceSession,
  leftEyePreprocessedData: any,
  rightEyePreprocessedData: any
): Promise<[any, number]> {
  const labels = ["left", "right", "up", "down", "center"];
  const start = new Date();

  const feeds: Record<string, ort.Tensor> = {};
  feeds[session.inputNames[0]] = leftEyePreprocessedData;
  feeds[session.inputNames[1]] = rightEyePreprocessedData;

  const outputData = await session.run(feeds);
  const end = new Date();
  const inferenceTime = (end.getTime() - start.getTime()) / 1000;

  const output = outputData[session.outputNames[0]];
  const outputSoftmax = softmax(Array.prototype.slice.call(output.data));
  const prediction = argmax(outputSoftmax);
  const predictedLabel = labels[prediction];

  return [predictedLabel, inferenceTime];
}

function softmax(resultArray: number[]): any {
  const largestNumber = Math.max(...resultArray);

  const expValues = resultArray.map((resultItem) =>
    Math.exp(resultItem - largestNumber)
  );
  const sumOfExp = expValues.reduce(
    (prevNumber, currentNumber) => prevNumber + currentNumber
  );

  return expValues.map((expValue) => expValue / sumOfExp);
}

function argmax(resultArray: number[]): number {
  const highestValueIndex = resultArray.reduce(
    (maxIndex, current, currentIndex, array) =>
      current > array[maxIndex] ? currentIndex : maxIndex,
    0
  );

  return highestValueIndex;
}

export const getEyesDirectionPrediction = async (
  leftEyeImage: HTMLImageElement,
  rightEyeImage: HTMLImageElement
): Promise<string | null> => {
  if (
    leftEyeImage.width === 0 ||
    leftEyeImage.height === 0 ||
    rightEyeImage.width === 0 ||
    rightEyeImage.height === 0
  )
    return null;

  const [inferenceResult, _] = await inferenceDirectionClassifier(
    leftEyeImage.src,
    rightEyeImage.src
  );

  return inferenceResult;
};

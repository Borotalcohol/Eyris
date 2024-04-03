import { getImageTensorFromPath } from "./imageHelper";
import { runDirectionClassifierModel } from "./modelHelper";

export async function inferenceDirectionClassifier(
  leftEyeImagePath: string,
  rightEyeImagePath: string
): Promise<[any, number]> {
  // 1. Convert image to tensor
  const leftEyeImageTensor = await getImageTensorFromPath(leftEyeImagePath);
  const rightEyeImageTensor = await getImageTensorFromPath(rightEyeImagePath);

  // 2. Run model
  const [predictions, inferenceTime] = await runDirectionClassifierModel(
    leftEyeImageTensor,
    rightEyeImageTensor
  );
  // 3. Return predictions and the amount of time it took to inference.
  return [predictions, inferenceTime];
}

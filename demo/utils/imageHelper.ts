import { Jimp } from "jimp";
import { Tensor } from "onnxruntime-web";

export async function getImageTensorFromPath(
  path: string,
  dims: number[] = [1, 3, 100, 200]
): Promise<Tensor> {
  // 1. load the image
  var image = await loadImageFromPath(path, dims[3], dims[2]);
  // 2. convert to tensor
  var imageTensor = imageDataToTensor(image, dims);

  // 3. return the tensor
  return imageTensor;
}

async function loadImageFromPath(
  path: string,
  width: number = 200,
  height: number = 100
): Promise<any> {
  // Use Jimp to load the image and resize it.
  var imageData = await Jimp.read(path).then((imageBuffer) => {
    return imageBuffer;
  });

  return imageData;
}

function imageDataToTensor(image: any, dims: number[]): Tensor {
  // 1. Get buffer data from image and create R, G, and B arrays.
  var imageBufferData = image.bitmap.data;
  const [redArray, greenArray, blueArray] = new Array(
    new Array<number>(),
    new Array<number>(),
    new Array<number>()
  );

  // 2. Loop through the image buffer and extract the R, G, and B channels
  for (let i = 0; i < imageBufferData.length; i += 4) {
    redArray.push(imageBufferData[i]);
    greenArray.push(imageBufferData[i + 1]);
    blueArray.push(imageBufferData[i + 2]);
    // skip data[i + 3] to filter out the alpha channel
  }

  // 3. Concatenate RGB to transpose [100, 200, 3] -> [3, 100, 200] to a number array
  const transposedData = redArray.concat(greenArray).concat(blueArray);

  // 4. convert to float32
  let i,
    l = transposedData.length; // length, we need this for the loop
  // create the Float32Array size 3 * 100 * 200 for these dimensions output
  const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
  for (i = 0; i < l; i++) {
    float32Data[i] = transposedData[i] / 255.0; // convert to float
  }
  // 5. create the tensor object from onnxruntime-web.
  const inputTensor = new Tensor("float32", float32Data, dims);
  return inputTensor;
}

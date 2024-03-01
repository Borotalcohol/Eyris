import WebcamComponent from "./Webcam";

const PredictionDemo: React.FC = () => {
  return (
    <>
      <WebcamComponent />
      <div id="eyesContainer" className="flex items-center justify-center" />
      <div
        id="predictionLabel"
        className="flex items-center justify-center text-center"
      />
    </>
  );
};

export default PredictionDemo;

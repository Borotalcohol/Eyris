"use client";

import Image from "next/image";
import SecondaryButton from "@/components/Button/Secondary";
import TertiaryButton from "@/components/Button/Tertiary";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

import { useState } from "react";

function HowItsMade() {
  const [step, setStep] = useState(0);
  const stepsData = [
    {
      imagePath: "/FaceLandmarks.png",
      reference: (
        <p>
          Image from:{" "}
          <a
            className="underline text-white/90"
            href="https://github.com/IS2AI/thermal-facial-landmarks-detection"
            target="_blank"
          >
            https://github.com/IS2AI/thermal-facial-landmarks-detection
          </a>
        </p>
      ),
      text: (
        <p>
          At the core of it all there is AI.
          <br />
          <br /> In particular, the first step is leveraging a model that,
          acquiring the image of the face from the webcam, is able to recognize
          various points of it (as shown in the image on the left).
          <br />
          <br />
          The ones we're interested in, are the points that are defining the
          eyes.
        </p>
      ),
    },
    {
      imagePath: "/EyesLandmarks.png",
      reference: (
        <p>Left and right eye extracted using Dlib and OpenCV (Our dataset)</p>
      ),
      text: (
        <p>
          After a face has been detected, and we have drawn the landmarks, we
          can use the ones regarding the two eyes to extract two images: one for
          the left and the other for the right eye.
          <br />
          <br /> We are interested in knowing in which direction the eyes are
          looking at: left, right, up, down or center?
        </p>
      ),
    },
    {
      imagePath: "/ModelArchitecture.png",
      reference: <p>Simplified representation of our custom model</p>,
      text: (
        <p>
          The final step is to plug inside our custom and very simple AI model
          the images of the two eyes and get its prediction about the direction
          in which they're more likely to be looking at (left, right, up, down
          or center).
          <br />
          <br /> The direction is then used to decide which of the available
          actions has to be executed (skip to previous song, skip to next,
          pause, play or, most of the time, no action).
        </p>
      ),
    },
  ];

  const handleGoBack = () => {
    if (step > 0) setStep((prevStep) => prevStep - 1);
  };

  const handleGoNext = () => {
    if (step < stepsData.length - 1) setStep((prevStep) => prevStep + 1);
  };

  return (
    <section
      id="how-its-made"
      className="relative grid w-full col-span-12 pt-16 pb-24 grid-cols-subgrid"
    >
      <div className="flex flex-col items-center col-span-3 col-start-3 gap-3 text-center text-white/70 font-avenir">
        <Image
          src={stepsData[step].imagePath}
          alt="Step Image"
          width={500}
          height={600}
          className="w-full max-w-[80%] rounded-lg"
        />
        {stepsData[step].reference}
      </div>
      <div className="flex flex-col col-span-4 col-start-6 gap-3 pl-3 text-lg text-white">
        <h3 className="mt-6 text-4xl font-black font-gotham">How It's Made</h3>
        <div className="flex items-center gap-2 mt-8 mb-5">
          {stepsData.map((_, index) => (
            <div
              key={`step-${index}`}
              className={
                "w-8 h-2 rounded-full " +
                (index <= step ? "bg-white" : "bg-white/10")
              }
            ></div>
          ))}
        </div>
        {stepsData[step].text}
        <div className="flex items-center gap-4 mt-6">
          {step > 0 && (
            <TertiaryButton onClick={handleGoBack}>
              <ChevronLeftIcon className="w-5 h-5 p-0 ml-[-5px] text-white" />
              Back
            </TertiaryButton>
          )}
          {step < stepsData.length - 1 && (
            <SecondaryButton onClick={handleGoNext}>
              Next
              <ChevronRightIcon className="w-5 h-5 p-0 mr-[-5px] text-darkest-gray" />
            </SecondaryButton>
          )}
        </div>
      </div>
      <div className="w-full pointer-events-none h-full absolute top-0 left-0 z-[-2] bg-gradient-to-br from-purple/30 to-darkest-gray/30" />
    </section>
  );
}

export default HowItsMade;

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
        <p className="text-sm xl:text-md">
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
        <p className="max-w-lg text-center xl:text-left">
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
        <p className="text-sm xl:text-md">
          Left and right eye extracted using Dlib and OpenCV (Our dataset)
        </p>
      ),
      text: (
        <p className="max-w-lg text-center xl:text-left">
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
      reference: (
        <p className="text-sm xl:text-md">
          Simplified representation of our custom model
        </p>
      ),
      text: (
        <p className="max-w-lg text-center xl:text-left">
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
    <section className="relative flex flex-col w-full col-span-12 pt-10 pb-24 xl:grid xl:pt-16 xl:grid-cols-subgrid">
      <div
        id="how-its-made"
        className="absolute top-0 mt-[-100px] w-full h-6"
      />
      <div className="flex flex-col items-center gap-3 text-center xl:col-span-4 2xl:col-span-3 xl:col-start-2 2xl:col-start-3 text-white/70 font-avenir">
        <Image
          src={stepsData[step].imagePath}
          alt="Step Image"
          width={500}
          height={600}
          className="w-full max-w-[220px] xl:max-w-[80%] rounded-lg"
        />
        {stepsData[step].reference}
      </div>
      <div className="flex flex-col items-center gap-3 pl-3 text-white text-md xl:text-lg xl:items-start xl:col-span-5 xl:col-start-6 2xl:col-span-4 2xl:col-start-6">
        <h3 className="mt-6 text-3xl font-black xl:text-4xl font-gotham">
          How It's Made
        </h3>
        <div className="flex items-center gap-2 mt-3 mb-2 xl:mt-8 xl:mb-5">
          {stepsData.map((_, index) => (
            <div
              key={`step-${index}`}
              className={
                "w-6 xl:w-8 h-[6px] xl:h-2 rounded-full transition-colors duration-300 ease-in-out " +
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

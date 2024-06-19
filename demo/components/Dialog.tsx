"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { useState } from "react";
import { useDialog } from "../utils/DialogContext";

import Image from "next/image";
import SecondaryButton from "./SecondaryButton";
import TertiaryButton from "./TertiaryButton";

function TutorialDialog() {
  const { isDialogOpen, closeDialog } = useDialog();
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleClose = () => {
    closeDialog();
    setStep(0);
  };

  const steps = [
    <>
      <p className="my-4 text-center text-white/70 text-md xl:text-lg font-avenir">
        Eyris is designed to be used on desktop and laptop devices and requires
        a webcam and access to it for proper functionality. This application is
        a demo, and the model is still under development and improvement. For
        optimal performance, please use Eyris in a well-lit environment while
        seated at a desk.
      </p>
    </>,
    <>
      <p className="mt-2 text-center text-white/70 text-md xl:text-lg font-avenir">
        To activate the eye-gaze control, just look at the screen and close your
        eyes, until you hear the "activated" voice. When you want to deactivate
        it, just close them again until you hear the "deactivated" voice.
        <br />
        <br />
        <b>You can give it a try even right now!</b>
      </p>
      <Image
        src="/blink.gif"
        className="my-4"
        alt="Eyes Blinking"
        width={300}
        height={300}
        unoptimized
      />
    </>,
    <>
      <p className="mt-2 text-center text-white/70 text-md xl:text-lg font-avenir">
        Watch left for a while to skip to the previous song
      </p>
      <Image
        src="/left.gif"
        className="my-4"
        alt="Eyes Watching Left"
        width={300}
        height={300}
        unoptimized
      />
    </>,
    <>
      <p className="mt-2 text-center text-white/70 text-md xl:text-lg font-avenir">
        Watch right for a while to skip to the next song
      </p>
      <Image
        src="/right.gif"
        className="my-4"
        alt="Eyes Watching Right"
        width={300}
        height={300}
        unoptimized
      />
    </>,
    <>
      <p className="mt-2 text-center text-white/70 text-md xl:text-lg font-avenir">
        Look up for a while to pause or resume current song playback
      </p>
      <Image
        src="/up.gif"
        className="my-4"
        alt="Eyes Watching Up"
        width={300}
        height={300}
        unoptimized
      />
    </>,
  ];

  return (
    <Transition appear show={isDialogOpen}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="flex flex-col items-center justify-center w-full max-w-md p-8 pt-10 pb-4 border rounded-xl border-white/30 bg-white/5 backdrop-blur-2xl">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-semibold text-center text-white font-gotham"
                >
                  {step > 0 ? "How Does It Work?" : "Disclaimer"}
                </DialogTitle>
                {steps[step]}
                <div className="flex items-center justify-between w-full pt-4 mt-4 border-t border-white/30">
                  <TertiaryButton
                    onClick={step > 0 ? handlePrevStep : handleClose}
                  >
                    {step > 0 ? "Back" : "Skip"}
                  </TertiaryButton>
                  <SecondaryButton
                    onClick={
                      step < steps.length - 1 ? handleNextStep : handleClose
                    }
                  >
                    {step < steps.length - 1 ? "Next" : "Let's Go!"}
                  </SecondaryButton>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default TutorialDialog;

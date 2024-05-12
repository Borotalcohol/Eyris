"use client";

import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { useDialog } from "@/utils/DialogContext";
import SecondaryButton from "../Button/Secondary";

function HeroDialog() {
  const { isDialogOpen, closeDialog } = useDialog();

  return (
    <Transition appear show={isDialogOpen}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeDialog}
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
              <DialogPanel className="w-full max-w-md p-8 py-10 border rounded-xl border-white/30 bg-white/5 backdrop-blur-2xl">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-semibold text-center text-white font-gotham"
                >
                  Hold On!
                </DialogTitle>
                <p className="mt-2 text-center text-white/70 text-md xl:text-lg font-avenir">
                  The demo is still under construction. We&apos;re currently
                  working in making the eye direction classifier model more
                  accurate on different people, devices and lightning
                  conditions. Stay tuned for updates!
                </p>
                <div className="flex items-center justify-center mt-4">
                  <SecondaryButton onClick={closeDialog}>
                    Got it, thanks!
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

export default HeroDialog;

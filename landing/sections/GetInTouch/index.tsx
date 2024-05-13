"use client";

import SecondaryButton from "@/components/Button/Secondary";
import TextfieldBlock from "@/components/Input/TextfieldBlock";

import toast, { Toaster } from "react-hot-toast";

import { sendContactEmail } from "@/app/actions";
import { useReCaptcha } from "next-recaptcha-v3";
import { useCallback, useState } from "react";

function GetInTouch() {
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useReCaptcha();

  const notifySuccess = (message: string) =>
    toast.success(message, { duration: 5000, position: "bottom-center" });
  const notifyError = () =>
    toast.error(
      "An error occurred while sending the email. Please try again.",
      { duration: 5000, position: "bottom-center" }
    );

  const handleFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);

      const form = event.currentTarget;
      const formData = new FormData(form);
      const token = await executeRecaptcha("form_submit");

      const res = await sendContactEmail(formData, token);

      if (res.success) {
        notifySuccess(res.message);
        form.reset();
      } else {
        notifyError();
      }

      setLoading(false);
    },
    [executeRecaptcha]
  );

  return (
    <section className="relative flex flex-col items-center justify-center w-full col-span-12 px-6 pt-10 pb-24 text-center text-white xl:pt-16">
      <Toaster />
      <div
        id="get-in-touch"
        className="absolute top-0 mt-[-100px] w-full h-6"
      />
      <h2 className="text-3xl font-black xl:text-4xl font-gotham">
        Get In Touch
      </h2>
      <hr className="w-full h-px max-w-lg my-6 border-none bg-white/20" />
      <p className="max-w-5xl text-md xl:text-lg font-avenir">
        You have an idea? you want to give us a feedback or you're interested in
        knowing something more about the project? Feel free to fill in the form
        down below and we'll answer as soon as possible!
      </p>
      <form
        className="flex flex-col w-full max-w-md gap-6 mt-16"
        onSubmit={handleFormSubmit}
      >
        <TextfieldBlock
          id="full_name"
          name="full_name"
          label="Full Name"
          minLength={3}
          maxLength={50}
          placeholder="Insert here your fullname..."
          required={true}
        />

        <TextfieldBlock
          id="email_address"
          name="email_address"
          inputType="email"
          minLength={3}
          maxLength={50}
          label="Email"
          placeholder="Insert here your email address..."
          required={true}
        />

        <TextfieldBlock
          id="title"
          name="title"
          minLength={3}
          maxLength={256}
          label="Title"
          placeholder="Insert here the title of your message..."
          required={true}
        />

        <TextfieldBlock
          id="message"
          name="message"
          minLength={3}
          maxLength={512}
          label="Message"
          type="textarea"
          placeholder="Insert here your message..."
          required={true}
        />

        <SecondaryButton
          className="mt-5"
          hasHoverEffect={false}
          loading={loading}
          type="submit"
        >
          Send
        </SecondaryButton>
      </form>
    </section>
  );
}

export default GetInTouch;

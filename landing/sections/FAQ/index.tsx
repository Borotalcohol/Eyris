"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

function FAQ() {
  const faqData = [
    {
      question:
        "This webapp is opening my webcam, how can I be sure you aren't spying me??",
      answer: (
        <p>
          We understand your concern about privacy, and we want to assure you
          that <b>your security is our top priority</b>. Our web application
          utilizes eye tracking technology to enhance your experience in
          controlling Spotify song reproduction. Importantly,{" "}
          <b>the entire process occurs on your device</b> - nothing is
          transmitted or stored on our servers.
          <br />
          <br />
          The{" "}
          <b>
            eye tracking model operates entirely through JavaScript on the
            client side
          </b>
          , meaning <b>it runs directly within your browser</b>. This ensures
          that no data, images, or information from your webcam is sent or
          accessible by external entities. Your privacy is of utmost importance
          to us, and we have implemented robust measures to guarantee the
          security of your personal information.
          <br />
          <br />
          If you have any further questions or would like additional information
          on our privacy practices, please feel free to{" "}
          <Link href="#get-in-touch" className="underline">
            reach out
          </Link>
          . We are committed to providing a safe and enjoyable user experience
          for all our users.
        </p>
      ),
    },
    {
      question: "Will you collect any kind of data from me?",
      answer: (
        <p>
          We do not collect any personal data from our users. Your privacy and
          data security are our utmost priorities.
        </p>
      ),
    },
    {
      question: "Why do I need to have a Premium Spotify account?",
      answer: (
        <p>
          In order to create a custom Spotify player, we utilize{" "}
          <b>Spotify's Web Playback SDK</b>, which requires a Premium Spotify
          account to be used. For more information, refer to the{" "}
          <Link
            href="https://developer.spotify.com/documentation/web-playback-sdk"
            className="underline"
            target="_blank"
          >
            original documentation
          </Link>
          .
        </p>
      ),
    },
    {
      question: "Will you earn some money in any way with this project?",
      answer: (
        <p>
          No, this project is completely free to use and is not monetized in any
          way. However, if you find our project helpful and would like to
          support its ongoing development and maintenance, you can consider{" "}
          <Link href="#footer" className="underline">
            making a donation
          </Link>
          . Your support is greatly appreciated!
        </p>
      ),
    },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center w-full col-span-12 px-6 pt-10 pb-24 text-center text-white xl:pt-16">
      <div id="faq" className="absolute top-0 mt-[-100px] w-full h-6" />
      <h2 className="text-3xl font-black xl:text-4xl font-gotham">
        Frequently Asked Questions (FAQ)
      </h2>
      <hr className="w-full h-px max-w-lg my-6 border-none bg-white/20" />
      <div className="w-full max-w-5xl mt-5 text-white xl:mt-10 font-avenir">
        {faqData.map((item, index) => {
          return (
            <Disclosure key={`faq-${index}`} defaultOpen={index === 0}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex flex-col w-full text-left">
                    <div className="flex items-center justify-between w-full py-3">
                      <h3 className="flex-1 text-lg font-medium text-left text-wrap xl:text-xl">
                        {item.question}
                      </h3>
                      <ChevronDownIcon
                        className={`${
                          open ? "rotate-180 ml-2 transform duration-300" : ""
                        } w-6 h-6 xl:w-8 xl:h-8`}
                      />
                    </div>
                    <hr className="w-full h-px border-none bg-white/20" />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="py-8 text-left text-md xl:text-lg">
                      {item.answer}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;

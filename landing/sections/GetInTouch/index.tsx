import SecondaryButton from "@/components/Button/Secondary";
import TextfieldBlock from "@/components/Input/TextfieldBlock";

function GetInTouch() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full col-span-12 px-6 pt-10 pb-24 text-center text-white xl:pt-16">
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
      <form className="flex flex-col w-full max-w-md gap-6 mt-16">
        <TextfieldBlock
          id="fullName"
          name="fullName"
          label="Full Name"
          placeholder="Insert here your fullname..."
        />

        <TextfieldBlock
          id="emailAddress"
          name="emailAddress"
          label="Email"
          placeholder="Insert here your email address..."
        />

        <TextfieldBlock
          id="title"
          name="title"
          label="Title"
          placeholder="Insert here the title of your message..."
        />

        <TextfieldBlock
          id="message"
          name="message"
          label="Message"
          type="textarea"
          placeholder="Insert here your message..."
        />

        <SecondaryButton className="mt-5" hasHoverEffect={false}>
          Send
        </SecondaryButton>
      </form>
    </section>
  );
}

export default GetInTouch;

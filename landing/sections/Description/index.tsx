import Link from "next/link";

function Description() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full col-span-12 px-6 pt-10 pb-24 text-center text-white xl:pt-16 bg-gray">
      <div id="description" className="absolute top-0 mt-[-100px] w-full h-6" />
      <h2 className="text-3xl font-black xl:text-4xl font-gotham">
        What is Eyris?
      </h2>
      <hr className="w-full h-px max-w-lg my-6 border-none bg-white/20" />
      <p className="max-w-5xl text-md xl:text-lg font-avenir">
        <b>Eyris</b> is an academic project realized by{" "}
        <b>Christian Loschiavo</b> and <b>Alessandro Ruben Jarach</b>.<br />
        <br />
        The project was issued for final examination of a course named{" "}
        <b>“Intelligent Consumers Technologies”</b>: the starting point was the
        so called <b>e-tran alphabet</b> that makes it possible to communicate
        with people with motion and speech impairments (refer to{" "}
        <Link
          className="font-bold underline"
          href="https://www.youtube.com/watch?v=lfLuqGAxaz4"
          target="_blank"
        >
          this video
        </Link>{" "}
        to learn how this method works).
        <br />
        <br /> Technology and AI can help us give back to such people some
        independence, by{" "}
        <b>
          removing the need for a person and a physical board to communicate and
          interact with digital devices
        </b>
        , for any task.
        <br />
        <br />
        Our specific task however was to permit them to{" "}
        <b>reproduce and control the playback of Spotify's songs</b> with ease,
        by <b>leveraging eye tracking</b>.
      </p>
    </section>
  );
}

export default Description;

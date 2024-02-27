import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import WebcamComponent from "../components/Webcam";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>SpotifEye Demo</title>
        <meta
          name="description"
          content="A webapp to control Spotify songs reproduction using your eye-gaze"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex items-center justify-center gap-3 mt-5 mb-8">
          <Image
            src="/logo128.png"
            alt="SpotifEye Logo"
            width={50}
            height={50}
            priority={false}
          />
          <h1 className="text-5xl font-bold text-white">SpotifEye</h1>
        </div>

        <WebcamComponent />
        <div id="eyesContainer" className="flex items-center justify-center" />
        <div
          id="predictionLabel"
          className="flex items-center justify-center text-center"
        />
      </main>
    </div>
  );
};

export default Home;

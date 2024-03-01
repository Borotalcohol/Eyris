import Head from "next/head";
import Script from "next/script";
import Image from "next/image";

import PlaybackComponent from "../components/Playback";

import { UserButton } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    // Try to get the Access Token corresponding to the currently logged in user
  }, []);

  return (
    <div>
      <Head>
        <title>SpotifEye Demo</title>
        <meta
          name="description"
          content="A webapp to control Spotify songs reproduction using your eye-gaze"
        />
        <link rel="icon" href="/favicon.ico" />
        <Script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js"
          crossOrigin="anonymous"
        />
      </Head>

      <main className="flex flex-col items-center justify-center w-full">
        <header className="flex items-center justify-between w-full px-4 py-4">
          <div className="invisible">
            <UserButton />
          </div>
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/logo128.png"
              alt="SpotifEye Logo"
              width={40}
              height={40}
              priority={false}
            />
            <h1 className="m-0 text-3xl font-bold text-white">SpotifEye</h1>
          </div>
          <UserButton />
        </header>
        <hr className="w-full my-4 border border-1 border-white/10" />
        <PlaybackComponent />
      </main>
    </div>
  );
};

export default Home;

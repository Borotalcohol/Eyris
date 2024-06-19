import Head from "next/head";
import Image from "next/image";

import PredictionWindow from "../utils/predictionWindow";
import PlaybackComponent from "../components/Playback";
import WebcamComponent from "../components/Webcam";

import type { NextPage } from "next";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { Metadata } from "next";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useDialog } from "../utils/DialogContext";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import useSWR from "swr";

export const metadata: Metadata = {
  title: "Demo Eyris: Control Spotify Song Reproduction using your Eyes!",
  description:
    "Unlock the power of your gaze with Eyris! Seamlessly control your Spotify playlist using just your eyes. Explore hands-free music control like never before. Get started today and elevate your Spotify journey with Eyris!",
  keywords:
    "Spotify, Eye Tracking, Song, Music, Artificial Intelligence, AI, Next.js",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
    },
  },
  openGraph: {
    title: "Eyris: Control Spotify Song Reproduction using your Eyes!",
    description:
      "Unlock the power of your gaze with Eyris! Seamlessly control your Spotify playlist using just your eyes. Explore hands-free music control like never before. Get started today and elevate your Spotify journey with Eyris!",
    type: "website",
    locale: "en_US",
    siteName: "Eyris",
    images: ["/opengraph-image.png"],
  },
};

const Home: NextPage = () => {
  const useClerkSWR = (url: string) => {
    const { getToken } = useAuth();

    const fetcher = async (...args: [RequestInfo]) => {
      return fetch(...args, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      }).then((res) => res.json());
    };

    return useSWR(url, fetcher);
  };

  const { data, error, isLoading } = useClerkSWR("/api/getSpotifyAccessToken");
  const { isSignedIn, user, isLoaded } = useUser();
  const [accessToken, setAccessToken] = useState(null);
  const [direction, setDirection] = useState<string | null>(null);
  const { openDialog } = useDialog();

  const predictionWindow = new PredictionWindow(10);

  useEffect(() => {
    if (!isLoading && !error) {
      setAccessToken(data.accessToken);
    } else if (error) {
      console.error(error);
      setAccessToken(null);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      // Check that difference between last sign in (if not null) and now is smaller than 1 day
      const lastSignIn = user?.lastSignInAt;
      const now = new Date();
      const thirtyMinutes = 30 * 60 * 1000;

      if (!lastSignIn || now.getTime() - lastSignIn.getTime() < thirtyMinutes) {
        openDialog();
      }
    }
  }, [isSignedIn, isLoaded]);

  const handleNewPrediction = (predictedDirection: string) => {
    predictionWindow.append(predictedDirection);

    if (predictionWindow.predictions.length === predictionWindow.size) {
      const mostFrequentDir: string | null =
        predictionWindow.getMostFrequentDirection();

      if (mostFrequentDir && !["down", "center"].includes(mostFrequentDir)) {
        setDirection(mostFrequentDir);
        predictionWindow.clear();
      }
    }
  };

  return (
    <div className="h-full">
      <Head>
        <title>Eyris Demo</title>
        <meta
          name="description"
          content="A webapp to control Spotify songs reproduction using your eye-gaze"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center w-full h-full">
        <header className="flex items-center justify-between w-full px-4 py-4">
          <div className="flex justify-start flex-1 mr-auto text-white">
            <button
              onClick={openDialog}
              className="flex items-center gap-2 px-3 py-2 transition-colors duration-300 rounded-xl text-md xl:text-lg font-avenir hover:bg-black/20"
            >
              <InformationCircleIcon className="w-8 h-8 text-white" />
              <p>Tutorial</p>
            </button>
          </div>
          <Link
            href="https://eyris.christianloschiavo.com"
            className="flex items-center ml-[-15px] justify-center flex-1 gap-2"
          >
            <Image
              src="/logo128.png"
              className="!mb-2"
              alt="Eyris Logo"
              width={40}
              height={40}
              priority={false}
            />
            <h1 className="m-0 text-3xl font-bold text-white">Eyris</h1>
          </Link>
          <div className="flex justify-end flex-1 w-8 h-8 ml-auto">
            <UserButton />
          </div>
        </header>
        <hr className="w-full h-px border-none bg-white/30" />
        {accessToken && (
          <WebcamComponent onPrediction={handleNewPrediction}>
            <PlaybackComponent
              token={accessToken}
              predictedDirection={direction}
              resetPredictedDirection={() => setDirection(null)}
            />
          </WebcamComponent>
        )}
      </main>
    </div>
  );
};

export default Home;

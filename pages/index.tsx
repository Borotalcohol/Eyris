import Head from "next/head";
import Script from "next/script";
import Image from "next/image";

import PredictionWindow from "../utils/predictionWindow";
import PlaybackComponent from "../components/Playback";

import { UserButton } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";
import WebcamComponent from "../components/Webcam";

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
  const [accessToken, setAccessToken] = useState(null);
  const [direction, setDirection] = useState<string | null>(null);

  const predictionWindow = new PredictionWindow(10);

  useEffect(() => {
    if (!isLoading && !error) {
      setAccessToken(data.accessToken);
    } else if (error) {
      console.error(error);
      setAccessToken(null);
    }
  }, [isLoading]);

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

      <main className="flex flex-col items-center w-full h-full">
        <header className="flex items-center justify-between w-full px-4 py-4">
          <div className="invisible w-8 h-8">
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
          <div className="w-8 h-8">
            <UserButton />
          </div>
        </header>
        <hr className="w-full my-4 border border-1 border-white/10" />
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

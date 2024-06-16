import React, { VFC, useState, useEffect } from "react";
import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

type Props = {
  token: string;
  predictedDirection: string | null;
  resetPredictedDirection: Function;
};

type ReproductionProgress = {
  progress_ms: number;
  duration_ms: number;
};

const PlaybackComponent: VFC<Props> = ({
  token,
  predictedDirection,
  resetPredictedDirection,
}) => {
  const [isPaused, setPaused] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [currentTrack, setTrack] = useState<Spotify.Track | null>(null);
  const [reproductionProgress, setReproductionProgress] =
    useState<ReproductionProgress | null>(null);

  useEffect(() => {
    if (typeof window.onSpotifyWebPlaybackSDKReady !== "function") {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const _player = new Spotify.Player({
          name: "SpotifEye Playback",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });

        _player.connect().then((success) => {
          if (success) {
            console.log("Connected to Spotify player");
          } else {
            console.error("Failed to connect to Spotify player");
          }
        });

        setPlayer(_player);
      };
    }
  }, [token]);

  useEffect(() => {
    if (player) {
      player.addListener("ready", ({ device_id }) => {
        // console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        // console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setReproductionProgress({
          progress_ms: state.position,
          duration_ms: state.duration,
        });
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          if (!state) {
            setActive(false);
          } else {
            setActive(true);
          }
        });
      });

      player.connect().then((success) => {
        if (success) {
          console.log("Connected to Spotify player");
        } else {
          console.error("Failed to connect to Spotify player");
        }
      });
    }
  }, [player]);

  useEffect(() => {
    let interval: any = null;

    if (reproductionProgress && !isPaused && !interval) {
      interval = setInterval(() => {
        if (
          reproductionProgress.progress_ms <
          reproductionProgress.duration_ms - 1000
        ) {
          setReproductionProgress(function (prevState): ReproductionProgress {
            return {
              ...prevState!,
              progress_ms: prevState!.progress_ms + 1000,
            };
          });
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentTrack, isPaused]);

  useEffect(() => {
    if (!predictedDirection || !player || !isActive) return;

    console.log("About to execute action: ", predictedDirection);

    switch (predictedDirection) {
      case "left":
        handleSkipToPreviousSong();
        break;

      case "right":
        handleSkipToNextSong();
        break;

      case "up":
        handlePauseResumePlayback();
        break;
    }

    resetPredictedDirection();
  }, [predictedDirection]);

  const getMinuteString = (time_ms: number) => {
    const s = time_ms / 1000;
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");

    return `${mm}:${ss}`;
  };

  const handleSkipToPreviousSong = async () => {
    await player!.previousTrack();
  };

  const handleSkipToNextSong = async () => {
    await player!.nextTrack();
  };

  const handlePauseResumePlayback = async () => {
    await player!.togglePlay();
  };

  if (!player || !isActive) {
    return (
      <>
        <div className="flex flex-col items-center justify-center w-full gap-4 text-center text-white">
          <h2 className="py-4 m-0 text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl">
            Let's Get You Started!
          </h2>
          <ol className="flex flex-col items-center justify-center gap-6 list-decimal">
            <li>
              <p className="text-sm text-white md:text-md lg:text-lg">
                Open Spotify's website by clicking this link:{" "}
                <Link
                  href="https://spotify.com"
                  target="_blank"
                  className="!underline !font-bold text-[#1ED760]"
                >
                  https://spotify.com
                </Link>{" "}
                (log in if prompted)
              </p>
            </li>
            <li>
              <p className="text-sm text-white md:text-md lg:text-lg">
                In the bottom right corner of the window, click on the{" "}
                <b>“Connect to a Device”</b> button
              </p>
            </li>
            <Image
              src="/tutorial1.png"
              alt="Connect to a Device Icon"
              className="mt-4 rounded-md"
              width={300}
              height={200}
            />
            <li>
              <p className="text-sm text-white md:text-md lg:text-lg">
                Select the device named <b>“SpotifEye Playback”</b> and then
                return to this tab
              </p>
            </li>
            <Image
              src="/tutorial2.png"
              alt="SpotifEye Playback Device"
              className="mt-4 rounded-md"
              width={240}
              height={200}
            />
          </ol>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center justify-center w-full gap-3 mt-6">
          <div className="h-full">
            <button
              className="h-full p-4 text-white bg-[#2D2D2D] border border-white/30 w-[60px] md:w-[80px] lg:w-[100px] xl:w-[120px] rounded-lg flex items-center justify-center"
              onClick={() => {
                handleSkipToPreviousSong();
              }}
            >
              <BackwardIcon className="w-8 h-8 text-white lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
            </button>
          </div>
          <div className="w-full max-w-[800px]">
            <button
              className="h-[60px] md:h-[80px] lg:h-[100px] xl:h-[120px] p-4 text-white bg-[#2D2D2D] border border-white/30 w-full rounded-lg flex items-center justify-center"
              onClick={() => {
                handlePauseResumePlayback();
              }}
            >
              {isPaused ? (
                <PlayIcon className="w-8 h-8 text-white lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
              ) : (
                <PauseIcon className="w-8 h-8 text-white lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
              )}
            </button>
            <div className="flex items-start gap-3 mt-4 text-white md:gap-5 lg:gap-7 xl:gap-8">
              {currentTrack && currentTrack.album.images[0].url ? (
                <img
                  src={currentTrack.album.images[0].url}
                  className="border rounded-lg border-white/30 w-[140px] md:w-[180px] lg:w-[240px] xl:w-[320px]"
                  alt=""
                />
              ) : null}

              <div className="flex flex-col w-full gap-3 mt-5">
                <h2 className="m-0 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
                  {currentTrack?.name}
                </h2>
                <p className="mt-0 font-medium md:mt-1 xl:mt-3 text-md md:text-lg lg:text-xl xl:text-2xl">
                  {currentTrack?.artists.map((_) => _.name).join(", ")}
                </p>
                {reproductionProgress && (
                  <div className="flex items-center justify-start w-full gap-4 pr-2 mt-4">
                    <p className="text-sm text-white md:text-md lg:text-lg">
                      {getMinuteString(reproductionProgress.progress_ms)}
                    </p>
                    <progress
                      className="w-full h-3 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-[#4D4D4D] [&::-webkit-progress-value]:bg-white [&::-moz-progress-bar]:bg-white"
                      value={reproductionProgress.progress_ms}
                      max={reproductionProgress.duration_ms}
                    />
                    <p className="text-sm text-white md:text-md lg:text-lg">
                      {getMinuteString(reproductionProgress.duration_ms)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="h-full">
            <button
              className="h-full p-4 text-white bg-[#2D2D2D] border border-white/30 w-[60px] md:w-[80px] lg:w-[100px] xl:w-[120px] rounded-lg flex items-center justify-center"
              onClick={() => {
                handleSkipToNextSong();
              }}
            >
              <ForwardIcon className="w-8 h-8 text-white lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default PlaybackComponent;

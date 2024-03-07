import React, { VFC, useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";

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

  const handleSkipToPreviousSong = () => {
    player!.seek(0);
    player!.previousTrack();
  };

  const handleSkipToNextSong = () => {
    player!.nextTrack();
  };

  const handlePauseResumePlayback = () => {
    player!.togglePlay();
  };

  if (!player) {
    return (
      <>
        <div className="w-full">
          <div className="flex items-center justify-center text-center text-white">
            <p>Spotify Player is null</p>
          </div>
        </div>
      </>
    );
  } else if (!isActive) {
    return (
      <>
        <div className="w-full">
          <div className="flex items-center justify-center text-center text-white">
            <p>
              Instance not active. Transfer your playback using your Spotify app
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center justify-center w-full gap-3 mt-6">
          <div className="h-full">
            <button
              className="h-full p-4 text-white bg-[#2D2D2D] w-[120px] rounded-lg flex items-center justify-center"
              onClick={() => {
                handleSkipToPreviousSong();
              }}
            >
              <BackwardIcon className="w-12 h-12 text-white" />
            </button>
          </div>
          <div className="w-full max-w-[800px]">
            <button
              className="h-[120px] p-4 text-white bg-[#2D2D2D] w-full rounded-lg flex items-center justify-center"
              onClick={() => {
                handlePauseResumePlayback();
              }}
            >
              {isPaused ? (
                <PlayIcon className="w-12 h-12 text-white" />
              ) : (
                <PauseIcon className="w-12 h-12 text-white" />
              )}
            </button>
            <div className="flex items-center gap-8 mt-4 text-white">
              {currentTrack && currentTrack.album.images[0].url ? (
                <img
                  src={currentTrack.album.images[0].url}
                  className="rounded-lg"
                  alt=""
                />
              ) : null}

              <div className="flex flex-col w-full gap-3">
                <h2 className="text-5xl font-bold">{currentTrack?.name}</h2>
                <p className="mt-3 text-2xl font-medium">
                  {currentTrack?.artists.map((_) => _.name).join(", ")}
                </p>
                {reproductionProgress && (
                  <div className="flex items-center justify-start w-full gap-4 pr-2 mt-4">
                    <p>{getMinuteString(reproductionProgress.progress_ms)}</p>
                    <progress
                      className="w-full h-3 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-[#4D4D4D] [&::-webkit-progress-value]:bg-white [&::-moz-progress-bar]:bg-white"
                      value={reproductionProgress.progress_ms}
                      max={reproductionProgress.duration_ms}
                    />
                    <p>{getMinuteString(reproductionProgress.duration_ms)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="h-full">
            <button
              className="h-full p-4 text-white bg-[#2D2D2D] w-[120px] rounded-lg flex items-center justify-center"
              onClick={() => {
                handleSkipToNextSong();
              }}
            >
              <ForwardIcon className="w-12 h-12 text-white" />
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default PlaybackComponent;

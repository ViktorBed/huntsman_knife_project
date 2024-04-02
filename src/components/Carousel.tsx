import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { HLSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement[]>([]);
    const videoSpanRef = useRef<HTMLSpanElement[]>([]);
    const videoDivRef = useRef<HTMLDivElement[]>([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const [loadedData, setLoadedData] = useState<HTMLVideoElement[]>([]);
    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

    useGSAP(() => {
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
        });

        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                }));
            },
        });
    }, [isEnd, videoId]);

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId]) {
            // animation to move the indicator
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    // get the progress of the video
                    const progress = Math.ceil(anim.progress() * 100);

                    if (progress !== currentProgress) {
                        currentProgress = progress;

                        // set the width of the progress bar
                        gsap.to(videoDivRef.current[videoId], {
                            width:
                                window.innerWidth < 760
                                    ? "10vw" // mobile
                                    : window.innerWidth < 1200
                                        ? "10vw" // tablet
                                        : "4vw", // laptop
                        });

                        // set the background color of the progress bar
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: "white",
                        });
                    }
                },

                // when the video is ended, replace the progress bar with the indicator and change the background color
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: "12px",
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: "#afafaf",
                        });
                    }
                },
            });

            if (videoId === 0) {
                anim.restart();
            }

            // update the progress bar
            const animUpdate = () => {
                anim.progress(
                    videoRef.current[videoId].currentTime /
                    HLSlides[videoId].videoDuration
                );
            };

            if (isPlaying) {
                // ticker to update the progress bar
                gsap.ticker.add(animUpdate);
            } else {
                // remove the ticker when the video is paused (progress bar is stopped)
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay]);

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    // vd id is the id for every video until id becomes number 3
    const handleProcess = (type: string, i: number) => {
        switch (type) {
            case "video-end":
                setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
                break;

            case "video-last":
                setVideo((pre) => ({ ...pre, isLastVideo: true }));
                break;

            case "video-reset":
                setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
                break;

            case "pause":
                setVideo((pre) => ({ ...pre, isPlaying: false }));
                break;

            case "play":
                setVideo((pre) => ({ ...pre, isPlaying: true }));
                break;

            case "navigate":
                // End the previous video before navigating
                if (videoId !== i) {
                    const previousVideo = videoRef.current[videoId];
                    previousVideo.currentTime = previousVideo.duration;
                }
                setVideo((pre) => ({ ...pre, videoId: i }));
                break;

            default:
                return video;
        }
    };



    const handleLoadedMetaData = (i: number, e: React.SyntheticEvent<HTMLVideoElement, Event>) => setLoadedData((pre) => [...pre, e.currentTarget]);

    return (
        <>
            <div className="slider">
                {HLSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="scroll">
                                <video
                                    id="video"
                                    playsInline={true}
                                    className={`${list.id === 2 && "translate-x-44"} pointer-events-none`}
                                    preload="auto"
                                    muted
                                    ref={(el) => (videoRef.current[i] = el!)}
                                    onEnded={() =>
                                        i !== 3
                                            ? handleProcess("video-end", i)
                                            : handleProcess("video-last", i)
                                    }
                                    onPlay={() =>
                                        setVideo((pre) => ({ ...pre, isPlaying: true }))
                                    }
                                    onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>

                            <div className="relative">
                                {list.textLists.map((text, i) => (
                                    <p key={i} className="relative_text">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="slide_buttons">
                <div className="slide_circles">
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            ref={(el) => (videoDivRef.current[i] = el! as HTMLDivElement)}
                            onClick={() => handleProcess("navigate", i)}
                        >
                            <span
                                className="slide_circles_top"
                                ref={(el) => (videoSpanRef.current[i] = el!)}
                            />
                        </span>
                    ))}
                </div>

                <button className="control-btn">
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                        onClick={
                            isLastVideo
                                ? () => handleProcess("video-reset", 1)
                                : !isPlaying
                                    ? () => handleProcess("play", 2)
                                    : () => handleProcess("pause", 3)
                        }
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { HLSlides } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement[]>([]);
    const videoSpanRef = useRef<HTMLSpanElement[]>([]);
    const videoDivRef = useRef<HTMLDivElement[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isPlaying: false,
    });

    const [loadedData, setLoadedData] = useState<HTMLVideoElement[]>([]);
    const { isEnd, startPlay, videoId, isPlaying } = video;

    useGSAP(() => {
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 1.4,
            ease: "power2.inOut",
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

    const intervals = [4000, 4500, 3000, 4000];
    const autoPlay = () => {
        if (videoId < HLSlides.length - 1) {
            handleProcess("navigate", videoId + 1);
        }
    };

    useEffect(() => {
        if (startPlay) {
            intervalRef.current = setInterval(autoPlay, intervals[videoId]);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startPlay, videoId]);

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId]) {
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);

                    if (progress !== currentProgress) {
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoId], {
                            width:
                                window.innerWidth < 760
                                    ? "10vw"
                                    : window.innerWidth < 1200
                                        ? "10vw"
                                        : "4vw",
                        });

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: "white",
                        });
                    }
                },
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

            const animUpdate = () => {
                anim.progress(
                    videoRef.current[videoId].currentTime /
                    HLSlides[videoId].videoDuration
                );
            };

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
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
    }, [startPlay, videoId, loadedData]);

    const handleProcess = (type: string, i: number) => {
        switch (type) {
            case "video-end":
                setVideo((pre) => ({ ...pre, isEnd: true }));
                break;
            case "pause":
                setVideo((pre) => ({ ...pre, isPlaying: false }));
                break;
            case "play":
                setVideo((pre) => ({ ...pre, isPlaying: true }));
                break;
            case "navigate":
                videoRef.current.forEach((video, index) => {
                    if (index !== i && video) {
                        video.currentTime = video.duration;
                    }
                });
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
            </div>
        </>
    );
};

export default VideoCarousel;
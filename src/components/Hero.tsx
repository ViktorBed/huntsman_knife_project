import gsap from 'gsap';

import {useEffect, useState} from "react";
import {bigVideo, smallVideo} from "../utils";
import {useGSAP} from "@gsap/react";

export function Hero() {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallVideo : bigVideo)
    const handleVideoSrcSet = () => {
        if (window.innerWidth < 760) {
            setVideoSrc(smallVideo)
        } else {
            setVideoSrc(bigVideo)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleVideoSrcSet);

        return () => {
            window.removeEventListener('resize', handleVideoSrcSet)
        }
    }, [])

    useGSAP(() => {
        gsap.to('#hero', {opacity: 1, delay: 2})
        gsap.to('#cta', {opacity: 1, y: 0, delay: 2})
    }, [])

    return (
        <>
            <div className="hero">
                <h1 id="hero">
                    Huntsman Knife
                </h1>
                <video className="first_video" loop autoPlay muted key={videoSrc}>
                    <source src={videoSrc} type="video/mp4"/>
                </video>
                <div id="cta">
                    <button>Buy</button>
                    <p className="font-normal text-xl">From $40 to $799 range</p>
                </div>
            </div>
        </>
    );
}

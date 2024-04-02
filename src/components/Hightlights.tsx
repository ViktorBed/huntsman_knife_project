import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import React from "react";
import Carousel from "./Carousel";
import {rightImg, watchImg} from "../utils";

export function Hightlights() {
    useGSAP(() => {
        gsap.to('#title', { opacity: 1, y: 0, duration: 1 })
        gsap.to('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25 })
    }, [])

    return (
        <section id="highlights">
            <div>
                <div>
                    <div className="cover">
                        <h1 id="title">Get the highlights.</h1>
                        <div className="slide">
                            <p className="link">
                                Watch the film
                                <img src={watchImg} alt="watch"/>
                            </p>
                            <p className="link">
                                Watch the event
                                <img src={rightImg} alt="right"/>
                            </p>
                        </div>
                    </div>
                </div>

                <Carousel />
            </div>
        </section>
    )
}

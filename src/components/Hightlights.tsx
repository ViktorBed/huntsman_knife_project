import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import React from "react";

import Carousel from "./Carousel";
import {rightImg, watchImg} from "../utils";

export function Hightlights() {
    useGSAP(() => {
        gsap.to('#title', {opacity: 1, y: 0, duration: 1})
        gsap.to('.link', {opacity: 1, y: 0, duration: 1, stagger: 0.25})
    }, [])

    return (
        <section id="highlights">
            <div>
                <div>
                    <div className="cover">
                        <h1 id="title">Get the highlights.</h1>
                        <div className="slide">
                            <a href="https://www.youtube.com/watch?v=n_-y4L-PGCA" className="link">
                                Watch the film
                                <img src={watchImg} alt="watch"/>
                            </a>
                            <a href="https://www.youtube.com/watch?v=dtbzrVRWxwA" className="link">
                                Watch the event
                                <img src={rightImg} alt="right"/>
                            </a>
                        </div>
                    </div>
                </div>
                <Carousel/>
            </div>
        </section>
    )
}

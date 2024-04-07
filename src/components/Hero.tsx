import gsap from 'gsap';
import {useGSAP} from "@gsap/react";

import {bigVideo} from "../utils";
import {ScrollProps} from "../constants";


export function Hero({ handleClick }: ScrollProps) {

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
                <video className="first_video" loop autoPlay muted key={bigVideo}>
                    <source src={bigVideo} type="video/mp4"/>
                </video>
                <div id="cta">
                    <button onClick={() => handleClick('heading')}>Buy</button>
                    <p>From $40 to $799 range</p>
                </div>
            </div>
        </>
    );
}

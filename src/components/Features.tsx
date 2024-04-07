import {useGSAP} from '@gsap/react'
import React, {useRef} from 'react'
import gsap from 'gsap';

import {animateWithGsap} from '../utils/animations';
import {explore1Img, explore2Img, exploreVideo} from "../utils";

export function Features() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useGSAP(() => {
        gsap.to('#exploreVideo', {
            scrollTrigger: {
                trigger: '#exploreVideo',
                toggleActions: 'play pause reverse restart',
                start: '-10% bottom',
            },
            onComplete: () => {
                if (videoRef.current) {
                    videoRef.current.play();
                }
            }
        })

        animateWithGsap('#features_title', {y: 0, opacity: 1}, {});
        animateWithGsap(
            '.g_grow',
            {scale: 1.5, opacity: 1, ease: 'power1'},
            {scrub: 5.5}
        );
        animateWithGsap(
            '.g_text',
            {y: 0, opacity: 1, ease: 'power2.inOut', duration: 1},
            {}
        )
    }, []);

    return (
        <section className="features">
            <div>
                <div>
                    <h1 id="features_title">Explore the full story.</h1>
                </div>

                <div className="features_block">
                    <div className="features_title">
                        <h2>Huntsman Knife.</h2>
                        <h2>Steel Forged Weapon.</h2>
                    </div>
                    <div className="features_container">
                        <div className="features_container_div">
                            <video playsInline id="exploreVideo" preload="none" muted autoPlay ref={videoRef}>
                                <source src={exploreVideo} type="video/mp4"/>
                            </video>
                        </div>
                        <div className="feature_img">
                            <div>
                                <div>
                                    <img src={explore1Img} className="g_grow" alt="Knife"/>
                                </div>
                                <div>
                                    <img src={explore2Img} className="g_grow" alt="Knife 2"/>
                                </div>
                            </div>
                            <div className="feature_text">
                                <div>
                                    <p className="g_text">
                                        Its compact yet robust build makes
                                        it a reliable companion for adventurers seeking a tool that can withstand the
                                        rigors of the wilderness.
                                    </p>
                                </div>

                                <div>
                                    <p className="g_text">
                                        Its sleek profile and rugged construction reflect a dedication to
                                        quality, making it a prized possession for those who appreciate both form and
                                        function in their gear.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

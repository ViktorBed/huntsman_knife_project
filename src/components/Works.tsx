import React, {useRef, useEffect} from 'react';
import {chipImg, frameImg, frameVideo} from '../utils';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {animateWithGsap} from '../utils/animations';

export function Works() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useGSAP(() => {
        gsap.from('#chip', {
            scrollTrigger: {
                trigger: '#chip',
                start: '20% bottom'
            },
            opacity: 0,
            scale: 2,
            duration: 2,
            ease: 'power2.inOut'
        });

        animateWithGsap('.g_fadeIn', {opacity: 1, y: 0}, {duration: 1, ease: 'power2.inOut'});

    }, []);


    return (
        <section className="works">
            <div>
                <div id="chip">
                    <img src={chipImg} alt="chip" width={180} height={180}/>
                </div>

                <div className="works_text">
                    <h2>
                        Stainless steel
                        <br/> is a versatile and durable material.
                    </h2>
                    <p>
                        It's an alloy composed primarily of iron
                    </p>
                </div>

                <div className="footer_container">
                    <div>
                        <div className="footer_img">
                            <img
                                src={frameImg}
                                alt="frame"
                            />
                        </div>
                        <div className="footer_video">
                            <video playsInline preload="none" muted loop autoPlay ref={videoRef}>
                                <source src={frameVideo} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <p>
                        KNIFY - Huntsman - Damascus
                    </p>
                </div>

                <div className="footer_inf">
                    <div>
                        <p className="g_fadeIn">
                            What sets the Huntsman knife apart is its ergonomic handle,&nbsp;
                            <span>often crafted from durable materials like wood, bone,&nbsp;</span>
                        </p>
                        <p className="g_fadeIn">
                            <span>
                                 or synthetic composites, providing a comfortable grip&nbsp;
                            </span>
                            and allowing for precise control during use
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};


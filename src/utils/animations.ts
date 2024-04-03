import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

interface AnimationProps {
    [key: string]: any;
}

interface ScrollProps {
    trigger?: string | Element | null | RefObject<Element>;
    toggleActions?: string;
    start?: string;
    [key: string]: any;
}

export const animateWithGsap = (target: any, animationProps: AnimationProps, scrollProps: ScrollProps) => {
    gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
            trigger: target,
            toggleActions: 'restart reverse restart reverse',
            start: 'top 85%',
            ...scrollProps,
        }
    });
};

export const animateWithGsapTimeline = (timeline: gsap.core.Timeline, rotationRef: RefObject<any>, rotationState: number, firstTarget: string, secondTarget: string, animationProps: AnimationProps) => {
    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: 'power2.inOut'
    });

    timeline.to(
        firstTarget,
        {
            ...animationProps,
            ease: 'power2.inOut'
        },
        '<'
    );

    timeline.to(
        secondTarget,
        {
            ...animationProps,
            ease: 'power2.inOut'
        },
        '<'
    );
};

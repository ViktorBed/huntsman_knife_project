import {
    blackImg,
    blueImg,
    whiteImg,
    yellowImg,
} from "../utils";

import {HLFirst, HLForth, HLSecond, HLThird} from "../utils";

export const HLSlides = [
    {
        id: 1,
        textLists: [
            "Huntsman Knife.",
            "Versatile blade design.",
            "Precision cutting power.",
        ],
        video: HLFirst,
        videoDuration: 4,
    },
    {
        id: 2,
        textLists: ["Huntsman Knife: Titanium - Strong, Light, Pro."],
        video: HLSecond,
        videoDuration: 4.5,
    },
    {
        id: 3,
        textLists: [
            "Crafted for the ultimate outdoorsman.",
            "Unparalleled durability and precision.",
            "Far beyond the ordinary.",
        ],
        video: HLThird,
        videoDuration: 3,
    },
    {
        id: 4,
        textLists: ["Enhanced Action Grip. How will you unleash its potential?."],
        video: HLForth,
        videoDuration: 4,
    },
];

export const models = [
    {
        id: 1,
        title: "Huntsman Knife White Steel",
        color: ["#888787"],
        img: yellowImg,
    },
    {
        id: 2,
        title: "Huntsman Knife Blue Steel",
        color: ["#183983"],
        img: blueImg,
    },
    {
        id: 3,
        title: "Huntsman Knife Light Steel",
        color: ["#ffffff"],
        img: whiteImg,
    },
    {
        id: 4,
        title: "Huntsman Knife Stainless Steel",
        color: ["#181819"],
        img: blackImg,
    },
];
export const sizes = [
    {label: '11', value: "small"},
    {label: '15', value: "large"},
];

export const footerLinks = [
    "Privacy Policy",
    "Terms of Use",
    "Sales Policy",
    "Legal",
    "Site Map",
];

export interface ScrollProps {
    handleClick: (component: any) => void;
}
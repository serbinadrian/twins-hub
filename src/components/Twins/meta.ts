import { TwinData } from "../TwinsContext";

const BenImage = require("../../assets/images/Ben.jpg");
const DickImage = require("../../assets/images/Dick.jpeg");
const HillImage = require("../../assets/images/Hill.jpg");
const PhilosopherImage = require("../../assets/images/Philosopher.jpg");

export const twinsList: TwinData[] = [
    {
        id: "FIRST_id",
        name: "Napoleon Hill",
        image: HillImage,
        socketAddress: process.env.first,
        isDisabled: false
    },
    {
        id: "SECOND_id",
        name: "Philosopher",
        image: PhilosopherImage,
        socketAddress: process.env.second,
        isDisabled: true
    },
    {
        id: "THIRD_id",
        name: "Philip K. Dick",
        image: DickImage,
        socketAddress: process.env.third,
        isDisabled: true
    },
    {
        id: "FOURTH_id",
        name: "Ben Goertzel",
        image: BenImage,
        socketAddress: process.env.fourth,
        isDisabled: true
    },
];

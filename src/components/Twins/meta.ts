import { TwinData } from "../TwinsContext";

export const twinsList: TwinData[] = [
    {
        id: "FIRST_id",
        name: "Bot 1",
        socketAddress: process.env.first,
    },
    {
        id: "SECOND_id",
        name: "Bot 2",
        socketAddress: process.env.second,
    },
    {
        id: "THIRD_id",
        name: "Bot 3",
        socketAddress: process.env.third,
    },
    {
        id: "FOURTH_id",
        name: "Bot 4",
        socketAddress: process.env.fourth,
    },
];

import { createContext } from "react";

type TwinIdentifier = string | null;

type TwinData = {
    id: TwinIdentifier;
    name: string;
    image: any;
    isDisabled?: boolean;
    socketAddress: string | undefined;
};

type TwinContextValue = {
    selectedTwin: TwinData;
    setSelectedTwin: React.Dispatch<TwinData>;
};

const TwinsContext = createContext<TwinContextValue>({} as TwinContextValue);

export type { TwinContextValue, TwinData, TwinIdentifier };
export default TwinsContext;

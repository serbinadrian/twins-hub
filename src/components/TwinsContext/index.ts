import { createContext } from "react";

type TwinIdentifier = string | null;

type TwinData = {
    id: TwinIdentifier;
    name: string;
    socketAddress: string | undefined;
};

type TwinContextValue = {
    selectedTwinId: TwinIdentifier;
    setSelectedTwinId: React.Dispatch<TwinIdentifier>;
    twinsList: TwinData[];
};

const TwinsContext = createContext<TwinContextValue>({} as TwinContextValue);

export type { TwinContextValue, TwinData, TwinIdentifier };
export default TwinsContext;

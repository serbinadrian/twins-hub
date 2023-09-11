import React, { useState } from "react";
import Recorder from "../Recorder";
import TwinsContext, {
    TwinContextValue,
    TwinIdentifier,
} from "../TwinsContext";
import { twinsList } from "./meta";
import "./style.css";
import TwinsSelector from "../TwinsSelector";
const Twins = (): React.ReactElement => {
    const [selectedTwinId, setSelectedTwinId] = useState<TwinIdentifier>(null);
    const [speech, setSpeech] = useState<string>("");
    const contextValue: TwinContextValue = {
        selectedTwinId,
        setSelectedTwinId,
        twinsList,
    };

    return (
        <React.Fragment>
            <TwinsContext.Provider value={contextValue}>
                <div className="twins">
                    <Recorder />
                    <TwinsSelector />
                </div>
            </TwinsContext.Provider>
        </React.Fragment>
    );
};

export default Twins;

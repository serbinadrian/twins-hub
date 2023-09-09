import React, { useContext, useEffect } from "react";
import TwinsContext, { TwinData } from "../TwinsContext";
import TwinBlock from "../TwinBlock";

const TwinsSelector = (): React.ReactElement => {
    const { twinsList, setSelectedTwinId } = useContext(TwinsContext);

    const TwinsList = (): React.ReactElement => {
        return (
            <React.Fragment>
                {twinsList.map((twin: TwinData) => (
                    <TwinBlock twin={twin} key={twin.id}/>
                ))}
            </React.Fragment>
        );
    };

    useEffect(() => {
        setSelectedTwinId(twinsList[0].id);
    }, [setSelectedTwinId, twinsList]);

    return (
        <React.Fragment>
            <div className="twins-selector">
                <TwinsList />
            </div>
        </React.Fragment>
    );
};

export default TwinsSelector;

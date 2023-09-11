import React, { useContext } from "react";
import TwinsContext, { TwinData } from "../TwinsContext";
import ApplicationContext from "../ApplicationContext";
import TwinBlock from "../TwinBlock";
import "./style.css";

const TwinsSelector = (): React.ReactElement => {
    const { twinsList } = useContext(TwinsContext);
    const { isMobile } = useContext(ApplicationContext);

    const TwinsList = (): React.ReactElement => {
        return (
            <React.Fragment>
                {twinsList.map((twin: TwinData) => (
                    <TwinBlock twin={twin} key={twin.id}/>
                ))}
            </React.Fragment>
        );
    };

    const className = `twins-selector ${isMobile && "mobile"}`;    

    // useEffect(() => {
    //     setSelectedTwinId(twinsList[0].id);
    // }, [setSelectedTwinId, twinsList]);

    return (
        <React.Fragment>
            <div className={className}>
                <TwinsList />
            </div>
        </React.Fragment>
    );
};

export default TwinsSelector;

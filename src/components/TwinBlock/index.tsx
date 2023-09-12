import React, { useContext } from "react";
import TwinsContext, { TwinData } from "../TwinsContext";
import "./style.css";
import ApplicationContext from "../ApplicationContext";

interface Props {
    twin: TwinData;
}

const TwinBlock = ({ twin }: Props): React.ReactElement => {
    const { selectedTwin, setSelectedTwin } = useContext(TwinsContext);
    const { isAudioPlaying } = useContext(ApplicationContext);

    const className: string = `twin-block ${
        selectedTwin.id === twin.id && "active"
    }  ${twin.isDisabled && "disabled"}`;

    return (
        <React.Fragment>
            <div
                className={className}
                onClick={() =>
                    twin.isDisabled || isAudioPlaying
                        ? null
                        : setSelectedTwin(twin)
                }
            >
                <div className="twin-image-holder">
                    <img src={twin.image} alt={twin.name} />
                </div>
                <div className="twin-name-holder">
                    <p className="twin-name">{twin.name}</p>
                    <p className="twin-name">Twin</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TwinBlock;

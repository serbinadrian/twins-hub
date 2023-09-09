import React, { useContext } from "react";
import TwinsContext, { TwinData } from "../TwinsContext";
import "./style.css";

interface Props {
    twin: TwinData;
}

const TwinBlock = ({ twin }: Props): React.ReactElement => {
    const { selectedTwinId, setSelectedTwinId } = useContext(TwinsContext);

    const className: string = `twin-block ${
        selectedTwinId === twin.id && "active"
    }`;

    return (
        <React.Fragment>
            <div
                className={className}
                onClick={() => setSelectedTwinId(twin.id)}
            >
                <div className="twin-image-holder">
                    <img src="" alt={twin.name} />
                </div>
                <div className="twin-name-holder">
                    <p className="twin-name">{twin.name}</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TwinBlock;

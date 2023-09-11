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
    }  ${
        twin.isDisabled && "disabled"
    }`;

    return (
        <React.Fragment>
            <div
                className={className}
                onClick={() => twin.isDisabled ? null : setSelectedTwinId(twin.id)}
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

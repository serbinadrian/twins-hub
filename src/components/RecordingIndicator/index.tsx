import React from "react";
import "./style.css";

interface Props {
    isRecording: boolean;
}

const RecordingIndicator = ({isRecording}: Props): React.ReactElement => {
    return (
        <React.Fragment>
            <div className="recording-indicator">
                {isRecording ? "recording" : ""}
            </div>
        </React.Fragment>
    );
};

export default RecordingIndicator;
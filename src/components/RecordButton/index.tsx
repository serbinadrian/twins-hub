import React from "react";
import "./style.css";

interface Props {
    isRecording: boolean;
    onClick: () => void;
}

const RecordButton = ({ isRecording, onClick }: Props): React.ReactElement => {
    return (
        <React.Fragment>
            <button className="record-button" onClick={onClick}>
                {isRecording ? "stop recording" : "start recording"}
            </button>
        </React.Fragment>
    );
};

export default RecordButton;

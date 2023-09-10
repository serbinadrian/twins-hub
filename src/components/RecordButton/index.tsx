import React from "react";
import "./style.css";

interface Props {
    isRecording: boolean;
    onClick: () => void;
}

const RecordButton = ({ isRecording, onClick }: Props): React.ReactElement => {
    const runMicrophone = require("../../assets/images/mic-start.svg").default;
    const stopMicrophone = require("../../assets/images/mic-stop.svg").default;

    return (
        <React.Fragment>
            <button className="record-button" onClick={onClick}>
                {isRecording ? (
                    <img src={stopMicrophone} alt="stop recording" />
                ) : (
                    <img src={runMicrophone} alt="start recording" />
                )}
            </button>
        </React.Fragment>
    );
};

export default RecordButton;

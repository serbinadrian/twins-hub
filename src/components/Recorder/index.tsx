import React, { useState } from "react";
import RecordButton from "../RecordButton";
import RecordingIndicator from "../RecordingIndicator";

const Recorder = (): React.ReactElement => {
    const [isRecording, setIsRecording] = useState<boolean>(false);

    const startRecording = (): void => {
        setIsRecording(true);
    };

    const stopRecording = (): void => {
        setIsRecording(false);
    };

    const toggleRecording = (): void => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <React.Fragment>
            <div className="recorder">
                <RecordButton
                    isRecording={isRecording}
                    onClick={toggleRecording}
                />
                <RecordingIndicator isRecording={isRecording} />
            </div>
        </React.Fragment>
    );
};

export default Recorder;

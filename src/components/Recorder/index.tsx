import React, { useContext, useEffect, useState } from "react";
import RecordButton from "../RecordButton";
import RecordingIndicator from "../RecordingIndicator";
import ApplicationContext from "../ApplicationContext";
interface Props {
    setRecord: React.Dispatch<string>
}

const constraints = {
    audio: true,
    video: false,
};

let media: MediaStream;
let mediaRecorder: MediaRecorder;
let audioChunks: any[] = [];
let speechData: string | ArrayBuffer | null;
// let lastSpeechURL: string;

const Recorder = ({setRecord}: Props): React.ReactElement => {
    const { setIsLoading } = useContext(ApplicationContext);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    // eslint-disable-next-line
    // const [lastSpeechURL, setLastSpeechURL] = useState<string>("");

    const startRecording = (): void => {
        setIsRecording(true);
        if (!mediaRecorder) {
            setIsRecording(false);
            return;
        }
        mediaRecorder.start();
        //TODO block interface on use
    };

    const stopRecording = (): void => {
        setIsRecording(false);
        if (!mediaRecorder) {
            return;
        }
        mediaRecorder.stop();
    };

    const toggleRecording = (): void => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const runRecorderFileReader = (reader: FileReader, blob: Blob): void => {
        reader.readAsDataURL(blob);
        reader.onloadend = (): void => {
            const data: string = reader.result as string;
            speechData = data.substring(data.indexOf(',') + 1);
            setRecord(speechData);
            // console.log(speechData);
            setIsLoading(true);
            // checkResponse();
        };
    };

    const setupRecorderStop = (): void => {
        if (!mediaRecorder) {
            return;
        }
        mediaRecorder.onstop = (): void => {
            const blob = new Blob(audioChunks, {
                type: "audio/webm;codecs=pcm",
                // type: "audio/wav",
            });
            audioChunks = [];
            // setLastSpeechURL(URL.createObjectURL(blob));
            // lastSpeechURL = URL.createObjectURL(blob);
            const reader: FileReader = new FileReader();
            runRecorderFileReader(reader, blob);
        };
    };

    const setupRecorderStream = (): void => {
        if (!mediaRecorder) {
            return;
        }
        mediaRecorder.ondataavailable = (event: BlobEvent): void => {
            audioChunks.push(event.data);
        };
    };

    const createMediaRecorder = (): void => {
        mediaRecorder = new MediaRecorder(media);
        setupRecorderStream();
        setupRecorderStop();
    };

    useEffect(() => {
        if (!(navigator?.mediaDevices && navigator.mediaDevices?.getUserMedia)) {
            console.error("getUserMedia not supported on your browser!");
            return;
            //TODO create error and block interface
        }
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((userMedia: MediaStream) => {
                media = userMedia;
                createMediaRecorder();
            })
            .catch((error: any) => {
                console.error(
                    "The following getUserMedia error occurred: " + error
                    //TODO create error
                );
            });
        // eslint-disable-next-line
    }, []);

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

import React, { useEffect, useState } from "react";
import RecordButton from "../RecordButton";
import RecordingIndicator from "../RecordingIndicator";

const constraints = {
    audio: true,
    video: false,
};

let media: MediaStream;
let mediaRecorder: MediaRecorder;
let audioChunks: any[] = [];
let speechData: string | ArrayBuffer | null;
// let lastSpeechURL: string;

let ws: any;

const checkResponse = async () => {
    ws = new WebSocket("ws://80.79.245.160:4488");

    ws.onopen = () => {
        console.log("opened");
    }

    ws.onmessage = (e: any) => {
        console.log(e);
    }

    const message = {
        client: "web",
        username: "web_user",
        //request_type: "text",
        request_type: "speech",
        //response_type: "speech",
        response_type: "text",
        speech: speechData,
        // text: "What is your name?"
    }
    
    const send = () => {
        ws.send(JSON.stringify(message));
    }

    setTimeout(send, 5000);
}

const Recorder = (): React.ReactElement => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [lastSpeechURL, setLastSpeechURL] = useState<string>("");

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
            console.log(speechData);
            checkResponse();
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
            setLastSpeechURL(URL.createObjectURL(blob));
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
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            console.error("getUserMedia not supported on your browser!");
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
                <audio src={lastSpeechURL} controls />
            </div>
        </React.Fragment>
    );
};

export default Recorder;

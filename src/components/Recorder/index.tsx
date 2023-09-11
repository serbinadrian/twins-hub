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
    const url = process.env.REACT_APP_NAPOLEON_HILL_SOCKET as string;
    console.log(url);
    
    ws = new WebSocket(url);

    ws.onopen = () => {
        console.log("opened");
    }

    ws.onmessage = (e: any) => {
        const data = JSON.parse(e.data);
        console.log(data);

        const snd = new Audio("data:audio/wav;base64," + data.response);
        snd.play();
    }

    const message = {
        client: "web",
        username: "web_user",
        //request_type: "text",
        request_type: "speech",
        //response_type: "speech",
        response_type: "speech",
        speech: speechData,
        // text: "What is your name?"
    }
    
    const send = () => {
        ws.send(JSON.stringify(message));
    }

    setTimeout(send, 500);
}

const Recorder = (): React.ReactElement => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    // eslint-disable-next-line
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

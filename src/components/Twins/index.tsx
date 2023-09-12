import React, { useContext, useEffect, useState } from "react";
import Recorder from "../Recorder";
import TwinsContext, { TwinContextValue, TwinData } from "../TwinsContext";
import { twinsList } from "./meta";
import "./style.css";
import TwinsSelector from "../TwinsSelector";
import ApplicationContext from "../ApplicationContext";

let ws: WebSocket;
//#ws://80.79.245.160:4488
const Twins = (): React.ReactElement => {
    const { setIsAudioPlaying } = useContext(ApplicationContext);
    const [selectedTwin, setSelectedTwin] = useState<TwinData>(twinsList[0]);
    const [speech, setSpeech] = useState<string>("");
    const { setIsLoading } = useContext(ApplicationContext);
    const contextValue: TwinContextValue = {
        selectedTwin,
        setSelectedTwin,
    };

    const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (
            let offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
        ) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    const checkResponse = async () => {
        if (speech.length < 1) {
            return;
        }

        setIsLoading(true);
        const url = selectedTwin?.socketAddress as string;
        console.log(url);

        ws = await new WebSocket(url);

        const closeConnection = () => {
            ws.close();
        };

        ws.onclose = () => {
            console.log("closed");
        };

        ws.onerror = (error) => {
            setIsLoading(false);
            setIsAudioPlaying(false);
            console.error(error);
        };

        ws.onmessage = (e: any) => {
            try {
                const data = JSON.parse(e.data);
                //console.log(data);
                if (data?.msg && data?.event === "error") {
                    throw new Error(
                        "Provided data is not an audio. Given error message: " +
                            data?.msg
                    );
                }
                const blob = b64toBlob(data.response);
                const url = URL.createObjectURL(blob);
                // const snd = new Audio("data:audio/wav;base64," + data.response);
                const snd = new Audio(url);
                setIsLoading(false);
                closeConnection();
                snd.addEventListener("ended", () => {
                    setIsAudioPlaying(false);
                });
                snd.addEventListener("play", () => {
                    setIsAudioPlaying(true);
                });
                snd.play();
            } catch (error) {
                closeConnection();
                setIsAudioPlaying(false);
                setIsLoading(false);
                console.error(error);
            }
        };

        const message = {
            client: "web",
            username: "web_user",
            //request_type: "text",
            request_type: "speech",
            //response_type: "speech",
            response_type: "speech",
            speech: speech,
            // text: "What is your name?"
            is_search_enabled: false,
        };

        const send = () => {
            ws.send(JSON.stringify(message));
        };

        ws.onopen = () => {
            console.log("opened");
            send();
        };

        // setTimeout(send, 500);
    };

    useEffect(() => {
        checkResponse();
        // eslint-disable-next-line
    }, [speech]);

    // useEffect(() => {
    //     console.log("connecting twin with id", currentTwin?.id);
    //     setIsLoading(true);
    //     connect(currentTwin?.socketAddress as string);
    //     setIsLoading(false);
    //     //es-lint-disable-next-line
    // }, []);

    // useEffect(() => {
    //     console.log("connecting twin with id", currentTwin?.id);
    //     setIsLoading(true);
    //     switchConnection(currentTwin?.socketAddress as string);
    //     setIsLoading(false);
    //     //es-lint-disable-next-line
    // }, [selectedTwinId]);

    return (
        <React.Fragment>
            <TwinsContext.Provider value={contextValue}>
                <div className="twins">
                    <Recorder setRecord={setSpeech} />
                    <TwinsSelector />
                </div>
            </TwinsContext.Provider>
        </React.Fragment>
    );
};

export default Twins;

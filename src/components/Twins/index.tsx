import React, { useContext, useEffect, useState } from "react";
import Recorder from "../Recorder";
import TwinsContext, {
    TwinContextValue,
    TwinIdentifier,
} from "../TwinsContext";
import { twinsList } from "./meta";
import "./style.css";
import TwinsSelector from "../TwinsSelector";
import ApplicationContext from "../ApplicationContext";

let ws: WebSocket;
//#ws://80.79.245.160:4488
const Twins = (): React.ReactElement => {
    const [selectedTwinId, setSelectedTwinId] = useState<TwinIdentifier>(
        twinsList[0].id
    );
    const [speech, setSpeech] = useState<string>("");
    const { setIsLoading } = useContext(ApplicationContext);
    const currentTwin = twinsList.find((twin) => twin.id === selectedTwinId);
    const contextValue: TwinContextValue = {
        selectedTwinId,
        setSelectedTwinId,
        twinsList,
    };

    const checkResponse = async () => {
        if(speech.length < 1) {
            return;
        }

        setIsLoading(true);
        const url = currentTwin?.socketAddress as string;
        console.log(url);

        ws = await new WebSocket(url);

        ws.onerror = (error) => {
            setIsLoading(false);
            console.error(error);
        };

        ws.onmessage = (e: any) => {
            const data = JSON.parse(e.data);
            // console.log(data);

            const snd = new Audio("data:audio/wav;base64," + data.response);
            setIsLoading(false);
            snd.play();
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

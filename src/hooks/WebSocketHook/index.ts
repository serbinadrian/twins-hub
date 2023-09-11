import { useState } from "react";
import {
    Notification,
    notificationTypes,
} from "../../utils/types/Notification";

export const useWebSocketHook = () => {
    const [socketInstance, setSocketInstance] = useState<WebSocket>(
        {} as WebSocket
    );
    const [currentAddress, setCurrentAddress] = useState<string>("");
    const [notification, setNotification] = useState<Notification>(
        new Notification()
    );
    const [messages, setMessages] = useState<object[]>([]);

    const connect = (address: string): void => {
        setCurrentAddress(address);
        const socket: WebSocket = new WebSocket(address);
        enableOpenManager(socket);
        enableMessageManager(socket);
        enableErrorManager(socket);
        enableCloseManager(socket);
    };

    const disconnect = (): void => {
        if(socketInstance === {} as WebSocket || !socketInstance){
            return;
        }
        setCurrentAddress("");
        socketInstance?.close();
        setSocketInstance({} as WebSocket);
    };

    const switchConnection = (address: string): void => {
        disconnect();
        connect(address);
    };

    const enableMessageManager = (socket: WebSocket): void => {
        socket.onmessage = (event: any) => {
            const recentMessages = messages;
            setMessages([...recentMessages, event]);
        };
    };

    const enableOpenManager = (socket: WebSocket): void => {
        socket.onopen = () => {
            console.log("Connection to " + currentAddress + " established");
        };
    };

    const enableErrorManager = (socket: WebSocket): void => {
        socket.onerror = (event) => {
            console.error(event);
            // TODO fix
            const error = new Notification("error", notificationTypes.ERROR);
            setNotification(error);
        };
    };

    const enableCloseManager = (socket: WebSocket): void => {
        socket.onclose = () => {
            console.log("Connection to " + currentAddress + " closed");
        };
    };

    const send = (message: string): void => {
        if(socketInstance === {} as WebSocket || !socketInstance){
            return;
        }
        socketInstance?.send(message);
    };

    return {
        socketInstance,
        connect,
        disconnect,
        switchConnection,
        notification,
        send,
    };
};

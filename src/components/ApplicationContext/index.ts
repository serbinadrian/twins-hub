import { createContext } from "react";
import Queue from "../../utils/types/Queue";
import {Notification} from "../../utils/types/Notification";

type ApplicationContextValue = {
    isLoading: boolean;
    isAudioPlaying: boolean;
    setIsAudioPlaying: React.Dispatch<boolean>;
    setIsLoading: React.Dispatch<boolean>;
    notificationQueue: Queue<Notification>;
    isMobile: Boolean;
};

const ApplicationContext = createContext<ApplicationContextValue>(
    {} as ApplicationContextValue
);

export type { ApplicationContextValue };
export default ApplicationContext;

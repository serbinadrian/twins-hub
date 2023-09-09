import { createContext } from "react";
import Queue from "../../utils/types/Queue";
import {Notification} from "../../utils/types/Notification";

type ApplicationContextValue = {
    notificationQueue: Queue<Notification>;
};

const ApplicationContext = createContext<ApplicationContextValue>(
    {} as ApplicationContextValue
);

export type { ApplicationContextValue };
export default ApplicationContext;

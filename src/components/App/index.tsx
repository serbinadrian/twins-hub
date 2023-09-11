import React, { useState } from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import "./style.css";
import Twins from "../Twins";
import ApplicationContext, {
    type ApplicationContextValue,
} from "../ApplicationContext";
import Queue from "../../utils/types/Queue";
import { Notification } from "../../utils/types/Notification";
import LoadingIndicator from "../LoadingIndicator";
import { useResize } from "../../hooks/ResizeHook";
import { windowSizes } from "../../utils/constants";

function App(): React.ReactElement {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const notificationQueue = new Queue<Notification>();
    const {windowWidth} = useResize();
    const isMobile = windowWidth < windowSizes.REGULAR;
    const applicationContextValue: ApplicationContextValue = {notificationQueue, isLoading, setIsLoading, isMobile};
    
    return (
        <React.Fragment>
            <ApplicationContext.Provider value={applicationContextValue}>
                <GeneralLayout>
                    <Twins />
                </GeneralLayout>
                <LoadingIndicator />
            </ApplicationContext.Provider>
        </React.Fragment>
    );
}

export default App;

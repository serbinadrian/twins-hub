import React from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import "./style.css";
import Twins from "../Twins";
import ApplicationContext, {
    type ApplicationContextValue,
} from "../ApplicationContext";
import Queue from "../../utils/types/Queue";
import { Notification } from "../../utils/types/Notification";

function App(): React.ReactElement {
    const notificationQueue = new Queue<Notification>();
    const applicationContextValue: ApplicationContextValue = {notificationQueue};

    return (
        <React.Fragment>
            <ApplicationContext.Provider value={applicationContextValue}>
                <GeneralLayout>
                    <Twins />
                </GeneralLayout>
            </ApplicationContext.Provider>
        </React.Fragment>
    );
}

export default App;

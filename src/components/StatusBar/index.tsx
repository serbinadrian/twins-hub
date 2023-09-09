import React, { useContext, useEffect, useState } from "react";
import ApplicationContext from "../ApplicationContext";
import { Notification } from "../../utils/types/Notification";
import NotificationBox from "../NotificationBox";

const StatusBar = (): React.ReactElement => {
    const [currentNotification, setCurrentNotification] =
        useState<Notification>(new Notification());
    const { notificationQueue } = useContext(ApplicationContext);
    const areNotificationsPresent: boolean = notificationQueue.size() < 1;
    const className = `status-bar ${areNotificationsPresent && "hide"}`;

    const dismiss = (): void => {
        setCurrentNotification(new Notification());
        notificationQueue.dequeue();
    };

    const resolve = (): void => {
        const action = currentNotification.getAction();
        if (!action) {
            return;
        }
        action();
        dismiss();
    };

    useEffect(() => {
        const newNotification = notificationQueue.getNext();
        if (!newNotification) {
            return;
        }
        setCurrentNotification(newNotification);
    }, [notificationQueue]);

    return (
        <React.Fragment>
            <div className={className}>
                {areNotificationsPresent && (
                    <NotificationBox
                        notification={currentNotification}
                        dismiss={dismiss}
                        resolve={resolve}
                    />
                )}
            </div>
        </React.Fragment>
    );
};

export default StatusBar;

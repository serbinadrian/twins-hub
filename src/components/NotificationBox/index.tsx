import React from "react";
import { Notification } from "../../utils/types/Notification";
import "./style.css";

interface Props {
    notification: Notification;
    dismiss: () => void;
    resolve: () => void;
}

const NotificationBox = ({
    notification,
    dismiss,
    // resolve,
}: Props): React.ReactElement => {
    const className = `notification ${notification.getType()}`;
    
    const scheduledResolution: NodeJS.Timeout = setTimeout(dismiss, 7000);

    const resolveNotification = (): void => {
        clearTimeout(scheduledResolution);
        dismiss();
    };

    return (
        <React.Fragment>
            <div className={className}>
                {/* TODO <div className="notification-icon-box"></div>  */}
                <div className="notification-message-holder">
                    <p className="notification-message">
                        {notification.getMessage() + 'aaaaaaaaaaaaa'}
                    </p>
                </div>
                <div
                    className="notification-action-icon-box"
                    onClick={resolveNotification}
                >
                    <svg viewBox="0 0 10 10">
                        <line x1="2" y1="8" x2="8" y2="2" stroke="black" strokeLinecap="round"/>
                        <line x1="2" y1="2" x2="8" y2="8" stroke="black" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
        </React.Fragment>
    );
};

export default NotificationBox;
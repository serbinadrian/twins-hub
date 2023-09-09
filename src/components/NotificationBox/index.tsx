import React from "react";
import { Notification } from "../../utils/types/Notification";

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
                <div className="notification-icon-box">icon</div>
                <div className="notification-message-holder">
                    <p className="notification-message">
                        {notification.getMessage()}
                    </p>
                </div>
                <div
                    className="notification-action-icon-box"
                    onClick={resolveNotification}
                >
                    close
                </div>
            </div>
        </React.Fragment>
    );
};

export default NotificationBox;
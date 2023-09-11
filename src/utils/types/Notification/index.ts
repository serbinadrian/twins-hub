export const enum notificationTypes {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
}

export type NotificationType = string;

export class Notification {
    private type: NotificationType = notificationTypes.INFO;
    private message: string = "";
    private action: Function;

    constructor(
        message: string = "",
        type: string = notificationTypes.INFO,
        action: Function = () => {}
    ) {
        this.message = message;
        this.type = type;
        this.action = action;
    }

    setMessage(message: string): void {
        this.message = message;
    }

    setType(type: NotificationType): void {
        this.type = type;
    }

    setAction(action: Function): void {
        this.action = action;
    }

    getMessage(): string {
        return this.message;
    }

    getType(): NotificationType {
        return this.type;
    }

    getAction(): Function {
        return this.action;
    }
}

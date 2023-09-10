import React, { useContext } from "react";
import "./style.css";
import ApplicationContext from "../ApplicationContext";

const LoadingIndicator = (): React.ReactElement => {
    const { isLoading } = useContext(ApplicationContext);
    const className = `loading-holder ${!isLoading && "hide"}`;

    return (
        <React.Fragment>
            <div className={className}>
                <div className="loader">Loading...</div>
            </div>
        </React.Fragment>
    );
};

export default LoadingIndicator;

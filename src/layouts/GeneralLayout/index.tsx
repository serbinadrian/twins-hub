import React from "react";
import "./style.css";
import StatusBar from "../../components/StatusBar";

interface Props {
    children: React.ReactElement;
}

const GeneralLayout = ({ children }: Props): React.ReactElement => {
    return (
        <React.Fragment>
            <main>{children}</main>
            <StatusBar />
        </React.Fragment>
    );
};

export default GeneralLayout;

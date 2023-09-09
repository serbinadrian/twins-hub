import React from "react";

interface Props {
    children: React.ReactElement;
}

const DefaultLayout = ({ children }: Props): React.ReactElement => {
    return <React.Fragment>{children}</React.Fragment>;
};

export default DefaultLayout;

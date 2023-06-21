import React from "react";

const Error = (props) => {
    console.log('error', props.error)
    return <div>{props.error}</div>;
};

export default Error;

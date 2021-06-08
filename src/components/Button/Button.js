import React from "react";

const Button = ({ buttonContent, callback }) => {
    return (
        <button className="btn btn-secondary m-4" onClick={callback} type="button">{buttonContent}</button>
    )
};

Button.defaultProps = {
    buttonContent: "Button",
    callback: () => console.log("This is a button callback!")
};

export default Button;
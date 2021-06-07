import React from "react";

const Button = ({ buttonText }) => {
    return (
        <button className="btn btn-secondary" type="submit">{buttonText}</button>
    )
};

Button.defaultProps = {
    buttonText: "Button"
};

export default Button;
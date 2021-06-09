import { useState } from "react";

const useInput = (initialInput = "") => {
    const [ input, setInput ] = useState(initialInput);

    const handleInputChange = event => {
        setInput(event.target.value);
    };
    const resetInputChange = () => {
        setInput("");
    }
    return [input, handleInputChange, resetInputChange]
};

export default useInput;
import { useState } from "react";

const useInput = (initialInput = "") => {
    const [ input, setInput ] = useState(initialInput);

    const handleInputChange = event => {
        setInput(event.target.value);
    };
    return [input, handleInputChange]
};

export default useInput;
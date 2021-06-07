import React from "react";
import "./Searchbar.css";

const Searchbar = ({ handleInputChange }) => {
    return (
        <form className="d-flex">
            <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
                onChange={handleInputChange}
            />
        </form>
    )
};

export default Searchbar;
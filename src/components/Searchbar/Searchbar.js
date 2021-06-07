import React from "react";
import "./Searchbar.css";

const Searchbar = ({ handleInputChange }) => {
    return (
        <form className="d-flex">
            <input 
                className="form-control bg-dark text-center text-light" 
                type="search" 
                placeholder="Type to filter users here..." 
                aria-label="Search" 
                onChange={handleInputChange}
            />
        </form>
    )
};

export default Searchbar;
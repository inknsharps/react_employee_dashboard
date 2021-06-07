import React from "react";
import "./Searchbar.css";
import Button from "../Button/Button";

const Searchbar = () => {
    return (
        <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <Button buttonText="Search" />
        </form>
    )
};

export default Searchbar;
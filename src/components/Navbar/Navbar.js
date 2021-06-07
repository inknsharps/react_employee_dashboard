import React from "react";
import "./Navbar.css";
import Searchbar from "../Searchbar/Searchbar"

const Navbar = ({ navbarTheme, backgroundColor, navTitle }) => {
	return (
		<nav className={`navbar navbar-${navbarTheme} bg-${backgroundColor}`}>
			<div className="container-fluid">
				<span className="navbar-brand mb-0 h1">{navTitle}</span>
				<Searchbar />
			</div>
		</nav>
	);
};

Navbar.defaultProps = {
	navbarTheme: "light",
	backgroundColor: "light",
	navTitle: "Navbar"
};

export default Navbar;

import React from "react";
import "./Navbar.css";

const Navbar = ({ navbarTheme, backgroundColor, navTitle }) => {
	return (
		<nav className={`navbar navbar-${navbarTheme} bg-${backgroundColor} p-3`}>
			<div className="container-fluid">
				<span className="navbar-brand mb-0 h1">{navTitle}</span>
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

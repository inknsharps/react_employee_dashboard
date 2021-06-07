import React from "react";
import "./Navbar.css";

const Navbar = ({ navbarTheme, backgroundColor }) => {
	return (
		<nav className={`navbar navbar-${navbarTheme} bg-${backgroundColor}`}>
			<div className="container-fluid">
				<span className="navbar-brand mb-0 h1">Navbar</span>
			</div>
		</nav>
	);
};

Navbar.defaultProps = {
	navbarTheme: "light",
	backgroundColor: "light"
};

export default Navbar;

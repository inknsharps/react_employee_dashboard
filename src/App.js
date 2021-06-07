import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className="App">
            <Navbar navbarTheme="dark" backgroundColor="dark" navTitle="Employee Dashboard" />
            <Main />
            <Footer />
        </div>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navber.jsx";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import About from "./pages/About";
import Chat from "./pages/Chat.jsx";

import "./App.css";

function App() {
    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/about" element={<About />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </Router>
    );
}

export default App;

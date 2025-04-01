import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">홈</Link></li>
                <li><Link to="/todo">TODO</Link></li>
                <li><Link to="/about">소개</Link></li>
                <li><Link to="/chat">chat</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;

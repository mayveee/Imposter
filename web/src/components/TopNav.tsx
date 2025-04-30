import { Link, useLocation } from "react-router-dom";
import "./TopNav.css";

export default function TopNav() {
    const { pathname } = useLocation();

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/upload", label: "Upload" },
        { path: "/calendar", label: "Calendar" },
    ];

    return (
        <nav className="top-nav">
        {navItems.map((item) => (
            <Link
            key={item.path}
            to={item.path}
            className={pathname === item.path ? "active" : ""}
            >
            {item.label}
            </Link>
        ))}
        </nav>
    );
}

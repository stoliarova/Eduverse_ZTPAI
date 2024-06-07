import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authorities, setAuthorities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const auth = JSON.parse(localStorage.getItem("authorities"));

        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        if (auth) {
            setAuthorities(auth);
        } else {
            setAuthorities([]);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("authorities");
        setIsLoggedIn(false);
        setAuthorities([]);
        navigate("/signIn");
    };

    const hasAuthority = (authority) => {
        return authorities.includes(authority);
    };

    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <span className={styles.navLeft}>
                    <NavLink className={styles.navHome} to="/">
                        Home
                    </NavLink>
                    <NavLink className={styles.navCourses} to="/courses">
                        Courses
                    </NavLink>
                    {isLoggedIn && (
                        <NavLink className={styles.navUser} to="/user">
                            My Page
                        </NavLink>
                    )}
                    {(hasAuthority("ADMIN") || hasAuthority("MANAGER")) && (
                        <NavLink className={styles.navAdmin} to="/admin">
                            Admin Panel
                        </NavLink>
                    )}
                </span>
                <span className={styles.navRight}>
                    {isLoggedIn ? (
                        <>
                            <NavLink className={styles.navCart} to="/cart">
                                Shopping Cart
                            </NavLink>
                            <button className={`${styles.navButton} ${styles.navLogout}`} onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink className={styles.navSignIn} to="/signIn">
                                Sign In
                            </NavLink>
                            <NavLink className={styles.navSignUp} to="/signUp">
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </span>
            </nav>
        </div>
    );
}

export default Navbar;

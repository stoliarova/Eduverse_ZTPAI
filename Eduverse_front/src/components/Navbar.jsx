import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    return (
        <div>
            <nav className={styles.nav}>
                <span className={styles.navLeft}>
                    <NavLink className={styles.navHome} to="/">
                        Home
                    </NavLink>
                    <NavLink className={styles.navCourses} to="/courses">
                        Courses
                    </NavLink>
                    <NavLink className={styles.navUser} to="/user">
                        My Page
                    </NavLink>
                </span>
                <span className={styles.navRight}>
                    <NavLink className={styles.navSignIn} to="/signIn">
                        Sign In
                    </NavLink>
                    <NavLink className={styles.navSignUp} to="/signUp">
                        Sign Up
                    </NavLink>
                </span>
            </nav>
        </div>
    );
}

export default Navbar;

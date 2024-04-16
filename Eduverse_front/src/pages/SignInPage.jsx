import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import styles from "./SignInPage.module.css";

function SignInPage() {
    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.signRoot}>
                <div className={styles.signTitle}>Sign-in</div>

                <div className={styles.mailRoot}>
                    <input type="text" placeholder="Email"></input>
                </div>

                <div className={styles.passwordRoot}>
                    <input type="text" placeholder="Password"></input>
                </div>
                <div className={styles.signButton}>Login</div>
                <div className={styles.noAccountRoot}>
                    <span className={styles.noAccountTitle}>Don't have an account?</span>
                    <Link className={styles.noAccountButton} to="/signUp">
                        Signup Here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;

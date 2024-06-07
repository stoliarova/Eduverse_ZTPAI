import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./SignInPage.module.css";

function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const userId = data.userId;
                localStorage.setItem("jwtToken", token);
                localStorage.setItem("userId", userId);

                // Fetch user info
                const userInfoResponse = await fetch(`http://localhost:8080/api/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (userInfoResponse.ok) {
                    const userInfo = await userInfoResponse.json();
                    const authorities = userInfo.authorities.map((auth) => auth.name);
                    console.log(authorities);
                    localStorage.setItem("authorities", JSON.stringify(authorities));
                    navigate("/user");
                } else {
                    throw new Error("Failed to fetch user info");
                }
            } else {
                setError("Failed to login");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed: " + error.message);
        }
    };

    return (
        <div className={styles.page}>
            <Navbar />
            <form className={styles.signRoot} onSubmit={handleLogin}>
                <div className={styles.signTitle}>Sign-in</div>
                <div className={styles.mailRoot}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={styles.passwordRoot}>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <button type="submit" className={styles.signButton}>
                    Login
                </button>
                <div className={styles.noAccountRoot}>
                    <span className={styles.noAccountTitle}>Don't have an account?</span>
                    <Link className={styles.noAccountButton} to="/signup">
                        Signup Here
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignInPage;

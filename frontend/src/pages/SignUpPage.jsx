import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./SignUpPage.module.css";

function SignUpPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        const firstName = `FirstName ${username}`;
        const lastName = `LastName ${username}`;

        const registrationData = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
        };

        try {
            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                const loginResponse = await fetch("http://localhost:8080/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                });

                if (loginResponse.ok) {
                    const data = await loginResponse.json();
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
                        localStorage.setItem("authorities", JSON.stringify(authorities));
                        navigate("/user");
                    } else {
                        throw new Error("Failed to fetch user info");
                    }
                } else {
                    setError("Failed to login after registration");
                }
            } else {
                setError("Failed to register");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("Registration error: " + error.message);
        }
    };

    return (
        <div className={styles.page}>
            <Navbar />
            <form className={styles.signRoot} onSubmit={handleRegister}>
                <div className={styles.signTitle}>Create account</div>

                <div className={styles.nameRoot}>
                    <input type="text" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className={styles.mailRoot}>
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className={styles.passwordRoot}>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <button type="submit" className={styles.signButton}>
                    Register
                </button>
                <div className={styles.noAccountRoot}>
                    <span className={styles.noAccountTitle}>Already have an account?</span>
                    <Link className={styles.noAccountButton} to="/signin">
                        Signin Here
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignUpPage;

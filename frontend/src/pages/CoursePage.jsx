import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./CoursePage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function CoursePage() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchCourse();
        fetchUser();
    }, [courseId]);

    const fetchCourse = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setCourse(data);
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    };

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8080/api/users/${localStorage.getItem("userId")}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const toggleLessonLearned = async (lessonId) => {
        try {
            const token = localStorage.getItem("jwtToken");
            const url = user.learnedLessons.includes(lessonId)
                ? `http://localhost:8080/api/user/${user.id}/learnedLessons/${lessonId}`
                : `http://localhost:8080/api/user/${user.id}/learnedLessons/${lessonId}`;
            const method = user.learnedLessons.includes(lessonId) ? "DELETE" : "PUT";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            await fetchUser();
        } catch (error) {
            console.error("Error toggling lesson learned:", error);
        }
    };

    return (
        <div className={styles.page}>
            <Navbar />
            {course && (
                <div className="container mt-4">
                    <div className={styles.courseInfo}>
                        <div className={styles.courseImage} style={{ backgroundImage: `url(${course.imageUrl})` }}></div>
                        <div className={styles.courseDetails}>
                            <h2>{course.name}</h2>
                            <p>{course.description}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3>Lessons</h3>
                        <div className={styles.lessonsList}>
                            {course.lessons.map((lesson) => (
                                <div
                                    key={lesson.id}
                                    className={`${styles.lessonItem} ${user?.learnedLessons.includes(lesson.id) ? styles.learned : ""} ${
                                        lesson.completed ? styles.completed : ""
                                    }`}
                                    onClick={() => toggleLessonLearned(lesson.id)}
                                >
                                    <div className={styles.lessonImage} style={{ backgroundImage: `url(${lesson.imageUrl})` }}></div>
                                    <div className={styles.lessonDetails}>
                                        <h4>{lesson.name}</h4>
                                        <p>{lesson.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoursePage;

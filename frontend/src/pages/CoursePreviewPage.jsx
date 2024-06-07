import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./CoursePage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function CoursePreviewPage() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetchCourse();
    }, [courseId]);

    const fetchCourse = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8080/api/courses/${courseId}`);
            const data = await response.json();
            setCourse(data);
        } catch (error) {
            console.error("Error fetching course data:", error);
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
                                <div key={lesson.id} className={`${styles.lessonItem} ${lesson.completed ? styles.completed : ""}`}>
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

export default CoursePreviewPage;

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import styles from "./UserPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function UserPage() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("Purchased courses");
    const [notes, setNotes] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [coursePrice, setCoursePrice] = useState(0);
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [lessonName, setLessonName] = useState("");
    const [lessonDescription, setLessonDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
        fetchTags();
    }, []);

    useEffect(() => {
        if (user) {
            setNotes(user.notes);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setAbout(user.about);
        }
    }, [user]);

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

    const fetchTags = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8080/api/tags`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setTags(data);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    const handleTabClick = async (tab) => {
        await fetchUser();
        setActiveTab(tab);
    };

    const handleSaveNotes = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            await fetch(`http://localhost:8080/api/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...user, notes }),
            });
            alert("Notes saved successfully");
        } catch (error) {
            console.error("Error saving notes:", error);
        }
    };

    const handleSaveSettings = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            let data = await response.json();
            data.firstName = firstName;
            data.lastName = lastName;
            data.about = about;
            data.email = email;

            await fetch(`http://localhost:8080/api/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            fetchUser();
            alert("Settings saved successfully");
        } catch (error) {
            console.error("Error saving settings:", error);
        }
    };

    const renderCourses = (courses) => (
        <div className={styles.courseListRoot}>
            {courses.map((course) => {
                const learnedLessonsCount = course.lessons.filter((lesson) => user.learnedLessons.includes(lesson.id)).length;
                const totalLessonsCount = course.lessons.length;
                const progressPercentage = (learnedLessonsCount / totalLessonsCount) * 100;

                return (
                    <CourseItem
                        key={course.id}
                        name={course.name}
                        description={course.description}
                        price={course.price}
                        imageUrl={course.imageUrl}
                        onClick={() => navigate(`/course/${course.id}`)}
                        learnedLessonsCount={learnedLessonsCount}
                        totalLessonsCount={totalLessonsCount}
                        progressPercentage={progressPercentage}
                    />
                );
            })}
        </div>
    );

    const getPurchasedCourses = () => {
        const uniqueCourses = user?.purchasedCourses.reduce((acc, course) => {
            if (!acc.find((c) => c.id === course.id)) {
                acc.push(course);
            }
            return acc;
        }, []);
        return uniqueCourses || [];
    };

    const getInProgressCourses = () =>
        getPurchasedCourses().filter((course) => course.lessons.some((lesson) => user.learnedLessons.includes(lesson.id)));
    const getCompletedCourses = () =>
        getPurchasedCourses().filter((course) => course.lessons.every((lesson) => user.learnedLessons.includes(lesson.id)));
    const getArchivedCourses = () => getPurchasedCourses().filter((course) => course.archived);

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setCourseName(course.name);
        setCourseDescription(course.description);
        setCoursePrice(course.price);
        setLessons(course.lessons);
        setSelectedTags(course.tags || []);
        setSelectedLesson(null);
        setLessonName("");
        setLessonDescription("");
    };

    const handleNewCourseClick = () => {
        setSelectedCourse(null);
        setCourseName("");
        setCourseDescription("");
        setCoursePrice(0);
        setLessons([]);
        setSelectedTags([]);
        setSelectedLesson(null);
        setLessonName("");
        setLessonDescription("");
    };

    const handleNewLessonClick = () => {
        setSelectedLesson(null);
        setLessonName("");
        setLessonDescription("");
    };

    const handleCourseSubmit = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            const method = selectedCourse ? "PUT" : "POST";
            const url = selectedCourse ? `http://localhost:8080/api/courses/${selectedCourse.id}` : "http://localhost:8080/api/courses";

            let courseData = {
                name: courseName,
                description: courseDescription,
                price: coursePrice,
                tags: selectedTags,
            };

            if (selectedCourse) {
                const response = await fetch(`http://localhost:8080/api/courses/${selectedCourse.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                let data = await response.json();

                data.name = courseData.name;
                data.description = courseData.description;
                data.price = courseData.price;
                data.tags = courseData.tags;

                courseData = data;
            } else {
                courseData.creators = [user.courseUserInfo];
            }

            const courseResponse = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(courseData),
            });

            if (!courseResponse.ok) {
                throw new Error(`Request failed with status ${courseResponse.status}`);
            }

            await fetchUser();
            const newOrUpdatedCourse = await courseResponse.json();
            alert(selectedCourse ? "Course updated successfully!" : "Course created successfully!");

            // Select the newly created or updated course
            setSelectedCourse(newOrUpdatedCourse);
            setCourseName(newOrUpdatedCourse.name);
            setCourseDescription(newOrUpdatedCourse.description);
            setCoursePrice(newOrUpdatedCourse.price);
            setLessons(newOrUpdatedCourse.lessons);
            setSelectedTags(newOrUpdatedCourse.tags);
        } catch (error) {
            console.error("Error submitting course:", error);
        }
    };

    const handleLessonSubmit = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            const courseId = selectedCourse.id;
            const method = selectedLesson ? "PUT" : "POST";
            const url = selectedLesson
                ? `http://localhost:8080/api/courses/${courseId}/lessons/${selectedLesson.id}`
                : `http://localhost:8080/api/courses/${courseId}/lessons`;

            let lessonData = {
                name: lessonName,
                description: lessonDescription,
            };

            if (selectedLesson) {
                const response = await fetch(`http://localhost:8080/api/courses/${courseId}/lessons/${selectedLesson.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                lessonData = { ...data, ...lessonData };
            }

            const lessonResponse = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(lessonData),
            });

            if (!lessonResponse.ok) {
                throw new Error(`Request failed with status ${lessonResponse.status}`);
            }

            await fetchUser();
            const newOrUpdatedLesson = await lessonResponse.json();
            alert(selectedLesson ? "Lesson updated successfully!" : "Lesson created successfully!");

            // Update lessons and select the newly created or updated lesson
            const updatedCourse = user.createdCourses.find((course) => course.id === courseId);
            setSelectedCourse(updatedCourse);
            setLessons(updatedCourse.lessons);
            setSelectedLesson(newOrUpdatedLesson);
            setLessonName(newOrUpdatedLesson.name);
            setLessonDescription(newOrUpdatedLesson.description);
        } catch (error) {
            console.error("Error submitting lesson:", error);
        }
    };

    const handleLessonClick = (lesson) => {
        setSelectedLesson(lesson);
        setLessonName(lesson.name);
        setLessonDescription(lesson.description);
    };

    const toggleTag = (tag) => {
        setSelectedTags((prevTags) => {
            if (prevTags.find((t) => t.id === tag.id)) {
                return prevTags.filter((t) => t.id !== tag.id);
            } else {
                return [...prevTags, tag];
            }
        });
    };

    return (
        <div className={styles.page}>
            <Navbar />
            {user && (
                <>
                    <div className={styles.userInfoRoot}>
                        <span className={styles.userImage}></span>
                        <span className={styles.userInfo}>
                            <div className={styles.userName}>
                                {user.firstName} {user.lastName} ({user.username})
                            </div>
                            <div className={styles.userOccupation}>{user.authorities.map((auth) => auth.name).join(", ")}</div>
                            <div className={styles.userDescription}>{user.about}</div>
                        </span>
                    </div>

                    <div className="container mt-4">
                        <ul className="nav nav-tabs">
                            {["Purchased courses", "In progress", "Completed", "Archived", "My notes", "Settings"].map((tab) => (
                                <li className="nav-item" key={tab}>
                                    <a className={`nav-link ${activeTab === tab ? "active" : ""}`} onClick={() => handleTabClick(tab)} href="#!">
                                        {tab}
                                    </a>
                                </li>
                            ))}
                            {user.authorities.some((auth) => auth.name === "CREATOR") && (
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${activeTab === "Create new course" ? "active" : ""}`}
                                        onClick={() => handleTabClick("Create new course")}
                                        href="#!"
                                    >
                                        Create new course
                                    </a>
                                </li>
                            )}
                        </ul>

                        <div className="tab-content mt-4">
                            {activeTab === "Purchased courses" && renderCourses(getPurchasedCourses())}
                            {activeTab === "In progress" && renderCourses(getInProgressCourses())}
                            {activeTab === "Completed" && renderCourses(getCompletedCourses())}
                            {activeTab === "Archived" && renderCourses(getArchivedCourses())}
                            {activeTab === "My notes" && (
                                <div className="form-group">
                                    <textarea className="form-control" rows="10" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                    <button className="btn btn-primary mt-2" onClick={handleSaveNotes}>
                                        Save Notes
                                    </button>
                                </div>
                            )}
                            {activeTab === "Settings" && (
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    <label>Email</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label>About</label>
                                    <textarea className="form-control" rows="3" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                                    <button className="btn btn-primary mt-2" onClick={handleSaveSettings}>
                                        Save Settings
                                    </button>
                                </div>
                            )}
                            {activeTab === "Create new course" && (
                                <div>
                                    <div className={styles.courseScroll}>
                                        <button className={`btn ${!selectedCourse ? "btn-primary" : "btn-secondary"}`} onClick={handleNewCourseClick}>
                                            New Course
                                        </button>
                                        {user.createdCourses
                                            .reduce((uniqueCourses, course) => {
                                                if (!uniqueCourses.find((c) => c.id === course.id)) {
                                                    uniqueCourses.push(course);
                                                }
                                                return uniqueCourses;
                                            }, [])
                                            .map((course) => (
                                                <button
                                                    key={course.id}
                                                    className={`btn ${
                                                        selectedCourse && selectedCourse.id === course.id ? "btn-primary" : "btn-light"
                                                    }`}
                                                    onClick={() => handleCourseClick(course)}
                                                >
                                                    {course.name}
                                                </button>
                                            ))}
                                    </div>
                                    <div className="form-group">
                                        <label>Course Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={courseName}
                                            onChange={(e) => setCourseName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Course Description</label>
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            value={courseDescription}
                                            onChange={(e) => setCourseDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Course Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={coursePrice}
                                            onChange={(e) => setCoursePrice(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.tagScroll}>
                                        {tags.map((tag) => (
                                            <button
                                                key={tag.id}
                                                className={`btn ${selectedTags.find((t) => t.id === tag.id) ? "btn-primary" : "btn-light"}`}
                                                onClick={() => toggleTag(tag)}
                                            >
                                                {tag.name}
                                            </button>
                                        ))}
                                    </div>
                                    <button className="btn btn-primary mt-2" onClick={handleCourseSubmit}>
                                        {selectedCourse ? "Update Course" : "Create Course"}
                                    </button>
                                    {selectedCourse && (
                                        <div className="mt-4">
                                            <h5>Lessons</h5>
                                            <div className={styles.lessonScroll}>
                                                <button
                                                    className={`btn ${!selectedLesson ? "btn-primary" : "btn-secondary"}`}
                                                    onClick={handleNewLessonClick}
                                                >
                                                    New Lesson
                                                </button>
                                                {lessons
                                                    .reduce((uniqueLessons, lesson) => {
                                                        if (!uniqueLessons.find((l) => l.id === lesson.id)) {
                                                            uniqueLessons.push(lesson);
                                                        }
                                                        return uniqueLessons;
                                                    }, [])
                                                    .map((lesson) => (
                                                        <button
                                                            key={lesson.id}
                                                            className={`btn ${
                                                                selectedLesson && selectedLesson.id === lesson.id ? "btn-primary" : "btn-light"
                                                            }`}
                                                            onClick={() => handleLessonClick(lesson)}
                                                        >
                                                            {lesson.name}
                                                        </button>
                                                    ))}
                                            </div>
                                            <div className="form-group mt-3">
                                                <label>Lesson Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={lessonName}
                                                    onChange={(e) => setLessonName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Lesson Description</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="2"
                                                    value={lessonDescription}
                                                    onChange={(e) => setLessonDescription(e.target.value)}
                                                ></textarea>
                                            </div>
                                            <button className="btn btn-primary mt-2" onClick={handleLessonSubmit}>
                                                {selectedLesson ? "Update Lesson" : "Create Lesson"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    function CourseItem({ name, description, price, imageUrl, onClick, learnedLessonsCount, totalLessonsCount, progressPercentage }) {
        return (
            <div className={styles.courseItem} onClick={onClick}>
                <div className={styles.courseImage} style={{ backgroundImage: `url(${imageUrl})` }}>
                    <div className={styles.courseLike}></div>
                </div>
                <div className={styles.courseName}>{name}</div>
                <div className={styles.courseDescription}>{description}</div>
                <div className={styles.courseProgress}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <div className={styles.progressText}>
                        {learnedLessonsCount}/{totalLessonsCount} lessons learned
                    </div>
                </div>
                <div className={styles.coursePrice}>{`${price}`}</div>
            </div>
        );
    }
}

export default UserPage;

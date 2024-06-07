import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./CoursePreviewPage.module.css";

const dummyCourses = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    name: `Course ${i + 1}`,
    location: `Location ${i + 1}`,
    price: (i + 1) * 10,
    category: ["Development", "Art", "Tech", "Mechanics"][i % 4],
    description: `This is a brief description for Course ${i + 1}`,
    image: `/external/tq_n_gppxizij-y509-1600w.png`, // Placeholder image
    lessons: [
        {
            title: "Introduction to the Course",
            items: [
                { name: "Understanding UI/UX Design Principles", type: "Video", duration: "45 Minutes" },
                { name: "Additional pdf", type: "PDF", duration: null },
                { name: "Introduction Quiz", type: "Quiz", duration: "10 Minutes" },
            ],
        },
        {
            title: "Introduction to UI/UX Design", // Example second lesson
            items: [
                { name: "Understanding UI/UX Design Principles", type: "Video", duration: "45 Minutes" },
                { name: "Wrapping Up What We've Learned", type: "PDF", duration: null },
                { name: "Introduction Quiz", type: "Quiz", duration: "10 Minutes" },
            ],
        },
        // Add more lessons with the same structure as needed
    ],
}));

const CoursePage = (props) => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const course = dummyCourses.find((course) => course.id === parseInt(courseId, 10));

    if (!course) {
        return <div>Course not found.</div>;
    }

    const handleBuyNow = () => {
        alert(`You're about to purchase ${course.name}!`);
    };

    return (
        <div className="course-page-container">
            <Helmet>
                <title>{course.name} - Course Preview</title> {/* Dynamic title using course data */}
                <meta name="description" content={course.description} />
            </Helmet>
            <div className="course-page-course-page">
                <div className="course-page-container01">
                    <span className="course-page-text">
                        <span>{course.name}</span>
                    </span>
                    <span className="course-page-text02">
                        <span>{course.description}</span>
                        <br />
                        <span></span>
                    </span>
                </div>
                <div className="course-page-container02">
                    <button className="course-page-button">
                        <img src="/external/icon2013-ru3b.svg" alt="Icon2013" className="course-page-icon" />
                    </button>
                    <img src={course.image} alt={`${course.name} Image`} className="course-page-image" />
                </div>
                <img src="/external/rectangle92014-vuwt.svg" alt="Rectangle92014" className="course-page-rectangle9" />
                <div className="course-page-container03">
                    {course.lessons.map((lesson, index) => (
                        <div key={index} className="course-page-card">
                            <span className="course-page-text06">
                                <span>{index + 1}</span>
                            </span>
                            <span className="course-page-text08">
                                <span>{lesson.title}</span>
                            </span>
                            <div className="course-page-items-container">
                                {lesson.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="course-page-feature-item">
                                        <div className="course-page-text-container">
                                            <span className="course-page-text10">
                                                <span>{item.name}</span>
                                            </span>
                                            <span className="course-page-text12">
                                                <span>{item.type}</span>
                                            </span>
                                        </div>
                                        <div className="course-page-container04">
                                            <img src="/external/icon2011-rux8.svg" alt="Icon2011" className="course-page-icon1" />
                                            <span className="course-page-text14">
                                                <span>{item.duration || "N/A"}</span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {index !== course.lessons.length - 1 && (
                                <img src="/external/line72013-yvzm.svg" alt="Line72013" className="course-page-line7" />
                            )}
                        </div>
                    ))}
                </div>
                <div className="course-page-group3244">
                    <div className="course-page-group90">
                        <div className="course-page-group4">
                            <span className="course-page-text86" onClick={() => navigate("/")}>
                                <span>Home</span>
                            </span>
                            <span className="course-page-text88" onClick={() => navigate("/courses")}>
                                <span>Courses</span>
                            </span>
                            <span className="course-page-text90">
                                <span>My page</span>
                            </span>
                        </div>
                        <div className="course-page-group6">
                            <img src="/external/rectangle52023-3pgq-200h.png" alt="Rectangle52023" className="course-page-rectangle5" />
                            <span className="course-page-text92">
                                <span>Sign Up</span>
                            </span>
                        </div>
                        <div className="course-page-group7">
                            <img src="/external/rectangle52023-t9mw-200h.png" alt="Rectangle52023" className="course-page-rectangle51" />
                            <span className="course-page-text94">
                                <span>Sign in</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;

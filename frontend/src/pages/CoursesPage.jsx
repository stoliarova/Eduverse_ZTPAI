import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./CoursesPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [tags, setTags] = useState([]);
    const [creators, setCreators] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const [userPurchased, setUserPurchased] = useState([]);
    const [selectedTags, setSelectedTags] = useState({
        DIRECTION: [],
        SPECIFIC: [],
        LOCALIZATION: [],
    });
    const [selectedCreators, setSelectedCreators] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("jwtToken");
    const isLoggedIn = !!token;

    useEffect(() => {
        const fetchUserAndCourses = async () => {
            try {
                const userId = localStorage.getItem("userId");

                const [coursesResponse, userResponse, tagsResponse] = await Promise.all([
                    fetch("http://localhost:8080/api/courses", {
                        headers: { Authorization: `Bearer ${token}` },
                    }).then((res) => res.json()),
                    fetch(`http://localhost:8080/api/users/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }).then((res) => res.json()),
                    fetch("http://localhost:8080/api/tags", {
                        headers: { Authorization: `Bearer ${token}` },
                    }).then((res) => res.json()),
                ]);

                setCourses(coursesResponse);
                setUserCart(userResponse.cartCourses.map((course) => course.id));
                setUserPurchased(userResponse.purchasedCourses.map((course) => course.id));
                setTags(tagsResponse);

                const uniqueCreators = [];
                coursesResponse.forEach((course) => {
                    course.creators.forEach((creator) => {
                        if (!uniqueCreators.some((c) => c.userId === creator.userId)) {
                            uniqueCreators.push(creator);
                        }
                    });
                });
                setCreators(uniqueCreators);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (isLoggedIn) {
            fetchUserAndCourses();
        } else {
            fetch("http://localhost:8080/api/courses")
                .then((res) => res.json())
                .then((data) => {
                    setCourses(data);

                    const uniqueCreators = [];
                    data.forEach((course) => {
                        course.creators.forEach((creator) => {
                            if (!uniqueCreators.some((c) => c.userId === creator.userId)) {
                                uniqueCreators.push(creator);
                            }
                        });
                    });
                    setCreators(uniqueCreators);
                })
                .catch((error) => console.error("Error fetching courses:", error));

            fetch("http://localhost:8080/api/tags")
                .then((res) => res.json())
                .then((data) => setTags(data))
                .catch((error) => console.error("Error fetching tags:", error));
        }
    }, [token, isLoggedIn]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleTagClick = (type, tag) => {
        setSelectedTags((prev) => {
            const isSelected = prev[type].includes(tag);
            return {
                ...prev,
                [type]: isSelected ? prev[type].filter((t) => t !== tag) : [...prev[type], tag],
            };
        });
    };

    const handleCreatorClick = (creator) => {
        setSelectedCreators((prev) => {
            const isSelected = prev.includes(creator);
            return isSelected ? prev.filter((c) => c !== creator) : [...prev, creator];
        });
    };

    const filteredCourses = courses.filter((course) => {
        const matchesQuery = course.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = Object.keys(selectedTags).every(
            (type) => selectedTags[type].length === 0 || selectedTags[type].every((tag) => course.tags.some((courseTag) => courseTag.name === tag))
        );
        const matchesCreators =
            selectedCreators.length === 0 ||
            selectedCreators.every((creator) => course.creators.some((c) => `${c.firstName} ${c.lastName}` === creator));
        return matchesQuery && matchesTags && matchesCreators;
    });

    const handleCourseClick = (courseId) => {
        navigate(`/coursePreview/${courseId}`);
    };

    const handleAddToCart = async (courseId) => {
        try {
            const userId = localStorage.getItem("userId");
            await fetch(`http://localhost:8080/api/user/${userId}/cart/${courseId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserCart((prevCart) => [...prevCart, courseId]);
        } catch (error) {
            console.error("Error adding course to cart:", error);
        }
    };

    const handleRemoveFromCart = async (courseId) => {
        try {
            const userId = localStorage.getItem("userId");
            await fetch(`http://localhost:8080/api/user/${userId}/cart/${courseId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserCart((prevCart) => prevCart.filter((id) => id !== courseId));
        } catch (error) {
            console.error("Error removing course from cart:", error);
        }
    };

    const groupedTags = tags.reduce((acc, tag) => {
        if (!acc[tag.type]) acc[tag.type] = [];
        acc[tag.type].push(tag);
        return acc;
    }, {});

    const countCoursesWithTag = (tag) => {
        return filteredCourses.filter((course) => course.tags.some((courseTag) => courseTag.name === tag)).length;
    };

    const countCoursesWithCreator = (creator) => {
        return filteredCourses.filter((course) => course.creators.some((c) => `${c.firstName} ${c.lastName}` === creator)).length;
    };

    const getCompatibleTags = () => {
        const selectedTagNames = Object.values(selectedTags).flat();
        if (selectedTagNames.length === 0) return tags;

        return tags
            .map((tag) => {
                const isCompatible = selectedTagNames.every((selectedTag) =>
                    filteredCourses.some(
                        (course) =>
                            course.tags.some((courseTag) => courseTag.name === selectedTag) &&
                            course.tags.some((courseTag) => courseTag.name === tag.name)
                    )
                );
                return { ...tag, isCompatible };
            })
            .sort((a, b) => b.isCompatible - a.isCompatible);
    };

    const compatibleTags = getCompatibleTags();

    return (
        <div className={styles.page}>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <div className={styles.leftRoot}>
                            <div className={styles.searchRoot}>
                                <input
                                    className={`form-control ${styles.searchbar}`}
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>

                            <div className={styles.filterRoot}>
                                {Object.keys(groupedTags).map((type) => (
                                    <div key={type} className={styles.filterCategory}>
                                        <div className={styles.filterCategoryTitle}>{type}</div>
                                        <div className={styles.filterCategoryRoot}>
                                            {groupedTags[type]
                                                .sort(
                                                    (a, b) =>
                                                        compatibleTags.find((t) => t.name === b.name)?.isCompatible -
                                                        compatibleTags.find((t) => t.name === a.name)?.isCompatible
                                                )
                                                .map((tag) => {
                                                    const courseCount = countCoursesWithTag(tag.name);
                                                    return (
                                                        <FilterCategoryItem
                                                            key={tag.name}
                                                            categoryName={`${tag.name} (${courseCount})`}
                                                            isSelected={selectedTags[type].includes(tag.name)}
                                                            isCompatible={
                                                                courseCount > 0 && compatibleTags.find((t) => t.name === tag.name)?.isCompatible
                                                            }
                                                            onClick={() => handleTagClick(type, tag.name)}
                                                        />
                                                    );
                                                })}
                                        </div>
                                    </div>
                                ))}
                                <div className={styles.filterCategory}>
                                    <div className={styles.filterCategoryTitle}>Creators</div>
                                    <div className={styles.filterCategoryRoot}>
                                        {creators
                                            .map((creator) => {
                                                const creatorName = `${creator.firstName} ${creator.lastName}`;
                                                const courseCount = countCoursesWithCreator(creatorName);
                                                return {
                                                    creatorName,
                                                    courseCount,
                                                };
                                            })
                                            .sort((a, b) => b.courseCount - a.courseCount)
                                            .map(({ creatorName, courseCount }) => (
                                                <FilterCategoryItem
                                                    key={creatorName}
                                                    categoryName={`${creatorName} (${courseCount})`}
                                                    isSelected={selectedCreators.includes(creatorName)}
                                                    isCompatible={courseCount > 0}
                                                    onClick={() => handleCreatorClick(creatorName)}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className={`${styles.courseListRoot} overflow-auto`}>
                            {filteredCourses.map((course) => (
                                <CourseItem
                                    key={course.id}
                                    {...course}
                                    isPurchased={userPurchased.includes(course.id)}
                                    isInCart={userCart.includes(course.id)}
                                    isLoggedIn={isLoggedIn}
                                    onClick={() => handleCourseClick(course.id)}
                                    onAddToCart={() => handleAddToCart(course.id)}
                                    onRemoveFromCart={() => handleRemoveFromCart(course.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CourseItem({ id, name, price, tags, creators, isPurchased, isInCart, isLoggedIn, onClick, onAddToCart, onRemoveFromCart, imageUrl }) {
    const allTags = tags.map((tag) => tag.name).join(", ");
    const creatorNames = creators.map((creator) => `${creator.firstName} ${creator.lastName}`).join(", ");

    return (
        <div className={`${styles.courseItem} card`} onClick={onClick}>
            <div className={`${styles.courseImage} card-img-top`} style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{`$${price}`}</p>
                <p className="card-text">
                    <strong>Tags:</strong> {allTags}
                </p>
                <p className="card-text">
                    <strong>Creators:</strong> {creatorNames}
                </p>
                {isLoggedIn &&
                    (isPurchased ? (
                        <button className="btn btn-success" disabled>
                            Purchased
                        </button>
                    ) : isInCart ? (
                        <button
                            className="btn btn-danger"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveFromCart(id);
                            }}
                        >
                            Remove from Cart
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(id);
                            }}
                        >
                            Add to Cart
                        </button>
                    ))}
            </div>
        </div>
    );
}

function FilterCategoryItem({ categoryName, isSelected, isCompatible, onClick }) {
    const className = `${styles.FilterCategoryItem} ${isSelected ? styles.selected : ""} ${isCompatible === false ? styles.incompatible : ""}`;
    return (
        <div className={className} onClick={isCompatible !== false ? onClick : null}>
            <input type="checkbox" checked={isSelected} onChange={onClick} className={styles.categoryItemMark} disabled={isCompatible === false} />
            <div className={styles.categoryItemName}>{categoryName}</div>
        </div>
    );
}

export default CoursesPage;

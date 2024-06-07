import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../pages/LandingPage.module.css";

function LandingPage() {
    const [topTags, setTopTags] = useState([]);
    const [popularCreators, setPopularCreators] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTopTags();
        fetchPopularCreators();
    }, []);

    const fetchTopTags = async () => {
        try {
            const tagsResponse = await fetch("http://localhost:8080/api/tags");
            const tags = await tagsResponse.json();

            const coursesResponse = await fetch("http://localhost:8080/api/courses");
            const courses = await coursesResponse.json();

            const tagCount = tags.reduce((acc, tag) => {
                acc[tag.name] = 0;
                courses.forEach((course) => {
                    if (course.tags.some((courseTag) => courseTag.name === tag.name)) {
                        acc[tag.name] += 1;
                    }
                });
                return acc;
            }, {});

            const sortedTags = tags.sort((a, b) => tagCount[b.name] - tagCount[a.name]);
            setTopTags(sortedTags.slice(0, 6));
        } catch (error) {
            console.error("Error fetching top tags:", error);
        }
    };

    const fetchPopularCreators = async () => {
        try {
            const coursesResponse = await fetch("http://localhost:8080/api/courses");
            const courses = await coursesResponse.json();

            const creatorCount = courses.reduce((acc, course) => {
                course.creators.forEach((creator) => {
                    acc[creator.userId] = (acc[creator.userId] || 0) + 1;
                });
                return acc;
            }, {});

            const sortedCreators = Object.entries(creatorCount).sort((a, b) => b[1] - a[1]);
            const topCreators = sortedCreators.slice(0, 6).map(([userId]) => {
                return courses
                    .find((course) => course.creators.some((creator) => creator.userId === parseInt(userId)))
                    .creators.find((creator) => creator.userId === parseInt(userId));
            });

            setPopularCreators(topCreators);
        } catch (error) {
            console.error("Error fetching popular creators:", error);
        }
    };

    const handleExploreClick = () => {
        navigate("/courses");
    };

    const handleCategoryClick = (categoryName) => {
        navigate("/courses", { state: { filter: categoryName } });
    };

    const handleSaleClick = (saleName) => {
        navigate("/courses", { state: { filter: saleName } });
    };

    return (
        <div className={styles.page}>
            <Navbar />

            <div className={styles.searchRoot}>
                <input className={styles.searchbar} type="text" placeholder="What course are you looking for?"></input>
            </div>

            <div className={styles.exploreRoot}>
                <div className={styles.exploreLeft}>
                    <div className={styles.exploreHeader0}>A broad selection of</div>
                    <div className={styles.exploreHeader1}>courses</div>
                    <div className={styles.exploreDescription}>
                        Here you can find any course for any skill that you have ever dreamed to master. There are more than 1,000,000 courses that
                        will fulfill all your needs!
                    </div>
                    <div className={styles.exploreButton} onClick={handleExploreClick}>
                        Explore
                    </div>
                </div>
                <div className={styles.exploreRight}></div>
            </div>

            <div className={styles.categoryRoot}>
                <div className={styles.categoryText}>Top categories</div>
                <div className={styles.categorySeparator}></div>
                <div className={styles.categoryListRoot}>
                    {topTags.map((tag) => (
                        <CategoryItem key={tag.id} categoryName={tag.name} onClick={() => handleCategoryClick(tag.name)} />
                    ))}
                </div>
            </div>

            <div className={styles.saleRoot}>
                <div className={styles.saleTitle}>Saving up your money? Check out courses on sale!</div>
                <div className={styles.saleDescription}>
                    Check the compilation of courses, instructors and categories that offer discounts right now!
                </div>
                <div className={styles.categorySeparator}></div>
                <div className={styles.saleListRoot}>
                    <SaleItem saleName="Spring Sale" onClick={() => handleSaleClick("Spring Sale")} />
                    <SaleItem saleName="Summer Sale" onClick={() => handleSaleClick("Summer Sale")} />
                    <SaleItem saleName="Autumn Sale" onClick={() => handleSaleClick("Autumn Sale")} />
                </div>
            </div>

            <div className={styles.bottomRoot}>
                <div className={styles.popularRoot}>
                    <div className={styles.popularTitle}>Popular Instructors And Organisations</div>
                    <div className={styles.popularSeparator}></div>
                    <div className={styles.popularListRoot}>
                        {popularCreators.map((creator) => (
                            <PopularItem
                                key={creator.userId}
                                popularName={`${creator.firstName} ${creator.lastName}`}
                                onClick={() => handleCategoryClick(creator.firstName)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.trendRoot}>
                    <div className={styles.trendTitle}>Trending Courses</div>
                    <div className={styles.trendSeparator}></div>
                    <div className={styles.trendListRoot}>
                        <TrendItem name="Course 1" by="Author 1" />
                        <TrendItem name="Course 2" by="Author 2" />
                        <TrendItem name="Course 3" by="Author 3" />
                        <TrendItem name="Course 4" by="Author 4" />
                        <TrendItem name="Course 5" by="Author 5" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function TrendItem({ name, by }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/courses", { state: { filter: name } });
    };

    return (
        <div className={styles.trendItem} onClick={handleClick}>
            <div className={styles.trendItemImage}></div>
            <div className={styles.trendItemInfo}>
                <div className={styles.trendItemName}>{name}</div>
                <div className={styles.trendItemBy}>{`By ${by}`}</div>
            </div>
        </div>
    );
}

function PopularItem({ popularName, onClick }) {
    return (
        <span className={styles.popularItem} onClick={onClick}>
            <div className={styles.popularItemBackground}>
                <div className={styles.popularItemText}>{popularName}</div>
            </div>
        </span>
    );
}

function SaleItem({ saleName, onClick }) {
    return (
        <span className={styles.saleItem} onClick={onClick}>
            <div className={styles.saleItemBackground}>
                <div className={styles.saleItemText}>{saleName}</div>
            </div>
        </span>
    );
}

function CategoryItem({ categoryName, onClick }) {
    return (
        <span className={styles.categoryItem} onClick={onClick}>
            <div className={styles.categoryItemImage}></div>
            <div className={styles.categoryItemName}>{categoryName}</div>
        </span>
    );
}

export default LandingPage;

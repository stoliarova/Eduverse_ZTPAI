import Navbar from "../components/Navbar";
import styles from "../pages/CoursesPage.module.css";

function CoursesPage() {
    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.contentRoot}>
                <div className={styles.leftRoot}>
                    <div className={styles.searchRoot}>
                        <input className={styles.searchbar} type="text" placeholder="Search..."></input>
                    </div>

                    <div className={styles.filterRoot}>
                        <div className={styles.filterClear}>Clear all</div>
                        <div className={styles.filterCategoryTitle}>Categories</div>
                        <div className={styles.filterCategoryRoot}>
                            <FilterCategoryItem categoryName="Development" />
                            <FilterCategoryItem categoryName="Art" />
                            <FilterCategoryItem categoryName="Tech" />
                            <FilterCategoryItem categoryName="Mechanics" />
                        </div>
                        <div className={styles.filterApply}>Find Course</div>
                    </div>
                </div>

                <div className={styles.rightRoot}>
                    <div className={styles.sortRoot}>
                        <span className={styles.ShowCount}>Show all products (99)</span>
                        <span className={styles.sortTitle}>Sort by:</span>
                        <span className={styles.sortType}>Bestselling</span>
                    </div>

                    <div className={styles.courseListRoot}>
                        <CourseItem name="Course 1" location="Location 1" price="1" />
                        <CourseItem name="Course 2" location="Location 2" price="2" />
                        <CourseItem name="Course 3" location="Location 3" price="3" />
                        <CourseItem name="Course 4" location="Location 4" price="4" />
                        <CourseItem name="Course 5" location="Location 5" price="5" />
                        <CourseItem name="Course 6" location="Location 6" price="6" />
                        <CourseItem name="Course 7" location="Location 7" price="7" />
                        <CourseItem name="Course 8" location="Location 8" price="8" />
                        <CourseItem name="Course 9" location="Location 9" price="19" />
                        <CourseItem name="Course 10" location="Location 10" price="10" />
                        <CourseItem name="Course 11" location="Location 11" price="11" />
                        <CourseItem name="Course 12" location="Location 12" price="12" />
                        <CourseItem name="Course 13" location="Location 13" price="13" />
                        <CourseItem name="Course 14" location="Location 14" price="14" />
                        <CourseItem name="Course 15" location="Location 15" price="15" />
                        <CourseItem name="Course 16" location="Location 16" price="16" />
                        <CourseItem name="Course 17" location="Location 17" price="17" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function CourseItem({ name, location, price }) {
    return (
        <div className={styles.courseItem}>
            <div className={styles.courseImage}>
                <div className={styles.courseLike}></div>
            </div>

            <div className={styles.courseName}>{name}</div>
            <div className={styles.courseLocationRoot}>
                <span className={styles.courseLocationIcon}></span>
                <span className={styles.courseLocationName}>{location}</span>
            </div>
            <div className={styles.coursePrice}>{`$${price}`}</div>
        </div>
    );
}

function FilterCategoryItem({ categoryName }) {
    return (
        <div className={styles.FilterCategoryItem}>
            <div className={styles.categoryItemMark}></div>
            <div className={styles.categoryItemName}>{categoryName}</div>
        </div>
    );
}

export default CoursesPage;

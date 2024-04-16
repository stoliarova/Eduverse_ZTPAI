import Navbar from "../components/Navbar";
import styles from "./UserPage.module.css";

function UserPage() {
    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.userInfoRoot}>
                <span className={styles.userImage}></span>
                <span className={styles.userInfo}>
                    <div className={styles.userName}>Name</div>
                    <div className={styles.userOccupation}>Occupation/Organization</div>
                    <div className={styles.userDescription}>
                        This is a placeholder for various user-defined descriptions related to any topic that used desided to share with others.
                    </div>
                </span>
            </div>

            <div className={styles.courseSelectionRoot}>
                <span className={styles.coursesAll}>All courses</span>
                <span className={styles.coursesSeparator}></span>
                <span className={styles.coursesMyList}>My list</span>
                <span className={styles.coursesSeparator}></span>
                <span className={styles.coursesWishList}>Wishlist</span>
                <span className={styles.coursesSeparator}></span>
                <span className={styles.coursesAll}>All courses</span>
                <span className={styles.coursesSeparator}></span>
                <span className={styles.coursesArchived}>Archived</span>
                <span className={styles.coursesSeparator}></span>
                <span className={styles.coursesMyNotes}>My notes</span>
                <span className={styles.coursesSeparator}></span>
                <span className={styles.coursesSettings}>Settings</span>
                <span className={styles.coursesSeparator}></span>
                <span className={styles.coursesCreate}>Create a new course</span>
            </div>

            <div className={styles.courseListRoot}>
                <CourseItem name="Course 1" location="Location 1" price="Purchased" />
                <CourseItem name="Course 2" location="Location 2" price="Purchased" />
                <CourseItem name="Course 3" location="Location 3" price="Purchased" />
            </div>
        </div>
    );

    function CourseItem({ name, location, price }) {
        return (
            <span className={styles.courseItem}>
                <div className={styles.courseImage}>
                    <div className={styles.courseLike}></div>
                </div>

                <div className={styles.courseName}>{name}</div>
                <div className={styles.courseLocationRoot}>
                    <span className={styles.courseLocationIcon}></span>
                    <span className={styles.courseLocationName}>{location}</span>
                </div>
                <div className={styles.coursePrice}>{`${price}`}</div>
            </span>
        );
    }
}

export default UserPage;

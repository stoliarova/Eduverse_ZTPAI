import { React, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../pages/LandingPage.module.css";

function LandingPage() {
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
                        will fullfill all your needs!
                    </div>
                    <div className={styles.exploreButton}>Explore</div>
                </div>
                <div className={styles.exploreRight}></div>
            </div>

            <div className={styles.categoryRoot}>
                <div className={styles.categoryText}>Top categories</div>
                <div className={styles.categorySeparator}></div>
                <div className={styles.categoryListRoot}>
                    <CategoryItem categoryName="Development" />
                    <CategoryItem categoryName="Sports" />
                    <CategoryItem categoryName="Art" />
                    <CategoryItem categoryName="Music" />
                    <CategoryItem categoryName="Tech" />
                    <CategoryItem categoryName="Support" />
                </div>
            </div>

            <div className={styles.saleRoot}>
                <div className={styles.saleTitle}>Saving up your money? Check out courses on sale!</div>
                <div className={styles.saleDescription}>
                    Check the compilation of courses, instructors and categories that offer discounts right now!
                </div>
                <div className={styles.categorySeparator}></div>
                <div className={styles.saleListRoot}>
                    <SaleItem saleName="Spring Sale" />
                    <SaleItem saleName="Summer Sale" />
                    <SaleItem saleName="Autumn Sale" />
                </div>
            </div>

            <div className={styles.bottomRoot}>
                <div className={styles.popularRoot}>
                    <div className={styles.popularTitle}>Popular Instructors And Organisations</div>
                    <div className={styles.popularSeparator}></div>
                    <div className={styles.popularListRoot}>
                        <PopularItem popularName="Good Course 1" />
                        <PopularItem popularName="Good Instructor 1" />
                        <PopularItem popularName="Good Course 2" />
                        <PopularItem popularName="Good Instructor 2" />
                        <PopularItem popularName="Good Course 3" />
                        <PopularItem popularName="Good Instructor 3" />
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
    return (
        <div className={styles.trendItem}>
            <div className={styles.trendItemImage}></div>
            <div className={styles.trendItemInfo}>
                <div className={styles.trendItemName}>{name}</div>
                <div className={styles.trendItemBy}>{`By ${by}`}</div>
            </div>
        </div>
    );
}

function PopularItem({ popularName }) {
    return (
        <span className={styles.popularItem}>
            <div className={styles.popularItemBackground}>
                <div className={styles.popularItemText}>{popularName}</div>
            </div>
        </span>
    );
}

function SaleItem({ saleName }) {
    return (
        <span className={styles.saleItem}>
            <div className={styles.saleItemBackground}>
                <div className={styles.saleItemText}>{saleName}</div>
            </div>
        </span>
    );
}

function CategoryItem({ categoryName }) {
    return (
        <span className={styles.categoryItem}>
            <div className={styles.categoryItemImage}></div>
            <div className={styles.categoryItemName}>{categoryName}</div>
        </span>
    );
}

export default LandingPage;

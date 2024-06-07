import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ShoppingCartPage() {
    const [cartCourses, setCartCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCartCourses = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const token = localStorage.getItem("jwtToken");
                const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.cartCourses) {
                    setCartCourses(response.data.cartCourses);
                }
            } catch (error) {
                console.error("Error fetching cart courses:", error);
            }
        };

        fetchCartCourses();
    }, []);

    const handleRemoveFromCart = async (courseId) => {
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("jwtToken");
            await axios.delete(`http://localhost:8080/api/user/${userId}/cart/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCartCourses(cartCourses.filter((course) => course.id !== courseId));
            setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
        } catch (error) {
            console.error("Error removing course from cart:", error);
        }
    };

    const handlePurchase = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("jwtToken");
            await axios.post(`http://localhost:8080/api/user/${userId}/purchaseSpecific`, selectedCourses, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setCartCourses(cartCourses.filter((course) => !selectedCourses.includes(course.id)));
            setSelectedCourses([]);
        } catch (error) {
            console.error("Error purchasing courses:", error);
        }
    };

    const handleSelectCourse = (courseId) => {
        setSelectedCourses((prevSelected) => {
            if (prevSelected.includes(courseId)) {
                return prevSelected.filter((id) => id !== courseId);
            } else {
                return [...prevSelected, courseId];
            }
        });
    };

    useEffect(() => {
        const total = cartCourses.filter((course) => selectedCourses.includes(course.id)).reduce((sum, course) => sum + course.price, 0);
        setTotalPrice(total);
    }, [selectedCourses, cartCourses]);

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h2>Shopping Cart</h2>
                <ul className="list-group">
                    {cartCourses.map((course) => (
                        <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <input type="checkbox" checked={selectedCourses.includes(course.id)} onChange={() => handleSelectCourse(course.id)} />
                                <span className="ms-2">{course.name}</span>
                                <span className="ms-2">${course.price}</span>
                            </div>
                            <button className="btn btn-danger" onClick={() => handleRemoveFromCart(course.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="mt-3">
                    <h4>Total Price: ${totalPrice}</h4>
                    <button className="btn btn-success" onClick={handlePurchase} disabled={selectedCourses.length === 0}>
                        Purchase
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCartPage;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import CoursePreviewPage from "./pages/CoursePreviewPage";
import CoursesPage from "./pages/CoursesPage";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import UserPage from "./pages/UserPage";
import SignUpPage from "./pages/SignUpPage";
import PageNotFound from "./pages/PageNotFound";
import ShoppingCartPage from "./pages/ShoppingCartPage"; // Import the ShoppingCartPage

import globalCSS from "./css/global.css";
import AdminPage from "./pages/AdminPage";
import CoursePage from "./pages/CoursePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="user" element={<UserPage />} />
                <Route path="admin" element={<AdminPage />} />
                <Route path="signIn" element={<SignInPage />} />
                <Route path="signUp" element={<SignUpPage />} />
                <Route path="coursePreview/:courseId" element={<CoursePreviewPage />} />
                <Route path="cart" element={<ShoppingCartPage />} /> // Add this route
                <Route path="*" element={<PageNotFound />} />
                <Route path="/course/:courseId" element={<CoursePage />} /> {/* Add this line */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;

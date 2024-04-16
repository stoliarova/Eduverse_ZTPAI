import { BrowserRouter, Routes, Route } from "react-router-dom";

import CoursePreviewPage from "./pages/CoursePreviewPage";
import CoursesPage from "./pages/CoursesPage";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import UserPage from "./pages/UserPage";
import SignUpPage from "./pages/SignUpPage";
import PageNotFound from "./pages/PageNotFound";

import globalCSS from "./css/global.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="user" element={<UserPage />} />
                <Route path="signIn" element={<SignInPage />} />
                <Route path="signUp" element={<SignUpPage />} />
                <Route path="coursePreview" element={<CoursePreviewPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

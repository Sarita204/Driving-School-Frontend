import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import BookingHistory from "./Components/OrderDetails";
import Dashboard from "./Components/Admin/Dashboard";
import Main from "./Components/Admin/Main";
import AdminHomeSlider from "./Components/Admin/AdminHomeSlider";
import AdminCategories from "./Components/Admin/AdminCategories";
import AdminTestimonials from "./Components/Admin/AdminTestimonials";
import AdminAboutus from "./Components/Admin/AdminAboutus";
import AdminContactus from "./Components/Admin/AdminContactus";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminUserlist from "./Components/Admin/AdminUserlist";
import GeneralEnquiry from "./Components/Admin/GeneralEnquiry";
import CategoryEnquiry from "./Components/Admin/CategoryEnquiry";
import AdminBookings from "./Components/Admin/AdminBookings";
import AdminRatings from "./Components/Admin/AdminRatings";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/aboutus"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Header />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Header />
              <Profile />
              <Footer />
            </>
          }
        />

        <Route
          path="/orderdetails"
          element={
            <>
              <Header />
              <BookingHistory />
              <Footer />
            </>
          }
        />

        {/* Admin panel  */}

        <Route
          path="/admin"
          element={
            <>
              <AdminLogin />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Main
              children={
                <>
                  <Dashboard />
                </>
              }
            />
          }
        />

        <Route
          path="/adminhomeslider"
          element={
            <Main
              children={
                <>
                  <AdminHomeSlider />
                </>
              }
            />
          }
        />

        <Route
          path="/homecategories"
          element={
            <Main
              children={
                <>
                  <AdminCategories />
                </>
              }
            />
          }
        />
        <Route
          path="/testimonials"
          element={
            <Main
              children={
                <>
                  <AdminTestimonials />
                </>
              }
            />
          }
        />

        <Route
          path="/adminaboutus"
          element={
            <Main
              children={
                <>
                  <AdminAboutus />
                </>
              }
            />
          }
        />
        <Route
          path="/admincontactus"
          element={
            <Main
              children={
                <>
                  <AdminContactus />
                </>
              }
            />
          }
        />

        <Route
          path="/userlist"
          element={
            <Main
              children={
                <>
                  <AdminUserlist />
                </>
              }
            />
          }
        />
        <Route
          path="/bookings"
          element={
            <Main
              children={
                <>
                  <AdminBookings />
                </>
              }
            />
          }
        />
        <Route
          path="/generalenquiry"
          element={
            <Main
              children={
                <>
                  <GeneralEnquiry />
                </>
              }
            />
          }
        />

        <Route
          path="/categoryenquiry"
          element={
            <Main
              children={
                <>
                  <CategoryEnquiry />
                </>
              }
            />
          }
        />

        <Route
          path="/ratings"
          element={
            <Main
              children={
                <>
                  <AdminRatings />
                </>
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

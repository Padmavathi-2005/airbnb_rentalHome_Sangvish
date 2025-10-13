// App.jsx
import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./Store";
import { AuthProvider, useAuth } from "./AuthContext";
import { UIProvider, useUI } from "./context/UIContext";

import Footer from "./components/Footer";
// Pages
import Home from "./pages/Home";
import RentalHome from "./rentalhome/pages/RentalHome";
import SinglePage from "./rentalhome/pages/SinglePage";
import SearchPage from "./rentalhome/pages/SearchPage";
import Booking from "./rentalhome/pages/Booking";
import LoginPage from "./LoginPage";
import SignupPage from "./SignUpPage";
import Profile from "./rentalhome/components/user-dashboard/Profile";
import DashBoard from "./rentalhome/components/user-dashboard/DashBoard";
import Account from "./rentalhome/components/user-dashboard/Account";
import Messages from "./rentalhome/components/user-dashboard/Messages";
import Trips from "./rentalhome/components/user-dashboard/Trips";
import WishList from "./rentalhome/components/user-dashboard/WishList";
import AddSpace from "./rentalhome/components/user-dashboard/AddSpace";
import AddExperience from "./rentalhome/components/user-dashboard/AddExperience";
import ManageListing from "./rentalhome/components/user-dashboard/ManageListing";
import ManageBooking from "./rentalhome/components/user-dashboard/ManageBooking";
import Basics from "./rentalhome/components/user-dashboard/add-property/Basics";
import Contact from "./rentalhome/pages/Contact";
import AboutUs from "./rentalhome/pages/AboutUs";
import LanguageCurrencyModal from "./rentalhome/components/LanguageCurrencyModel";
import { Navbar } from "react-chat-elements";
import ScrollToTop from "./rentalhome/ScrollToTop";

// 🔒 Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" replace />;
};

function AppContent() {

  const [version, setVersion] = useState(() => {
    const activePage = localStorage.getItem("RentalHome");
    return activePage !== null ? activePage : "AirBnb";
  });

  const { isLangModalOpen, closeLangModal } = useUI();

  useEffect(() => {
    if (version) localStorage.setItem("RentalHome", version);
  }, [version]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${isLangModalOpen ? "blur-sm pointer-events-none" : ""
          }`}
      >
        <Routes>
          {/* Conditional Home Routes */}
          {version === "AirBnb" ? (
            <Route path="/" element={<Home />} />
          ) : (
            <>
              <Route path="/" element={<RentalHome />} />
              <Route path="/property/:id/:slug" element={<SinglePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </>
          )}

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <Trips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-space"
            element={
              <ProtectedRoute>
                <AddSpace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-experience"
            element={
              <ProtectedRoute>
                <AddExperience />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-listing"
            element={
              <ProtectedRoute>
                <ManageListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-booking"
            element={
              <ProtectedRoute>
                <ManageBooking />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/basics" element={<Basics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>

        {/* Footer */}
        <Footer Setversion={setVersion} version={version} />
      </div>

      {/* Language & Currency Modal */}
      {isLangModalOpen && (
        <>
          {/* Overlay with gray blur */}
          <div className="fixed inset-0 bg-gray-700/50 backdrop-blur-sm z-40"></div>

          {/* Modal container remains same */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">

            <LanguageCurrencyModal onClose={closeLangModal} />
          </div>
        </>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ScrollToTop />
            <AppContent />
          </PersistGate>
        </Provider>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;

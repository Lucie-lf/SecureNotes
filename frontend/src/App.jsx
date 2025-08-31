import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import VerificationEmailPage from "./pages/VerificationEmailPage"
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";


const ProtectedRoute=({ children }) => {
  const {isAuthenticated, user} = useAuthStore();

  if(!isAuthenticated || !user) {
    return <Navigate to="/login" replace/>
  }
  if (!user.isEmailVerified) {
    return <Navigate to="/verify-email" replace/>
  }
  return children;
}

const AuthenticationUserRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

console.log("AuthenticationUserRoute - isAuthenticated:", isAuthenticated);
  console.log("AuthenticationUserRoute - user:", user);
  console.log("AuthenticationUserRoute - isEmailVerified:", user?.isEmailVerified);

   if(isAuthenticated && user) {
    if(user.isEmailVerified) {
      console.log("Redirecting to dashboard");
      return <Navigate to="/dashboard" replace/>
    } else {
      console.log("Redirecting to verify-email");
      return <Navigate to="/verify-email" replace/>
    }
  }
  return children;
}

function App() {
  const {isCheckingAuth, checkAuth, user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(user);
  console.log(isAuthenticated);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<AuthenticationUserRoute><SignUpPage /></AuthenticationUserRoute>} />
        <Route path="/login" element={<AuthenticationUserRoute><LoginPage /></AuthenticationUserRoute>} />
        <Route path="/verify-email" element={<VerificationEmailPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      </Routes>
      
    </div>
  )
}

export default App
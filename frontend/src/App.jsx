import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import { VerificationEmailPage } from "./pages/VerificationEmailPage"
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";


const ProtectedRoute=({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if(!isAuthenticated && !user) {
    return <Navigate to="/login" replace/>
  }
  return children;
}

const AuthenticatedUserRoute = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();
   if(isAuthenticated && user) {
    return <Navigate to="/dashboard" replace/>
  }
  return children;
}


function App() {
  const { isCheckingAuth, checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(user);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage/>} 
        />
        <Route 
          path="/signup" 
          element={
            <AuthenticatedUserRoute>
              <SignUpPage />
            </AuthenticatedUserRoute>
          } 
        />

        <Route 
          path="/login" 
          element={
            <AuthenticatedUserRoute>
              <LoginPage />
            </AuthenticatedUserRoute>
          } 
        />

        <Route 
          path="/verify-email" 
          element={<VerificationEmailPage />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
      
    </div>
  )
}

export default App
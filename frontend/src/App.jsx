import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import './output.css';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  const isAuthenticated = !!localStorage.getItem("ACCESS_TOKEN");
  const isAdmin = localStorage.getItem("is_staff") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Admin Route (Protected for Admin Users) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated && isAdmin}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

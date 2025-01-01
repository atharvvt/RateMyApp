import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import { Loader2 } from 'lucide-react';

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            // Include isAdmin for registration only
            const data = method === "register" 
                ? { username, password, is_staff: isAdmin } 
                : { username, password };

            const res = await api.post(route, data);

            if (method === "login") {
                // Store tokens and user info
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                sessionStorage.setItem('is_staff',res.data.is_staff)
                sessionStorage.setItem("username", res.data.username);

        
                console.log(res.data)
                // Redirect based on is_staff status
                if (res.data.is_staff === true) {
                    navigate("/admin"); // Admin dashboard route
                } else if(res.data.is_staff === false){
                    navigate("/"); // User dashboard route
                }
            
            }
            else{
                navigate("/login");
                alert("Register Successfully")
            }
            
        } catch (error) {
            // More detailed error handling
            let errorMessage = "An error occurred";
            if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            } else if (error.message) {
                errorMessage = error.message;
            }
            alert("network error or user exist already ");
        } finally {
            setLoading(false);
        }
    };

    // Helper function to render the form link
    const renderFormLink = () => {
        if (method === "login") {
            return (
                <span onClick={() => navigate("/register")}>
                    New user? Register here.
                </span>
            );
        }
        return (
            <span onClick={() => navigate("/login")}>
                Already a user? Login here.
            </span>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            
            {method === "register" && (
                <div className="form-input">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={() => setIsAdmin(!isAdmin)}
                        />
                        <span>Register as Admin</span>
                    </label>
                </div>
            )}

            {loading && <LoadingIndicator />}
            
            <button 
                className="form-button" 
                type="submit"
                disabled={loading}
            >
                {loading ? "Processing..." : name}
            </button>

            <p className="form-link">
                {renderFormLink()}
            </p>
        </form>
    );
}

export default Form;
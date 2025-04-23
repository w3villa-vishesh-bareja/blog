import React, { use, useState } from "react";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/v1/users/login", { email, userPassword });
            const { token } = response.data.data[0];
            if (token) {
                localStorage.setItem("token", token);
                alert("Login successful!");
                navigate("/home");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-500">Please sign in to continue</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">
                                Password
                            </label>
                            <input
                                type="password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="text-center">
                        <span className="text-gray-500 text-sm">
                            Don't have an account?{" "}
                            <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                Create Account
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Successfully signed in!");
        // Store token or user data in localStorage if needed
 localStorage.setItem("user", JSON.stringify({ email: data.user.email }));
  // Optionally save token too
  localStorage.setItem("token", data.token);
  window.dispatchEvent(new Event("user-login"));
        navigate("/");
      } else {
        throw new Error(data.message || "Failed to sign in");
      }
    } catch (error) {
      alert(error.message || "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
     
      <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center p-4 bg-mindwell-cream">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-mindwell-dark">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Sign in to continue your mental wellness journey</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-mindwell-coral hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-[#FF6B6B] text-white rounded hover:bg-mindwell-coral/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mindwell-coral"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-mindwell-coral hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
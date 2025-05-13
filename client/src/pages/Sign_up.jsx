import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
       alert("Account created successfully!");
        navigate("/sign-in");
      } else {
        throw new Error(data.message || "Failed to create account");
      }
    } catch (error) {
       alert(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
      <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center p-4 bg-mindwell-cream">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-mindwell-dark">Create Account</h1>
            <p className="text-gray-500 mt-2">Begin your mental wellness journey today</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
               <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                   className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
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
               <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                   className="w-full p-2 border border-gray-300 rounded"
                />
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>
              
        <button 
                type="submit" 
                 className="w-full py-2 px-4 bg-[#FF6B6B] text-white rounded hover:bg-mindwell-coral/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mindwell-coral"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/signin" className="text-mindwell-coral hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
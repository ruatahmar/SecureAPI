import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from "../api/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/register'); 
  };
  const handleLogin = async (e) => {
    
    e.preventDefault(); 
    try {
        console.log(JSON.stringify({ email, password }))
        const response = await login({ email, password })
        console.log('Login successful:', response.data);
        navigate('/dashboard');
    } catch (error) {
        const message = error.response?.data?.message || "Registration failed";
        console.error('Error logging in:', message);
        alert('Something went wrong. Please try again.', message);
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80 flex flex-col gap-4"
      >
        <h1 className="text-xl font-semibold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Login
        </button>
        <button
          onClick={handleRedirect }
          className="bg-purple-600 text-white py-2 m rounded hover:bg-purple-700"
        >
          Register
        </button>
      </form>
      
    </div>
  );
}
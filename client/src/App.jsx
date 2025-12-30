import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.pages";
import Register from "./pages/register.pages";
import Dashboard from "./pages/dashboard.pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

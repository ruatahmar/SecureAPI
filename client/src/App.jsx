import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.pages";
import Register from "./pages/register.pages";
import Dashboard from "./pages/dashboard.pages";
import { AuthProvider } from "./auth/AuthContext";
import RootRedirect from "./routes/rootRedirect";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            {/* Public */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter >
    </>
  )
}

export default App

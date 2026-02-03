import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.pages";
import Register from "./pages/register.pages";
import Dashboard from "./pages/dashboard.pages";
import { AuthProvider } from "./auth/AuthContext";
import RootRedirect from "./routes/rootRedirect";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";
import RoleProtectedRoute from "./routes/RoleProtectedRoutes";
// import AdminDashboard from "./pages/adminDashboard.pages";

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
            {/* Admin only */}
            <Route element={<ProtectedRoute />}>
              <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<Dashboard />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter >
    </>
  )
}

export default App

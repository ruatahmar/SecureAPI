import { useAuth } from "../auth/useAuth"
import { Navigate, Outlet } from "react-router-dom"

export default function RoleProtectedRoute({ allowedRoles }) {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    // Check if user exists and has one of the allowed roles
    if (user && allowedRoles.includes(user.role)) {
        return <Outlet />
    }

    // Redirect to dashboard if they try to access admin-only route as regular user
    return <Navigate to="/dashboard" replace />
}

import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../auth/useAuth"

export default function PublicRoute() {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    return user ? user.role === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace /> : <Outlet />
}
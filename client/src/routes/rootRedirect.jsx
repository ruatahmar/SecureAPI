
import { Navigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"

export default function RootRedirect() {
    const { user, loading } = useAuth

    if (loading) return null

    return user
        ? user.role === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />
        : <Navigate to="/login" replace />
}
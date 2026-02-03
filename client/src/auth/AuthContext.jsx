
import { useEffect, useState, useRef } from "react"
import { refreshToken, logout as logoutApi } from "../api/auth"
import { AuthContext } from "./useAuth"


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const didRun = useRef(false)
  useEffect(() => {
    if (didRun.current) return
    didRun.current = true
    const initAuth = async () => {
      try {
        const res = await refreshToken()
        setUser(res.data.data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const logout = async () => {
    await logoutApi()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
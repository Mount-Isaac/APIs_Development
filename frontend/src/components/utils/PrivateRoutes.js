import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import AuthContext from "./AuthProvider"

const PrivateRoutes = () => {
    const {user} = useContext(AuthContext)

    return (
        user.email ? <Outlet/> : <Navigate to="/api/auth/login"/>
    )
}

export default PrivateRoutes
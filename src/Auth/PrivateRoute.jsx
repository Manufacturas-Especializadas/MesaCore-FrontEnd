import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, requireRole }) => {
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to="/"/>
    }

    try{
        const decoded = jwtDecode(token);
        const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (!requireRole || requireRole.length === 0) {
            return children;
        }
    
        if (!Array.isArray(requireRole) || !requireRole.includes(userRole)) {
            return <Navigate to="/home" />;
        }

        return children;
    }catch(error){
        console.log(`Token invalido: ${error}`);
        return <Navigate to="/"/>
    }

    return children;
}

export default PrivateRoute
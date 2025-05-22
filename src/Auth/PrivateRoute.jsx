import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const PrivateRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const[snackbarMessage, setSnackMessage] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if(!token){
        return <Navigate to="/login"/>
    }

    try{
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if(decoded.exp < currentTime){
            localStorage.removeItem("token");
            return <Navigate to="/login"/>
        }

        const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

        if(roles.length && !roles.includes(userRole)){
            setSnackMessage("No tienes permisos para acceder a esta ruta");
            setOpenSnackbar(true);

            return <Navigate to="/"/>
        }

        return(
            <>
                <Outlet/>
                <Snackbar
                    open={ openSnackbar }
                    autoHideDuration={ 3000 }
                    onClose={ handleCloseSnackbar }
                >
                    <Alert
                        severity="warning"
                        sx={{
                            width: '100%'
                        }}
                        onClose={ handleCloseSnackbar }
                    >
                        { snackbarMessage }
                    </Alert>
                </Snackbar>
            </>
        )
    }catch(error){
        localStorage.removeItem("token");
        
        return <Navigate to="/login"/>
    }
}

export default PrivateRoute
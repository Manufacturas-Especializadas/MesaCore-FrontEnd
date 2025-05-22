import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user , setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            try{
                const decoded = jwtDecode(token);
                const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
                const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                setUser({ email, role });
                setIsAuthenticated(true);
            }catch(error){
                console.error("Token invalido: ", error);
                localStorage.removeItem("token");
            }
        }
    }, []);


    const login = (token) => {
        try{
            localStorage.setItem("token", token);
            const decoded = jwtDecode(token);
            const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            setUser({ email, role });
            setIsAuthenticated(true);
        }catch(error){
            console.error("Token invalido: ", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user , login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
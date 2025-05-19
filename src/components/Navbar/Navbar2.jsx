import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar2 = ({ toggleSidebar }) => {
    const[userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserEmail(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress" || ""]);
            }catch(error){
                console.error(`Token invalido: ${ error }`);
            }
        }
    }, []);

    return (
        <>
            <nav className="nav">
                <div className="nav__left">
                    <RxHamburgerMenu
                        className="nav__icon"
                        onClick={ toggleSidebar }
                    />
                </div>
                <div className="nav__center">
                    <h2 className="nav__title">
                        MESA - FX
                    </h2>
                </div>
            
                <div className="nav__right">
                    <p className="nav__email">
                        { userEmail }
                    </p>
                </div>
            </nav>
        </>
    )
}

export default Navbar2
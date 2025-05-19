import { useState } from "react"
import { siderbarData } from "../../data/siderBarData";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar2 = ({ isMobileOpen = false }) => {
    const[isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () =>{
        if(window.innerWidth <= 768){
            setIsOpen(!isOpen);
        }else{
            setIsOpen(!isOpen);
        }
    };

    const handleNavigate = (path) =>{
        navigate(path);
    };

    const handleLogout = () =>{
        localStorage.removeItem("token");
        handleNavigate("/")
    };

    return (
        <>
            <aside className={`sidebar ${ isOpen ? 'open' : 'collapsed' } ${ isMobileOpen ? "mobile-open" : "" }`}>
                <button className="toggle__btn" onClick={ toggleSidebar }>
                    {isOpen ? '<<' : '>>'}
                </button>

                <ul className="menu">
                    {
                        siderbarData.map((item, index) => (
                            <Link key={ index } to={ item.path } className="menu__link">
                                <li className="menu__item">
                                    <span className="menu__icon">
                                        { item.icon }
                                    </span>
                                    <span className="menu__title">
                                        { item.name }
                                    </span>
                                </li>
                            </Link>
                        ))
                    }

                    <li className="menu__item menu__item--logut"
                        onClick={ handleLogout }
                    >
                        <span className="menu__icon">
                            <IoLogOutOutline/>
                        </span>
                        <span className="menu__title">
                            Cerrar sesión
                        </span>
                    </li>
                </ul>
            </aside>    
        </>
    )
}

export default Sidebar2
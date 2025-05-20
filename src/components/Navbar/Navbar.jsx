import { 
    AppBar, 
    Menu, 
    IconButton, 
    MenuItem, 
    Toolbar, 
    Typography, 
} from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Navbar = ({ handleDrawerOpen }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    }

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        handleNavigate("/");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            try{
                const decoded = jwtDecode(token);
                setUserEmail(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "");
                setUserRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "")
            }catch(error){
                console.error(`Token invalido: ${error}`);
            }
        }
    }, []);
    
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={ handleDrawerOpen }
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        MESA - FX
                    </Typography>

                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={ handleMenu }
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={ anchorEl }
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={ Boolean( anchorEl )}
                                onClose={ handleClose }
                            >
                                <MenuItem disabled>
                                    { userEmail }
                                </MenuItem>
                                <MenuItem disabled>
                                    <strong style={{ marginLeft: '5px' }}> { userRole } </strong>
                                </MenuItem>
                                <MenuItem onClick={ handleLogout }> Cerrar sesión </MenuItem>
                            </Menu>
                        </div>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    )
}

export default Navbar
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
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ handleDrawerOpen }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, logout } = useAuth();
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
        logout();
        handleNavigate("/login");
    };
    
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
                                    { user?.email }
                                </MenuItem>
                                <MenuItem disabled>
                                    <strong style={{ marginLeft: '5px' }}> 
                                        { user?.role } 
                                    </strong>
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
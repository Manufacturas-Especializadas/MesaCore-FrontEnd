import { AppBar, Box, Menu, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = ({ handleDrawerOpen }) => {
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (e) =>{
        setAnchorEl(e.target.checked);
    };

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
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
                        {
                            auth && (
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
                                        <MenuItem onClick={ handleClose }>Profile</MenuItem>
                                        <MenuItem onClick={ handleClose }>My account</MenuItem>
                                    </Menu>
                                </div>
                            )
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar
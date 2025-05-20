import { Divider, Drawer, IconButton, List, styled, useMediaQuery, useTheme } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { siderbarData } from "../../data/siderBarData";
import ListItemLink from "./ListItemLink";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
}));

const Sidebar3 = ({ open, onClose, mobileOpen, handleDrawerToggle }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const drawerWidth = {
        sm: 60,
        md: 240
    };

    return (
        <>
            <Drawer
                variant={ isMobile ? "temporary" : "permanent" }
                anchor="left"
                open={ isMobile ? mobileOpen : open }
                onClose={ isMobile ? handleDrawerToggle : undefined }
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    width: isMobile ? 'auto' : { sm: open ? drawerWidth.md : drawerWidth.sm },
                    flexShrink: 0,
                    '& .MuiDrawer-paper':{
                        width: isMobile
                        ? 240
                        : {
                            sm: open ? drawerWidth.md : drawerWidth.sm,
                            md: open ? drawerWidth.md : drawerWidth.sm
                        },
                        top: isMobile ? '56px' : '64px',
                        height: isMobile
                            ? 'calc(100% - 56px)'
                            : 'calc(100% - 64px)',
                        transition: 'width 0.3s ease',
                        overflowX: 'hidden',
                        whiteSpace: 'nowrap',
                        boxSizing: 'border-box',
                        zIndex: isMobile ? 1200 : 'auto'
                    }                    
                }}
            >            

                <Divider/>

                <List>
                    {
                        siderbarData.map((item, index) => (
                            <ListItemLink
                                key={ index }
                                to={ item.path }
                                primary={ item.name }
                                icon={ item.icon }
                                open={ isMobile ? false : open }
                                onClick={() => isMobile && handleDrawerToggle()}
                            />
                        ))
                    }
                </List>
            </Drawer>
        </>
    )
}

export default Sidebar3
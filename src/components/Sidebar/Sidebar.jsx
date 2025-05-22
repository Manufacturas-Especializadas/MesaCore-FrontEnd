import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { siderbarData } from "../../data/siderBarData";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Sidebar = ({open, handleDrawerClose}) => {
    const drawerWidth = 245;
    return (
        <>
            <Drawer
                anchor="left"
                open={ open }
                onClose={ handleDrawerClose }
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end", padding: 1}}>
                    <IconButton onClick={ handleDrawerClose }>
                        <ChevronLeftIcon/>
                    </IconButton>
                </Box>

                <List>
                    {
                        sidebarItems.map((item, index) => (
                            <ListItem key={ item.name }  component={ Link } to={ item.path }>
                                <ListItemIcon>
                                    { item.icon }
                                </ListItemIcon>
                                <ListItemText> 
                                    { item.name } 
                                </ListItemText>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
        </>
    )
}

export default Sidebar
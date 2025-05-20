import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ListItemLink = ({ icon, primary, to, open }) => {
    return (
        <>
            <ListItem component={ RouterLink } to={ to }>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', paddingRight: 1 }}>
                    { icon }
                </ListItemIcon>
                {open && <ListItemText primary={ primary }/>}
            </ListItem>
        </>
    )
}

export default ListItemLink
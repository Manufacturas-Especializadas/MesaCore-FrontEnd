import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

export const siderbarData = ({ isAuthenticated, role }) => {

    return[
        ...(isAuthenticated
            ? [
                {
                    name: "Home",
                    icon: <DashboardIcon/>,
                    path: "/"
                }
            ] : []
        ),
        ...(role === "Admin"
            ? [
                {
                    name: "Settings",
                    icon: <SettingsIcon/>,
                    path: "/settings"
                }
            ] : []
        )
    ]
}
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { jwtDecode } from 'jwt-decode';

let role = "";

const token = localStorage.getItem("token");

if(token){
    try{
        const decoded = jwtDecode(token);
        role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }catch(error){
        console.error(`Error al obtener el rol: ${ error }`);
    }
}

export const siderbarData = [
    {
        name: "Home",
        icon: <DashboardIcon />,
        path: "/home",
    },
    ...(role === "Admin" 
        ? [
            {
                name: "Settings",
                icon: <SettingsIcon />,
                path: "/settings",
            },
        ]
        : []
    )
    ,
];
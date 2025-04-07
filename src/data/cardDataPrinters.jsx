import { PiCylinderDuotone } from "react-icons/pi";
import { jwtDecode } from "jwt-decode";

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

export const cardDataPrinters = [
    ...(role === "Admin" 
        ? [
            {
                title: "Alumunio",
                icon: <PiCylinderDuotone/>,
                subtitle: "Fixtures de aluminio",
                path: "/settings/printers/al"
            },
            {
                title: "Cobre",
                icon: <PiCylinderDuotone/>,
                subtitle: "Fixtures de cobre",
                path: "/settings/printers/cu"
            }
        ] : []
    )
];
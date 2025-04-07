import { AiFillPrinter } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

let role = "";

const token = localStorage.getItem("token");

if(token){
    try{
        const decoded = jwtDecode(token);
        role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }catch(error){
        console.error(`Error al obtener el token: ${error}`);
    }
}

export const carData = [
    ...(role === "Admin"         
        ? [
            {
                title: "Fixtures",
                icon: <AiFillPrinter/>,
                subtitle: "Registro de fixtures",
                path: "/settings/printers"
            },
            {
                title: "Impresiones",
                icon: <FaUsers/>,
                subtitle: "Registro de impresiones",
                path: "/settings/impressions"
            }
        ]        
        : []
    )
];
import { AiFillPrinter } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

export const carData = [
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
];
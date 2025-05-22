import { AiFillPrinter } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";

export const carData = ({ role }) => {
    return [
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
    ]
}
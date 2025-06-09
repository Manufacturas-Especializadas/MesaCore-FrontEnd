import { AiFillPrinter } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { AiFillProject } from "react-icons/ai";

export const carData = ({ role }) => {
    return [
        ...(role === "Admin"
            ? [
                {
                    title: "Proyectos",
                    icon: <AiFillProject />,
                    subtitle: "Registro de proyectos",
                    path: "/settings/projects"
                },
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
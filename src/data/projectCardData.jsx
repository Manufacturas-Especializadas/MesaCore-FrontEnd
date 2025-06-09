import { PiCylinderDuotone } from "react-icons/pi";


export const projectCardData = ({ role }) => {
    return [
        ...(role === "Admin"
            ? [
                {
                    title: "Aluminio",
                    icon: <PiCylinderDuotone/>,
                    subtitle: "Proyectos fixtures de aluminio",
                    path: "/settings/projects/al"
                },
                {
                    title: "Cobre",
                    icon: <PiCylinderDuotone/>,
                    subtitle: "Proyectos fixtures de cobre",
                    path: "/settings/projects/cu"
                }
            ]
            : []
        )
    ]
}
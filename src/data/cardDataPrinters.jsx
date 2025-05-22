import { PiCylinderDuotone } from "react-icons/pi";

export const cardDataPrinters = ({ role }) => {
    return [
        ...(role === "Admin"
            ? [
                {
                    title: "Alumnio",
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
            ]
            : []
        )
    ]
}
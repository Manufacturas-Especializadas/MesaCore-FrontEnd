import { Box, CircularProgress, Grid2, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CardCUTemplate from "../Card/CardCUTemplate";
import RequestNewPrintTemplate from "./RequestNewPrintTemplate";
import FilterSectionDashboard from "./FilterSectionDashboard";
import { useNavigate } from "react-router-dom";
import CardALTemplate from "../Card/CardALTemplate";

const DashboardTemplate = () => {
    const[printerAluminio, setPrinterAluminio] = useState([]);
    const[printerCobre, setPrinterCobre] = useState([]);
    const[value, setValue] = useState(0);
    const[loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        const fetchPrinters = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://localhost:44350/api/ImpresorasCobre/Obtener");
                if (!response.ok) {
                    throw new Error("Error en el fetching");
                }
                const data = await response.json();
                setPrinterCobre(data);
            } catch (error) {
                console.error("Error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrinters();
    }, []);

    useEffect(() => {
        const fetchPrintersAluminio = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://localhost:44350/api/Impresoras/Obtener");
                if (!response.ok) {
                    throw new Error("Error en el fetching");
                }
                const data = await response.json();
                setPrinterAluminio(data);
            } catch (error) {
                console.error("Error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrintersAluminio();
    }, []);

    // const filteredPrinters = printer.filter((item) => 
    //     value === 0 ? item.material === "Cobre" : item.material === "Aluminio"
    // )

    return (
        <>
            <RequestNewPrintTemplate/>

            {/* <FilterSectionDashboard/> */}

            <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2, background: "#fff" }}>
                <Tabs
                    value={ value }
                    onChange={ handleChange }
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="Cobre"/>
                    <Tab label="Aluminio"/>
                </Tabs>
            </Box>

            {
                loading ? (
                    <Box sx={{ display: "flex", justifyContent:"center", mt: 4 }}>
                        <CircularProgress/>
                    </Box>
                ) : value === 0 ? (
                    printerCobre.length > 0 ? (
                        <Grid2 container spacing={ 2 } sx={{ mt: 2 }}>
                            {
                                printerCobre.map((item, index) => (
                                    <Grid2 key={ index }>
                                        <CardCUTemplate printer={ item }/>
                                    </Grid2>
                                ))
                            }
                        </Grid2>
                    ) : (
                        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
                            No hay proyectos disponibles
                        </Typography>
                    )
                ) : (
                    printerAluminio.length > 0 ? (
                        <Grid2 container spacing={ 2 } sx={{ mt: 2 }}>
                            {
                                printerAluminio.map((item, index) => (
                                    <Grid2 key={ index }>
                                        <CardALTemplate printer={ item }/>
                                    </Grid2>
                                ))
                            }
                        </Grid2>
                    ) : (
                        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
                            No hay proyectos disponibles
                        </Typography>
                    )
                )
            }
        </>

    )
}

export default DashboardTemplate
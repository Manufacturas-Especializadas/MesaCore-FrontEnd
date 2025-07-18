import { Box, Button, Card, CardContent, Chip, Dialog, DialogContent, Typography } from "@mui/material";
import { AccessTime as AccessTimeIcon, Person as PersonIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import DetailsCardALTemplate from "../Templates/DetailsCardALTemplate";
import config from "../../../config";

const CardALTemplate = ({ printer }) => {
    const [selectedPrinterId, setSelectedPrinterId] = useState(null);
    const [printersDetails, setPrintersDetails] = useState(null);

    const fetchPrintersDetails = async (nombreDelProyecto) => {
        try {
            const response = await fetch(`${config.apiUrl}/Impresoras/ObtenerImpresorasAluminioPorNombreProyecto/${encodeURIComponent(nombreDelProyecto)}`);
    
            if (!response.ok) {
                throw new Error(`Error al cargar los datos: ${response.status} - ${response.statusText}`);
            }
        
            const data = await response.json();
            setPrintersDetails(data);
            setSelectedPrinterId(nombreDelProyecto);
    
        } catch (error) {
            console.error(`Error al obtener detalles:`, error.message);
            setPrintersDetails(null); 
        }
    };

    const statusColor = {
        "En proceso": "#adaf4c",
        "En Espera": "#367ff4",
        "Finalizado": "#4caf50",        
    };
    
    const getStatusColor = (status) => {
        return statusColor[status] || "#000";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (!dateString || isNaN(date)) return "Sin fecha"; 
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const handleOpenDetails = (nombreDelProyecto) => {
        setSelectedPrinterId(nombreDelProyecto);
        fetchPrintersDetails(nombreDelProyecto);
    };

    const handleCloseDetails = () => {
        setSelectedPrinterId(null);
        setPrintersDetails(null);
    };

    return (
        <>
            <Card
                sx={{
                    minWidth: 275,
                    maxWidth: 400,
                    margin: "1rem",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s",
                    "&:hover": {
                        transform: "scale(1.02)"
                    }
                }}
            >
                <CardContent>
                    <Box sx={{ display:"flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                            Proyecto: { printer.nombreDelProyecto || "N/A" }
                        </Typography>
                        <Chip
                            label={ printer.estatusNombre || "Desconocido" }
                            sx={{
                                backgroundColor: getStatusColor(printer.estatusNombre),
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "0.8rem",
                                marginLeft: 3
                            }}
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1, gap: "0.3rem" }}>
                            <PersonIcon sx={{ mr: 1 }}/> 
                            <strong> Solicitante: </strong> { printer.solicitanteNombre || "No especificado" }
                        </Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1, gap: "0.3rem" }}>
                            <AccessTimeIcon sx={{ mr: 1 }} /> 
                            <strong> Fecha de la solicitud: </strong> { formatDate(printer.fechaSolicitud) }
                        </Typography>
                    </Box>
                </CardContent>

                <Box sx={{ display: "flex", justifyContent: "space-between", padding: "0 1rem 1rem 1rem" }}>
                    <Button 
                        size="small" 
                        variant="outlined" 
                        color="primary" 
                        onClick={() => handleOpenDetails(printer.nombreDelProyecto)}>
                        Ver Detalles
                    </Button>
                </Box>
            </Card>

            <Dialog open={ !!selectedPrinterId } onClose={ handleCloseDetails } fullWidth maxWidth="md">
                <DialogContent>
                    {
                        printersDetails && (
                            <DetailsCardALTemplate 
                                printer={ printersDetails } 
                                onClose={ handleCloseDetails }
                                onRefresh={() => fetchPrintersDetails(selectedPrinterId)}
                            />
                        )                        
                    }
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CardALTemplate;
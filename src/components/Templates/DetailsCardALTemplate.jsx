import { Chip ,Divider, IconButton, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const DetailsCardALTemplate = ({ printer, onClose }) => {

    const statusColor = {
        Aprobada: "#4caf50",
        Rechazada: "#f44336",
        "En espera": "#ff9800",
        Urgente: "#e91e63",
        Pendiente: "#2196f3",
        Revisión: "#9c27b0"
    }
    
    const getStatusColor = (status) =>{
        return statusColor[status] || "#000";
    };

    return (
        <>
            <Paper
            sx={{
                p: 4,
                maxWidth: "800px",
                margin: "auto",
                borderRadius: "16px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9",
                position: "relative",
            }}
        >            

            <IconButton
                onClick={ onClose }
                sx={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    color: "#555",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </IconButton>

            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Detalles del Proyecto
            </Typography>                

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ mb: 2 }}>
                Proyecto: { printer.nombreDelProyecto }
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
                Números de Parte
            </Typography>
            {Array.isArray(printer.impresiones) && printer.impresiones.length > 0 ? (
                <List sx={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", borderRadius: "8px" }}>
                    {printer.impresiones.map((impresion, index) => (
                        <ListItem key={index} sx={{ borderBottom: "1px solid #eee" }}>
                            <ListItemText
                                    primary={`N. Parte: ${impresion.nParte}`}
                                    secondary={
                                        <Typography component="div" variant="body2">
                                            <Typography variant="caption" sx={{ m: 1 }}>
                                                N.Dibujo:  { impresion.nDibujo }
                                            </Typography>
                                            <Typography variant="caption" sx={{ m: 1 }}>
                                                Revisión: { impresion.revision }
                                            </Typography>
                                            <Typography variant="caption" sx={{ m: 1 }}>
                                                Cliente: { impresion.cliente?.nombre }
                                            </Typography>
                                            <Typography variant="caption" sx={{ m:1 }}>
                                                Planta: { impresion.planta?.nombre }
                                            </Typography>
                                            <Chip
                                                label={impresion.estatus?.nombre || "Desconocido"}
                                                sx={{
                                                    backgroundColor: getStatusColor(impresion.estatus?.nombre),
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                    fontSize: "0.8rem",
                                                    marginLeft: 3,
                                                }}
                                            />
                                        </Typography>
                                    }
                            />
                        </ListItem>
                    ))}
                </List>
                ) : (
                    <Typography variant="body1" sx={{ fontStyle: "italic", color: "#555" }}>
                        No hay números de parte disponibles.
                    </Typography>
                )}
            </Paper>
        </>
    )
}

export default DetailsCardALTemplate
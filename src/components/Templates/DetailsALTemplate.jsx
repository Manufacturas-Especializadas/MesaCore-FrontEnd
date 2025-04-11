import { Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import config from "../../../config";

const DetailsALTemplate = ({ show, handlClose, printerId }) => {
    const[printer, setPrinter] = useState(null);

    useEffect(() => {
        const fetchImpresora = async () => {
            if(!printerId) return;

            try{
                const response = await fetch(`${config.apiUrl}/Impresoras/ObtenerImpresoraPorId/${printerId}`);
                if(!response){
                    throw new Error(`Error al hacer fetching: ${response.statusText}`);
                };

                const data = await response.json();
                setPrinter(data);
            }catch(error){
                console.log("Error", error);
            }
        }

        fetchImpresora();
    }, [printerId]);

    const formateDate = (dateString) => {
        if(!dateString) return "";


        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    }

    if(!printer) return null;

    return (
        <>
            <Dialog
                open={ show }
                keepMounted
                onClose={ handlClose }
                disableRestoreFocus
            >
                <DialogTitle>
                    {" Detalles del fixture "}
                </DialogTitle>
                <DialogContent>
                <List>
                    <ListItem><ListItemText primary={`Entrega Lab: ${formateDate(printer.entregaLaboratorio)}`} /></ListItem>
                    <ListItem><ListItemText primary={`FAI: ${printer.fai}`} /></ListItem>
                    <ListItem><ListItemText primary={`Liberación Lab: ${formateDate(printer.liberacionLaboratorio)}`} /></ListItem>
                    <ListItem><ListItemText primary={`Comentarios: ${printer.comentarios}`} /></ListItem>
                </List>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DetailsALTemplate
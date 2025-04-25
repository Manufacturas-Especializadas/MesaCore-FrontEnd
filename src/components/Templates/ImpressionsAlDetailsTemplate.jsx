import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    IconButton, 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow 
} from "@mui/material";

import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { useNavigate } from "react-router-dom";

const ImpressionsAlDetailsTemplate = ({ open, onClose, details}) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const formatDate = (dateString) => {
        if(!dateString) return "";

        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <Dialog open={ open } onClose={ onClose } maxWidth="md" fullWidth>
                <DialogTitle>Detalles del código</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    Codigo
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    Versión 
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    Fecha 
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    Peso(Gr) 
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    Longitud 
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    Tiempo de impresión 
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    Precio externo 
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    Precio interno 
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    Opciones
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                details.map((item) => (
                                    <TableRow key={ item.id }>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            { item.codigo }
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            { item.version }
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            { formatDate(item.fecha) }
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            { item.pesoGr }
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            { item.longitud }
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            { item.tiempoImpresion }
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            { item.precioExterno }
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            { item.precioInterno }
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleNavigate(`/settings/impressions/al/edit/${ item.id }`)}
                                            >
                                                <StickyNote2Icon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ onClose } > CERRAR </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ImpressionsAlDetailsTemplate
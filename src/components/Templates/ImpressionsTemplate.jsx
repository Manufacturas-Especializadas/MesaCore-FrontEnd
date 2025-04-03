import {  
    Paper, 
    styled, 
    Table, 
    TableBody, 
    TableCell, 
    tableCellClasses, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography,
    Snackbar,
    Alert,
    TablePagination,
    CircularProgress,
    TextField,
    IconButton,
    Box,
    Container,
    Grid2,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteCUTemplate from "./DeleteCUTemplate";
import DetailsCUTemplate from "./DetailsCUTemplate";
import EditIcon from '@mui/icons-material/Edit';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1976D2',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`] : {
        fontSize: 15,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)':{
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th':{
        border: 0
    }
}));

const ImpressionsTemplate = () => {
    const[impression, setImpression] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchImpression = async () => {
            try{
                const response = await fetch("https://localhost:44350/api/Impresiones/ObtenerImpresiones");

                if(!response.ok){
                    throw new Error(`Error en el fetching: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data);
                setImpression(data);
            }catch(error){
                console.log(`Error: ${error}`);
            }
        }

        fetchImpression();
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <Container component={ Paper } sx={{ padding: 5 }}>
                <Box sx={{ display: 'flex', flexDirection:{ xs:"column", sm:"row" }, justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb:{ xs:2, sm: 0 }, mr: 3 }}>
                        IMPRESIONES
                    </Typography>

                    <Grid2 container spacing={ 2 }>
                        <Grid2>

                        </Grid2>
                    </Grid2>

                    <IconButton
                        sx={{color: "black", ml: 3}}
                        size="large"
                        onClick={() => handleNavigate("/settings/impressions/register")}
                    >
                        <AddCircleOutlineRoundedIcon/>
                    </IconButton>
                </Box>

                <div className="overflow-x-auto">
                    <Table sx={{ minWidth: 700, marginTop: 1 }}>
                        <TableHead>
                            <TableRow className="uppercase">
                                <StyledTableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, textAlign: "center" }}>
                                    Codigo
                                </StyledTableCell>
                                <StyledTableCell sx={{textAlign: 'center'}}>
                                    Versión
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "center" }}>
                                    Fecha
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "center" }}>
                                    Impresora
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "center" }}>
                                    Peso(gr)
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "center" }}>
                                    Longitud (M)
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "center" }}>
                                    Tiempo impresión
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "center" }}>
                                    Costo externo
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: "center" }}>
                                    Costo interno
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="uppercase">
                            {
                                impression.map((item, index) => (
                                    <StyledTableRow key={ index }>
                                        <StyledTableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                                            { item.fixtureAl }
                                        </StyledTableCell>
                                        <StyledTableCell sx={{textAlign: 'center'}}>
                                            { item.version }
                                        </StyledTableCell>
                                        <StyledTableCell sx={{textAlign: 'center'}}>
                                            { item.fecha }
                                        </StyledTableCell>
                                        <StyledTableCell sx={{textAlign: 'center'}}>
                                            { item.impresora }
                                        </StyledTableCell>
                                        <StyledTableCell sx={{textAlign: 'center'}}>
                                            { item.pesoGr }
                                        </StyledTableCell>
                                        <StyledTableCell sx={{textAlign: 'center'}}>
                                            { item.longitud }
                                        </StyledTableCell>
                                        <StyledTableCell sx={{textAlign: 'center'}}>
                                            { item.tiempoImpresion }
                                        </StyledTableCell>
                                        <StyledTableCell sx={{textAlign: 'center'}}>
                                            { item.precioExterno }
                                        </StyledTableCell>
                                        <StyledTableCell sx={{textAlign: 'center'}}>
                                            { item.precioInterno }
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </Container>
        </>
    )
}

export default ImpressionsTemplate
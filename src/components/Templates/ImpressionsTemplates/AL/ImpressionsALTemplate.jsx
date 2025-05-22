import { 
    Box, 
    Grid, 
    IconButton, 
    Paper, 
    styled, 
    Table, 
    TableBody, 
    TableCell, 
    tableCellClasses, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField, 
    Typography, 
    CircularProgress,
    TablePagination,
    Snackbar,
    Alert
} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ImpressionsAlDeleteTemplate from "./ImpressionsAlDeleteTemplate";
import config from "../../../../../config";
import ImpressionsAlDetailsTemplate from "./ImpressionsAlDetailsTemplate";

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

const ImpressionsALTemplate = () => {
    const[impressions, setImpressions] = useState([]);
    const[loading, setLoading] = useState(true);
    const[noData, setNoData] = useState(false);
    const[page, setPage] = useState(0);
    const[details, setDetails] = useState([]);
    const[rowsPerPage, setRowsPerPage] = useState(10);
    const[totalRecords, setTotalRecords] = useState(0);
    const[openDialog, setOpenDialog] = useState(false);
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const[selectedImpressionId, setSelectedImpressionId] = useState(null);
    const[openDetailsModal, setOpenDetailsModal] = useState(false);
    const[filter, setFilters] = useState({
        codigo: ""
    });
    const navigate = useNavigate();

    const handleNavigate = (path) =>{
        navigate(path);
    };

    const handleOpenDialog = (id) =>{
        setSelectedImpressionId(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedImpressionId(null);
    };

    const handleCloseDetailsModal = () => {
        setOpenDetailsModal(false);
        setDetails([]);
    };

    const formateDate = (dateString) => {
        if(!dateString) return "";

        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const handleOpenDetailsModal = async(codigo) => {
        try{
            const response = await fetch(`${config.apiUrl}/ImpresionesAl/DetallesPorCodigo/${codigo}`);
            if(!response.ok){
                throw new Error("Error al cargar los detalles");
            }

            const data = await response.json();
            setDetails(data);
            setOpenDetailsModal(true);
        }catch(error){
            console.log("Error al cargar los detalles", error);
        }
    }

    const handleDelete = async() => {
        try{
            const response = await fetch(`${config.apiUrl}/ImpresionesAl/EliminarRegistro/${selectedImpressionId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if(!response.ok){
                throw new Error(`Error al eliminar: ${response.status}${response.statusText}`);
            }

            setImpressions((prevImpressions) =>
                prevImpressions.filter((impression) => impression.id !== selectedImpressionId)
            );

            setOpenSnackbar(true);
            setTimeout(1500);

            handleOpenDialog();
        }catch(error){
            console.error("Error al eliminar el registro:", error);
        }
    }

    useEffect(() => {
        const fetchImpressions = async() => {
            try{
                setLoading(true);

                let url = `${config.apiUrl}/ImpresionesAl/Paginacion?page=${page + 1}&pageSize=${rowsPerPage}`
                if(filter.codigo){
                    url += `&codigo=${filter.codigo}`;
                }

                const response = await fetch(url);
                if(!response.ok){
                    throw new Error("Error en el fetching");
                }

                const data = await response.json();
                setImpressions(data.data);
                setTotalRecords(data.totalRecords);

                if(data.data.length === 0){
                    setNoData(true);
                }else{
                    setNoData(false);
                }

            }catch(error){
                console.log(`Error: ${error}`);
                setNoData(true);
            }finally{
                setLoading(false);
            }        
        }
        fetchImpressions();
    }, [page, rowsPerPage, filter]);


    return (
        <>
            <TableContainer component={ Paper } sx={{ padding: 5 }}>
                <Box sx={{ display: 'flex', flexDirection:{ xs: "column", sm: "row"}, 
                            justifyContent: "space-between", alignItems: "center" }}>
                    <IconButton
                        sx={{ p: 2, mr: 3, color: "black" }}
                        onClick={() => handleNavigate("/settings/impressions")}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb:{ xs: 2, sm: 0 }, mr: 3 }}>
                        Impresiones Al
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Codigo"
                            />
                        </Grid>
                    </Grid>

                    <IconButton
                        sx={{ color: "black", ml: 3 }}
                        size="large"
                        onClick={() => handleNavigate("/settings/impressions/al/register")}
                    >
                        <AddCircleOutlineRoundedIcon/>
                    </IconButton>
                </Box>

                <div className="overflow-x-auto">
                    <Table sx={{ minWidth: 700, marginTop: 1 }}>
                        <TableHead>
                            <TableRow className="uppercase">
                                <StyledTableCell sx={{ display: {xs: 'none', sm: 'table-cell'}, textAlign: 'center'}}>
                                    Codigo
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: 'center' }}>
                                    Versión
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: 'center' }}>
                                    Fecha
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: 'center' }}>
                                    Peso(Gr)
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: 'center' }}>
                                    Longitud
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: 'center' }}>
                                    Tiempo de impresión
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: 'center' }}>
                                    Precio externo
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: 'center' }}>
                                    Precio interno
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: 'center' }}>
                                    Opciones
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="uppercase">
                            {
                                loading ? (
                                    <TableRow>
                                        <TableCell colSpan={ 9 } align="center">
                                            <CircularProgress/>
                                        </TableCell>
                                    </TableRow>
                                ) : noData ? (
                                    <TableRow>
                                        <TableCell colSpan={ 9 } align="center">
                                            No hay datos disponibles
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    impressions.map((item, index) => (
                                        <StyledTableRow key={ index }>
                                            <StyledTableCell sx={{ display: {xs: 'none', sm: 'table-cell'}, textAlign: 'center' }}>
                                                { item.codigo }
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: {xs: 'none', sm: 'table-cell'}, textAlign: 'center' }}>
                                                { item.version }
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: {xs: 'none', sm: 'table-cell'}, textAlign: 'center' }}>
                                                { formateDate(item.fecha) }
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: {xs: 'none', sm: 'table-cell'}, textAlign: 'center' }}>
                                                { item.pesoGr }
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: {xs: 'none', sm: 'table-cell'}, textAlign: 'center' }}>
                                                { item.longitud }
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: {xs: 'none', sm: 'table-cell'}, textAlign: 'center' }}>
                                                { item.tiempoImpresion }
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: {xs: 'none', sm: 'table-cell'}, textAlign: 'center' }}>
                                                { item.precioExterno }
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: {xs: 'none', sm: 'table-cell'}, textAlign: 'center' }}>
                                                { item.precioInterno }
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ textAlign: 'center' }}>
                                                <IconButton
                                                    sx={{ color: 'black' }}
                                                    onClick={() => handleOpenDetailsModal(item.codigo)}
                                                >
                                                    <StickyNote2Icon/>
                                                </IconButton>
                                                <IconButton
                                                    sx={{ color: 'black' }}
                                                    onClick={() => handleOpenDialog(item.id)}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                )
                            }
                        </TableBody>
                    </Table>
                </div>

                <TablePagination
                    component="div"
                    count={ totalRecords }
                    page={ page }
                    onPageChange={( event, newPage ) => setPage(newPage)}
                    rowsPerPage={ rowsPerPage }
                    onRowsPerPageChange={( event ) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
            </TableContainer>
            
            <ImpressionsAlDetailsTemplate
                open={ openDetailsModal }
                onClose={ handleCloseDetailsModal }
                details={ details }
            />

            <ImpressionsAlDeleteTemplate
                open={ openDialog }
                onClose={ handleCloseDialog }
                onDelete={ handleDelete }
            />

            <Snackbar
                open={ openSnackbar }
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert 
                    onClose={() => setOpenSnackbar(false)}
                    severity="info" sx={{ width: "100%" }} 
                    variant="filled"
                >
                    ¡Registro eliminado!
                </Alert>
            </Snackbar>
        </>
    )
}

export default ImpressionsALTemplate
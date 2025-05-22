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
    Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteCUTemplate from "./DeleteCUTemplate";
import DetailsCUTemplate from "./DetailsCUTemplate";
import EditIcon from '@mui/icons-material/Edit';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import config from "../../../../../config";

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

const PrinterCUTemplate = () => {
    const[printers, setPrinters] = useState([]);
    const[showModal, setShowModal] = useState(false);
    const[selectedPrinterId, setSelectedPrinterId] = useState(null);
    const[openDialog, setOpenDialog] = useState(false);
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const[page, setPage] = useState(0);
    const[rowsPerPage, setRowsPerPage] = useState(10);
    const[totalRecords, setTotalRecords] = useState(0);
    const[loading, setLoading] = useState(true);
    const[noData, setNoData] = useState(false);
    const[filters, setFilters] = useState({
        codigo: "",
        nParte: "",        
    });
    const navigate = useNavigate();
    
    const statusColor = {
        Aprobada: "#4caf50",
        Rechazada: "#f44336",
        "En espera": "#ff9800",
        Urgente: "#e91e63",
        Pendiente: "#2196f3",
        Revisión: "#9c27b0"
    }

    const getStatusStyle = (status) => {
        const color = statusColor[status] || "#000";

        return {
            backgroundColor: color,
            color: "#fff",
            padding: "5px",
            borderRadius: "4px",
            textAlign: "center",
        }
    };

    const handleOpenModal = (id) => {
        setSelectedPrinterId(id);

        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);

        setSelectedPrinterId(null);
    };

    const handleOpenDialog = (id) => {
        setSelectedPrinterId(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPrinterId(null);
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleDelete = async () => {
        try{
            const response = await fetch(`${config.apiUrl}/ImpresorasCobre/Eliminar/${selectedPrinterId}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if(!response.ok){
                throw new Error(`Error al eliminar: ${response.status} ${response.statusText}`)
            }

            setPrinters((prevPrinters) =>
                prevPrinters.filter((printer) => printer.id !== selectedPrinterId)
            );

            setOpenSnackbar(true);
            setTimeout(3000);
            
            handleCloseDialog();

        }catch(error){
            console.error("Error al eliminar el registro:", error);
        }
    };

    useEffect(() => {
        const fetchPrinters = async () => {
            try{
                let url = `${config.apiUrl}/ImpresorasCobre/Paginacion?page=${page + 1}&pageSize=${rowsPerPage}`;
                if (filters.codigo) {
                    url += `&codigo=${filters.codigo}`;
                }

                if (filters.nParte) {
                    url += `&nParte=${filters.nParte}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error en el fetching");
                }

                const data = await response.json();
                setPrinters(data.data);
                setTotalRecords(data.totalRecords);

                if(data.data.length === 0){
                    setNoData(true);
                }else{
                    setNoData(false);
                }

            }catch(error){
                console.log("Error", error);
                setNoData(true);
            }finally{
                setLoading(false);
            }
        }
        fetchPrinters();
    }, [page, rowsPerPage, filters]);

    return (
        <>
            <TableContainer component={ Paper } sx={{ padding: 5 }}>
                <Box sx={{ display: 'flex', flexDirection:{ xs:"column", sm:"row" }, justifyContent: "space-between", alignItems: "center" }}>
                    <IconButton
                        sx={{ p: 2, mr: 3, color: "black" }}
                        onClick={() => handleNavigate("/settings/printers")}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb:{ xs:2, sm: 0 }, mr: 3 }}>
                        REGISTRO - FIXTURES - CU
                    </Typography>
                    
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Código"
                                value={ filters.codigo }
                                onChange={(e) => {
                                    setFilters({...filters, codigo: e.target.value});
                                    setPage(0);
                                }}                        
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="filled"
                                label="N.Parte"
                                value={ filters.nParte }
                                onChange={(e) => {
                                    setFilters({...filters, nParte: e.target.value})
                                    setPage(0);
                                }}
                            />
                        </Grid>
                    </Grid>

                    <IconButton
                        sx={{color: "black", ml: 3}}
                        size="large"
                        onClick={() => handleNavigate("/settings/printers/cu/register")}
                    >
                        <AddCircleOutlineRoundedIcon/>
                    </IconButton>
                </Box>

                <div className="overflow-x-auto">
                    <Table sx={{ minWidth: 700, marginTop: 1 }}>
                        <TableHead>
                            <TableRow className="uppercase">
                                <StyledTableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                                    Estatus
                                </StyledTableCell>
                                <StyledTableCell sx={{textAlign: 'center'}}>
                                    Código
                                </StyledTableCell>
                                <StyledTableCell>
                                    Planta
                                </StyledTableCell>
                                <StyledTableCell>
                                    Solicitante
                                </StyledTableCell>
                                <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                    Cliente
                                </StyledTableCell>
                                <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                    N. Dibujo
                                </StyledTableCell>
                                <StyledTableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                    N. Parte
                                </StyledTableCell>
                                <StyledTableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                    Revisión
                                </StyledTableCell>
                                <StyledTableCell sx={{ textAlign: 'center' }}>
                                    Opciones
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="uppercase">                        
                            {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={ 9 } align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : noData ? (                                    
                                    <TableRow>
                                        <TableCell colSpan={ 9 } align="center">
                                            No hay datos disponibles.
                                        </TableCell>
                                    </TableRow>
                                ) : (                                    
                                    printers.map((item, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell sx={getStatusStyle(item.estatusId || "Desconocido")}>
                                                {item.estatusId || "Desconocido"}
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, textAlign: 'center' }}>
                                                {item.codigo}
                                            </StyledTableCell>
                                            <StyledTableCell>{item.plantId}</StyledTableCell>
                                            <StyledTableCell>{item.solicitanteId}</StyledTableCell>
                                            <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                                {item.clienteId}
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                                {item.nDibujo}
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                                {item.nParte}
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                                {item.revision}
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: 'flex', gap: 2 , textAlign: 'center'}}>
                                                <IconButton
                                                    sx={{color: "black" }}
                                                    onClick={() => handleNavigate(`/settings/printers/cu/edit/${item.id}`)}
                                                >
                                                    <EditIcon/>
                                                </IconButton>

                                                <IconButton
                                                    sx={{color: "black" }}
                                                    onClick={() => handleOpenModal(item.id)}
                                                >
                                                    <StickyNote2Icon/>
                                                </IconButton>

                                                <IconButton
                                                    sx={{color: "black"}}
                                                    onClick={() => handleOpenDialog(item.id)}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>

                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                )}
                        </TableBody>
                    </Table>
                </div>

                <TablePagination
                    component="div"
                    count={ totalRecords }
                    page={ page }
                    onPageChange={(event, newPage) => setPage(newPage)}
                    rowsPerPage={ rowsPerPage }
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
            </TableContainer>

            <DetailsCUTemplate
                show={ showModal }
                handlClose={ handleCloseModal }
                printerId={ selectedPrinterId }
            />

            <DeleteCUTemplate
                open={ openDialog }
                onClose={ handleCloseDialog }
                onDelete={ handleDelete }
            />

            <Snackbar
                open={ openSnackbar }
                autoHideDuration={ 5000 }                
                onClose={ () => setOpenSnackbar(false) }
                anchorOrigin={ { vertical: "top", horizontal: "right" } }
            >
                <Alert onClose={ () => setOpenSnackbar(false) } severity="error" sx={{ width: "100>%" }} variant="filled">
                    ¡Registro eliminado!
                </Alert>
            </Snackbar>
        </>
    )
}

export default PrinterCUTemplate
import { 
    Alert,
    Box, 
    Button, 
    Container, 
    FormControl, 
    Grid, 
    InputLabel, 
    MenuItem, 
    Select, 
    Snackbar, 
    TextField, 
    Typography 
} 
from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectALRegisterTemplate = () => {
    const[formData, setFormData] = useState({
        nombreDelProyecto: "",
        solicitanteId: "",
        plantaId: "",
        estatusId: ""
    });

    const[solicitante, setSolicitante] = useState([]);
    const[planta, setPlanta] = useState([]);
    const[estatus, setEstatus] = useState([]);
    const[snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleCloseSnackbar = (event, reason) => {
        if(reason === 'clickaway') return;
        setSnackbar({...snackbar, open: false});
    };

    useEffect(() => {
        const fetchSolicitante = async () => {
            try{
                const response = await fetch("https://localhost:44350/api/ProyectosAL/ObtenerSolicitanteProyectos");

                if(!response.ok){
                    throw new Error("Error al hacer fetching");
                };

                const data = await response.json();
                setSolicitante(data);
            }catch(error){
                console.error("Error al obtener los datos: ", error);
            }
        }

        fetchSolicitante();
    }, []);

    useEffect(() => {
        const fetchPlanta = async () => {
            try{
                const response = await fetch("https://localhost:44350/api/ProyectosAL/ObtenerPlantaProyectos");

                if(!response.ok){
                    throw new Error("Error al hacer fetching");
                }

                const data = await response.json();
                setPlanta(data);
            }catch(error){
                console.error("Error al obtener los datos: ", error);
            }
        };

        fetchPlanta();
    }, []);

    useEffect(() => {
        const fetchEstatusProyecto = async () => {
            try{
                const response = await fetch("https://localhost:44350/api/ProyectosAL/ObtenerEstatusProyectos");

                if(!response.ok){
                    throw new Error("Error al hacher fetching");
                }

                const data = await response.json();
                setEstatus(data);
            }catch(error){
                console.error("Error al obtener los datos: ", error);
            }
        };

        fetchEstatusProyecto();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const { nombreDelProyecto, solicitanteId, plantaId, estatusId } = formData;

        if(!nombreDelProyecto.trim()){
            setSnackbar({
                open: true,
                message: "El nombre del proyecto es requerido"
            });
            return;
        };

        if(!solicitanteId || !plantaId || estatusId){
            setSnackbar({
                open: true,
                message: "Todos los campos de selección son obligatorios",
                severity: "error"
            });
        };

        try{
            const response = await fetch("https://localhost:44350/api/ProyectosAL/Registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if(!response.ok){
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error ${ response.status }`);
            }

            const result = await response.json();

            setSnackbar({
                open: true,
                message: "Proyecto guardado exitosamente",
                severity: "success"
            });

            setTimeout(() => {
                handleNavigate("/settings/projects/al");
            }, 1000);

        }catch(error){
            console.error("Error al guardar el proyecto: ", error);
            setSnackbar({
                open: true,
                message: `No se pudo guardar el proyecto: ${error.message}`,
                severity: "errror"
            });
        };

    };

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Box sx={{ 
                        background: '#fff', 
                        padding: 3, 
                        borderRadius: 2, 
                        boxShadow: 2 
                    }}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                        Registro de proyectos
                    </Typography>

                    <Grid container spacing={ 3 }>
                        <Grid item xs={ 12 }>
                            <TextField
                                fullWidth
                                label="Nombre del proyecto"
                                variant="filled"
                                name="nombreDelProyecto"
                                value={ formData.nombreDelProyecto || "" }
                                onChange={ handleChange }
                            />
                        </Grid>

                        <Grid item xs={ 12 }>
                            <FormControl fullWidth>
                                <InputLabel>Estatus</InputLabel>
                                <Select
                                    variant="filled"
                                    name="estatusId"
                                    value={ formData.estatusId || "" }
                                    onChange={ handleChange }
                                >
                                    {
                                        estatus.map((item, index) => (
                                            <MenuItem key={index} value={ item.id }>
                                                {item.nombre}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={ 12 }>
                            <FormControl fullWidth>
                                <InputLabel>Planta</InputLabel>
                                <Select
                                    variant="filled"
                                    name="plantaId"
                                    value={ formData.plantaId || "" }
                                    onChange={ handleChange }
                                >
                                    {
                                        planta.map((item, index) => (
                                            <MenuItem key={index} value={ item.id }>
                                                {item.nombre}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={ 12 }>
                            <FormControl fullWidth>
                                <InputLabel> Solicitante </InputLabel>                                
                                <Select
                                    variant="filled"
                                    name="solicitanteId"
                                    value={ formData.solicitanteId || "" }
                                    onChange={ handleChange }
                                >
                                    {
                                        solicitante.map((item, index) => (
                                            <MenuItem key={ index } value={ item.id }>
                                                { item.nombre }
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box sx={{ 
                        mt: 3, 
                        textAlign: 'right', 
                        display: "flex",
                        gap: 2
                    }}>
                        <Button 
                            fullWidth
                            variant="contained" 
                            color="primary"
                            onClick={ handleSubmit }
                        >
                            Registrar
                        </Button>
                        <Button
                            variant="contained"
                            color="inherit"
                            fullWidth
                            onClick={() => handleNavigate("/settings/projects/al")}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>

                <Snackbar
                    open={ snackbar.open }
                    autoHideDuration={ 6000 }
                    onClose={ handleCloseSnackbar }
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        variant="filled"
                        elevation={ 6 }
                        onClose={ handleCloseSnackbar }
                        severity={ snackbar.severity }
                    >
                        { snackbar.message }
                    </Alert>
                </Snackbar>

            </Container>
        </>
    )
}

export default ProjectALRegisterTemplate
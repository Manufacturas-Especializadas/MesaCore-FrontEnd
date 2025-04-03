import { Box, TextField, MenuItem, styled, Button, Paper, Typography, Grid2, Grid, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const RegisterPrinterTemplate = () => {
    const[formData, setFormData] = useState({
        nombreDelProyecto: "",
        solicitanteId: "",
        fechaDeSolicitud: new Date().toISOString(),
        archivo: "",
        comentarios: "",    
    });

    const[solicitante, setSolicitante] = useState([]);
    const[fileName, setFileName] = useState("");
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const[openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
        const getSolicitante = async () =>{
            try{
                const response = await fetch("https://app-mesa-mesacore-api-prod.azurewebsites.net/api/ImpresorasCobre/ObtenerListaSolicitante");
                const data = await response.json();
                setSolicitante(data);
            }catch(error){
                console.log("Error en el fetching", error);            
            }
        }
        getSolicitante();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if(file){
            setFormData((prevData) => ({
                ...prevData,
                archivo: file
            }));
            setFileName(file.name);
        }else{
            setFileName("");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const formDataToSend = new FormData();
            formDataToSend.append("nombreDelProyecto", formData.nombreDelProyecto);
            formDataToSend.append("solicitanteId", formData.solicitanteId);
            formDataToSend.append("fechaDeSolicitud", formData.fechaDeSolicitud);
            formDataToSend.append("comentarios", formData.comentarios);
            formDataToSend.append("formfile", formData.archivo);

            const response = await fetch("https://app-mesa-mesacore-api-prod.azurewebsites.net/api/ImpresorasDashboard/Registro", {
                method: "POST",
                body: formDataToSend,
            });

            if(!response.ok){
                const errorMessage = await response.text();
                throw new Error(`Error al registrar: ${errorMessage}`);
            }

            const data = await response.json();            
            setFormData({
                nombreDelProyecto: "",
                solicitanteId: "",
                fechaSolicitud: "",
                comentarios: "",
                archivo: ""
            });

            setFileName("");
            
            setOpenSnackbar(true);

        }catch(error){
            console.error(`Error al enviar los datos: ${error}`);
            setOpenErrorSnackbar(true);
        }
    }

    const handleNavigate = (path) => {
        navigate(path);
    };    

    return (
        <>
            <Paper
                sx={{
                    mx: "auto",                    
                    p: { xs: 2, sm: 3, md: 4 },
                    mb: 4,
                    maxWidth: {xs: "90%", sm: "80%", md: "70%"},
                    backgroundColor: "#f9f9f9",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)"
                }}
            >
                <Typography variant="h5" sx={{ 
                        fontWeight: "bold", 
                        textAlign: "center",
                        mb: 3,
                        fontSize: { xs: "1.25rem", sm: "1.5rem" }
                    }}>
                    Registro
                </Typography>

                <Grid2 spacing={ 2 }>
                    <Grid item xs={12} sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            variant="filled"
                            name="nombreDelProyecto"
                            label="Nombre del proyecto"
                            value={ formData.nombreDelProyecto || "" }
                            onChange={ handleChange }
                            sx={{
                                "& .MuiInputBase-root": {
                                    fontSize: { xs: "0.875rem", sm: "1rem" },
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mb: 3 }}>
                        <TextField
                            select
                            fullWidth
                            variant="filled"
                            label="Solicitante"
                            name="solicitanteId"
                            value={
                                solicitante.some((item) => item.id === formData.solicitanteId)
                                    ? formData.solicitanteId
                                    : ""
                            }
                            disabled={ solicitante.length === 0 }
                            onChange={ handleChange }
                            helperText="Selecciona el solicitante"
                            sx={{
                                "& .MuiInputBase-root": {
                                    fontSize: { xs: "0.875rem", sm: "1rem" },
                                },
                            }}
                        >                            
                            {solicitante.map((item) => (
                                <MenuItem key={ item.id } value={ item.id }>
                                    { item.nombre }
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    
                    <Grid item xs={12} sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            type="date"
                            variant="filled"
                            name="fechaDeSolicitud"
                            value={ formData.fechaDeSolicitud || "" }
                            onChange={handleChange}
                            helperText="Fecha de solicitud"
                            sx={{
                                "& .MuiInputBase-root": {
                                    fontSize: { xs: "0.875rem", sm: "1rem" },
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mb: 3 }}>
                        <TextField
                            multiline
                            fullWidth
                            maxRows={6}
                            variant="filled"
                            label="Comentarios"
                            name="comentarios"
                            value={formData.comentarios || ""}
                            onChange={handleChange}
                            helperText="Agrega comentarios adicionales (opcional)"
                            sx={{
                                "& .MuiInputBase-root": {
                                    fontSize: { xs: "0.875rem", sm: "1rem" },
                                },
                            }}
                        />
                    </Grid>

                {/* Upload de Archivos */}
                <Grid item xs={12}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            px: 4,
                            py: 1.5,
                            borderRadius: "8px",
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                    >

                        Subir Archivo
                        <VisuallyHiddenInput
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={ handleFileChange }
                        />
                        </Button>
                        {
                            fileName && (
                                <Typography
                                    variant="body"
                                    sx={{ 
                                            mt: 1, 
                                            ml: 2 , 
                                            color: "text.secondary", 
                                            fontStyle: "italic",
                                            fontSize: { xs: "0.875rem", sm: "1rem" },
                                        }}
                                >
                                    Archivo seleccionado: {fileName}
                                </Typography>
                            )
                        }
                    </Grid>
                </Grid2>

                <Box sx={{ 
                        mt: 4, 
                        display: "flex", 
                        justifyContent: "flex-end",
                        flexDirection: {xs: "column", sm: "row"},
                        gap: 2 
                    }}>
                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth={{ xs: true, sm: false }}
                        onClick={() => handleNavigate("/")}
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            px: 4,
                            py: 1.5,
                            borderRadius: "8px",
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        fullWidth={{ xs: true, sm: false }}
                        onClick={ handleSubmit }
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            px: 4,
                            py: 1.5,
                            borderRadius: "8px",
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                    >
                        REGISTRAR
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={ openSnackbar }
                autoHideDuration={ 3000 }
                onClick={() => setOpenSnackbar(false)}
                anchorOrigin={ { vertical: "top", horizontal: "right" } }
            >
                <Alert onClose={ () => setOpenSnackbar(false) } severity="success" sx={{ width: "100%" }} variant="filled">
                    ¡Solicitud enviada!
                </Alert>
            </Snackbar>

            <Snackbar
                open={ openErrorSnackbar }
                autoHideDuration={ 3000 }
                onClick={() => setOpenErrorSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={() => setOpenErrorSnackbar(false) } severity="error" sx={{ width: "100%" }} variant="filled">
                    Hubo un error en la solicitud
                </Alert>
            </Snackbar>
        </>
    )
}

export default RegisterPrinterTemplate
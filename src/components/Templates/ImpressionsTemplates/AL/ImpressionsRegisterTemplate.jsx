import { Alert, Box, Button, Container, Snackbar, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import config from "../../../../../config";

const ImpressionsRegisterTemplate = () => {
    const[formData, setFormData] = useState({
        codigo: "",
        version: "",
        fecha: "",
        pesoGr: "",
        longitud: "",
        tiempoImpresion: "",
        precioExterno: "",
        precioInterno: ""
    });
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const[sendingSnackbar, setSendingSnackbar] = useState(false);
    const[openErrorSanckbar, setOpenErrorSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        const parsedValue = ["pesoGr", "longitud", "tiempoImpresion", "precioExterno", "precioInterno"].includes(name)
            ? parseFloat(value) || ""
            : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: parsedValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSendingSnackbar(true);

        try{
            const formDataToSend = new FormData();
            formDataToSend.append("codigo", formData.codigo);
            formDataToSend.append("version", formData.version);
            formDataToSend.append("fecha", formData.fecha);
            formDataToSend.append("longitud", formData.longitud);
            formDataToSend.append("pesoGr", formData.pesoGr);
            formDataToSend.append("tiempoImpresion", formData.tiempoImpresion);
            formDataToSend.append("precioExterno", formData.precioExterno);
            formDataToSend.append("precioInterno", formData.precioInterno);

            const response = await fetch(`${config.apiUrl}/ImpresionesAl/RegistrarNuevaImpresion`, {
                method: "POST",
                body: formDataToSend
            });

            if(!response.ok){
                const errorMessage = await response.text();
                throw new Error(`Error al registrar: ${errorMessage}`);
            };

            const data = await response.json();
            setTimeout(() => {
                setFormData({
                    codigo: "",
                    version: "",
                    fecha: "",
                    pesoGr: "",
                    longitud: "",
                    tiempoImpresion: "",
                    precioExterno: "",
                    precioInterno: ""
                });

                handleNavigate("/settings/impressions/al");
            }, 1500);

            setOpenSnackbar(true);
        }catch(error){
            console.error(`Error al enviar los datos: ${error}`);
            setOpenErrorSnackbar(true);
        }finally{
            setSendingSnackbar(false);
        }
    }

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: 3,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ textTransform: "uppercase", fontWeight: "bold", mb: 3 }}>
                        Registro de impresiones de alumino
                    </Typography>

                    <TextField
                        required
                        fullWidth                    
                        label="Codigo"
                        name="codigo"
                        variant="outlined"
                        margin="normal"
                        value={ formData.codigo || "" }
                        onChange={ handleChange }
                    />

                    <TextField
                        required
                        fullWidth
                        type="number"
                        label="Versión"
                        name="version"
                        variant="outlined"
                        margin="normal"
                        value={ formData.version || "" }
                        onChange={ handleChange }
                    />

                    <TextField
                        required
                        fullWidth
                        type="date"
                        helperText="Fecha"
                        name="fecha"
                        variant="outlined"
                        margin="normal"
                        value={ formData.fecha || "" }
                        onChange={ handleChange }
                    />
                    
                    <TextField
                        required
                        fullWidth
                        type="number"
                        label="Peso(Gr)"
                        name="pesoGr"
                        variant="outlined"
                        margin="normal"
                        value={ formData.pesoGr || "" }
                        onChange={ handleChange }
                    />

                    <TextField
                        required
                        fullWidth
                        type="number"
                        label="Longitud"
                        name="longitud"
                        variant="outlined"
                        margin="normal"
                        value={ formData.longitud || "" }
                        onChange={ handleChange }
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Tiempo de impresión"
                        name="tiempoImpresion"
                        variant="outlined"
                        margin="normal"
                        value={ formData.tiempoImpresion || "" }
                        onChange={ handleChange }
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Precio externo"
                        name="precioExterno"
                        variant="outlined"
                        margin="normal"
                        value={ formData.precioExterno || "" }
                        onChange={ handleChange }
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Precio interno"
                        name="precioInterno"
                        variant="outlined"
                        margin="normal"
                        value={ formData.precioInterno || "" }
                        onChange={ handleChange }
                    />

                    <Button 
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 2}}
                        onClick={ handleSubmit }
                    >
                        REGISTRAR
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={() => handleNavigate("/settings/impressions/al")}
                    >
                        CANCELAR
                    </Button>
                </Box>
            </Container>

            <Snackbar
                open={ sendingSnackbar }
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <Alert 
                    severity="info"
                    sx={{
                        width: "100%"
                    }}
                    variant="filled"
                >
                    Registrando...
                </Alert>
            </Snackbar>

            <Snackbar
                open={ openSnackbar }
                autoHideDuration={ 3000 }
                onClick={() => setOpenErrorSnackbar(false)}
                anchorOrigin={{ 
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <Alert 
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                    variant="filled"
                >
                    ¡Se registro exitosamente!
                </Alert>
            </Snackbar>
        </>
    )
}

export default ImpressionsRegisterTemplate
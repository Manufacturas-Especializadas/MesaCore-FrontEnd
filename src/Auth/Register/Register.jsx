import { Alert, Avatar, Box, Button, Container, Grid2, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import config from "../../../config";

const Register = () => {
    const[formData, setFormData] = useState({
        nombre: "",
        correo: "",
        clave: "",
        rol: ""
    });
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const[sendingSnackbar, setSendingSnackbar] = useState(false);
    const[snackbarSeverity, setSnackbarSeverity] = useState("info");
    const[snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleCloseSnackbar = () =>{
        setOpenSnackbar(false);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSendingSnackbar(true);

        try{
            const response = await fetch(`${config.apiUrl}/Auth/Registrarse`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if(data.isSuccess){
                setFormData({
                    nombre: "",
                    correo: "",
                    clave: "",
                    rol: ""
                });
                setSnackbarMessage("Registro exitoso");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
            }else{
                setSnackbarMessage("Registro faillido");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }        
        }catch(error){
            setSnackbarMessage("Error al conectar con el servidor");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            console.log(`Error: ${error}`);
        }finally{
            setSendingSnackbar(false);
        }
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper
                    elevation={ 3 }
                    sx={{
                        marginTop: 8,
                        padding: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar sx={{ bgcolor: "#1976D2", marginBottom: 2 }}>
                        <LockOpenIcon/>
                    </Avatar>

                    <Typography component="h1" sx={{ mt: 3, mb: 3 }}>
                        Registro de usuario
                    </Typography>

                        <Box component="form" noValidate sx={{ m: "auto" }} onSubmit={ handleSubmit }>
                            <Grid2 container spacing={ 2 }>
                                <Grid2>
                                    <TextField
                                        required
                                        fullWidth
                                        variant="filled"
                                        label="Nombre"
                                        name="nombre"
                                        value={ formData.nombre || "" }
                                        onChange={ handleChange }
                                        sx={{ ml: 5}}
                                    />
                                </Grid2>

                                <Grid2>
                                    <TextField
                                        required
                                        fullWidth
                                        variant="filled"
                                        name="correo"
                                        label="Correo"
                                        type="email"
                                        value={ formData.correo || "" }
                                        onChange={ handleChange }
                                        autoComplete="email"
                                        sx={{ ml: 5 }}
                                    />
                                </Grid2>

                                <Grid2>
                                    <TextField
                                        required
                                        fullWidth
                                        variant="filled"
                                        name="clave"
                                        label="Contraseña"
                                        type="password"
                                        value={ formData.clave || "" }
                                        onChange={ handleChange }
                                        autoComplete="current-password"
                                        sx={{ ml: 5 }}
                                    />
                                </Grid2>

                                <Grid2>
                                    <TextField
                                        required
                                        fullWidth
                                        variant="filled"
                                        name="rol"
                                        label="Rol"
                                        value={ formData.rol || "" }
                                        onChange={ handleChange }
                                        sx={{ ml: 5 }}
                                    />
                                </Grid2>
                            </Grid2>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3 }}
                            >
                                Registrar
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                sx={{ mt: 2, mb: 1 }}                        
                            >
                                Cancelar
                            </Button>
                        </Box>
                </Paper>
            </Container>

            <Snackbar 
                open={ openSnackbar }
                autoHideDuration={ 300 }
                onClose={ handleCloseSnackbar }
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert 
                    onClose={ handleCloseSnackbar } 
                    severity={ snackbarSeverity }
                    sx={{ width: "100%" }}
                    variant="filled"
                >
                    { snackbarMessage }
                </Alert>
            </Snackbar>

            <Snackbar
                open={ sendingSnackbar }
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity="info"
                    sx={{ width: "100%" }}
                    variant="filled"
                >
                    Registrando...
                </Alert>
            </Snackbar>
        </>
    )
}

export default Register
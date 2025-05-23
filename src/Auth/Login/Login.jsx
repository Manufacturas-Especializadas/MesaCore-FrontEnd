import { Alert, Avatar, Box, Button, Container, Grid2, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { data, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import config from "../../../config";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const[snackbarMessage, setSnackbarMessage] = useState("");
    const[snackbarSeverity, setSnackbarSeverity] = useState("info");
    const[sendingSnackbar, setSendingSnackbar] = useState(false);
    const{ login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const handleNavigate = (path) =>{
        navigate(path);
    }

    const handleCloseSnackbar = () =>{
        setOpenSnackbar(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSendingSnackbar(true);

        const loginData = {
            correo: email,
            clave: password
        };

        try {
            const response = await fetch(`${config.apiUrl}/Auth/Login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (data.isSuccess && data.token) {
                localStorage.setItem("token", data.token);
                login(data.token);

                setSnackbarMessage("Inicio de sesión exitoso");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
                
                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 1000);
            } else {
                setSnackbarMessage("Credenciales incorrectas. Intenta de nuevo");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Error en el login:", error);
            setSnackbarMessage("Error al conectar con el servidor");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        } finally {
            setSendingSnackbar(false);
        }
    };
    

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper
                    elevation={ 3 }
                    sx={{
                        marginTop: 8,
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar sx={{ bgcolor: "#1976D2", marginBottom: 2 }}>
                        <LockOutlinedIcon/>
                    </Avatar>

                    <Typography component="h1" sx={{ mt: 3, mb: 3 }}>
                        Iniciar sesión
                    </Typography>

                    <Box component="form" noValidate sx={{ m: "auto"  }} onSubmit={ handleSubmit }>
                        <Grid2 container spacing={ 2 }>
                            <Grid2>
                                <TextField
                                    required
                                    fullWidth
                                    variant="filled"
                                    label="Correo electrónico"
                                    name="email"
                                    autoComplete="email"
                                    value={ email }
                                    onChange={ (e) => setEmail(e.target.value) }
                                    sx={{
                                        ml: 5
                                    }}
                                />
                            </Grid2>

                            <Grid2>
                                <TextField
                                    required
                                    fullWidth
                                    variant="filled"
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={ password }
                                    onChange={ (e) => setPassword(e.target.value) }
                                    sx={{
                                        ml: 5
                                    }}
                                />
                            </Grid2>
                        </Grid2>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar sesión
                        </Button>

                    </Box>
                </Paper>
            </Container>

            <Snackbar open={ openSnackbar } autoHideDuration={ 3000 } onClose={ handleCloseSnackbar } anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={ handleCloseSnackbar } severity={ snackbarSeverity } sx={{ width: '100%' }} variant="filled">
                    { snackbarMessage }
                </Alert>
            </Snackbar>

            <Snackbar open={ sendingSnackbar } anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert severity="info" sx={{ width: "100%" }} variant="filled">
                    Ingresando...
                </Alert>
            </Snackbar>
        </>
    )
}

export default Login
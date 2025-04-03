import { Alert, Avatar, Box, Button, Container, Grid2, Paper, Snackbar, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Logo from "../../assets/logomesa.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState(null);
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const[snackbarMessage, setSnackbarMessage] = useState("");
    const[snackbarSeverity, setSnackbarSeverity] = useState("info");
    const navigate = useNavigate();

    const handleNavigate = (path) =>{
        navigate(path);
    }

    const handleCloseSnackbar = () =>{
        setOpenSnackbar(false);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const loginData = {
            correo: email,
            clave: password
        };

        try{
            const response = await fetch("https://localhost:44350/api/Auth/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if(data.isSuccess){
                localStorage.setItem("token", data.token);
                setSnackbarMessage("Inicio de sesión exitoso");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);

                setTimeout(() => {
                    handleNavigate("/dashboard");
                }, 3000);

            }else{
                setSnackbarMessage("Credenciales incorrectas. Intenta de nuevo");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }
        }catch(error){
            setSnackbarMessage("Error al conectar con el servidor");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            console.log(`Error: ${error}`);
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

                        <Grid2 container justifyContent="flex-end">
                            <Grid2>
                                <Link href="/registerLogin" variant="body2">
                                    Registrate
                                </Link>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Paper>
            </Container>

            <Snackbar open={ openSnackbar } autoHideDuration={ 3000 } onClose={ handleCloseSnackbar } anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={ handleCloseSnackbar } severity={ snackbarSeverity } sx={{ width: '100%' }} variant="filled">
                    { snackbarMessage }
                </Alert>
            </Snackbar>
        </>
    )
}

export default Login
import { Alert, Box, Button, Grid, Grid2, MenuItem, Paper, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const RegisterImpressionsTemplate = () => {
    const[formData, setFormData] = useState({
        fixtureAl: "",
        fixtureCu: "",
        version: "",
        fecha: "",
        impresora: "",
        pesoGr: "",
        longitud: "",
        tiempoImpresion: "",
        precioExterno: "",
        precioInterno: ""
    });

    const[fixtureAl, setFixtureAl] = useState([]);
    const[fixtureCu, setFictureCu] = useState([]);
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const[openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const validateFormData = () => {
        const errors = [];

        if (!Number.isInteger(Number(formData.fixtureAlNavigation?.Codigo))) {
            errors.push("FixturesAl (código) es inválido o nulo");
        }

        if (!Number.isInteger(Number(formData.fixtureCuNavigation?.Codigo))) {
            errors.push("FixturesCu (código) es inválido o nulo");
        }

        if (!formData.version) {
            errors.push("Versión es obligatoria");
        }

        if (!formData.impresora) {
            errors.push("Impresora es obligatoria");
        }

        if (!formData.pesoGr) {
            errors.push("Peso (gr) es obligatorio");
        }

        if (!formData.longitud) {
            errors.push("Longitud es obligatoria");
        }

        if (!formData.tiempoImpresion) {
            errors.push("Tiempo de impresión es obligatorio");
        }

        if (!formData.precioExterno) {
            errors.push("Precio externo es obligatorio");
        }

        if (!formData.precioInterno) {
            errors.push("Precio interno es obligatorio");
        }

        if (errors.length > 0) {
            console.error("Errores de validación:", errors);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFormData()) {
            return;
        }

        try {
            const payload = {
                fixturesAl: Number(formData.fixtureAlNavigation?.Codigo) || null,
                fixturesCu: Number(formData.fixtureCuNavigation?.Codigo) || null,
                Version: formData.version,
                Impresora: formData.impresora,
                PesoGr: formData.pesoGr,
                Longitud: formData.longitud,
                TiempoImpresion: formData.tiempoImpresion,
                PrecioExterno: formData.precioExterno,
                PrecioInterno: formData.precioInterno,
            };

            if (
                !Number.isInteger(Number(formData.fixtureAlNavigation?.Codigo)) ||
                !Number.isInteger(Number(formData.fixtureCuNavigation?.Codigo)) ||
                !formData.version ||
                !formData.impresora ||
                !formData.pesoGr ||
                !formData.longitud ||
                !formData.tiempoImpresion ||
                !formData.precioExterno ||
                !formData.precioInterno
            ) {
                console.error("Faltan campos obligatorios o los valores no son válidos");
                return;
            }

            const response = await fetch("https://localhost:44350/api/Impresiones/Registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error al registrar: ${errorMessage}`);
            }

            const data = await response.json();
            console.log("Registro exitoso:", data);

            setFormData({
                fixtureAlNavigation: null,
                fixtureCuNavigation: null,
                version: "",
                impresora: "",
                pesoGr: "",
                longitud: "",
                tiempoImpresion: "",
                precioExterno: "",
                precioInterno: "",
            });

            setOpenSnackbar(true);
        } catch (error) {
            console.error(`Error al enviar los datos: ${error}`);
            setOpenErrorSnackbar(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchFixtureAl = async () => {
            try{
                const response = await fetch("https://localhost:44350/api/Impresiones/ObtenerFixturesAl");

                if(!response.ok){
                    throw new Error(`Error al hacer fetching: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Datos recibidos del backend:", data);
                setFixtureAl(data);
            }catch(error){
                console.log(`Error: ${error}`);
            }
        };
        fetchFixtureAl();
    }, []);

    useEffect(() => {
        const fetchFixtureCu = async () => {
            try{
                const response = await fetch("https://localhost:44350/api/Impresiones/ObtenerFixturesCu");

                if(!response.ok){
                    throw new Error(`Error al hacer fetching: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Datos recibidos del backend:", data);
                setFictureCu(data);
            }catch(error){
                console.log(`Error: ${error}`);
            } 
        };

        fetchFixtureCu();
    }, []);

    return (
        <>
            <form onSubmit={ handleSubmit }>
                <Paper
                    sx={{
                        mx: "auto",
                        p: { xs: 2, sm: 3, md: 4 },
                        mb: 4,
                        maxWidth: { xs: "90%", sm: "80%", md: "70%" },
                        backgroundColor: "#f9f9f9",
                        borderRadius: "16px",
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            mb: 3,
                            fontSize: { xs: "1.25rem", sm: "1.5rem" }
                        }}
                    >
                        Registro
                    </Typography>

                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                name="fixtureAl"
                                label="FixtureAl"
                                value={fixtureAl.some((item) => item.id === formData.fixtureAl)
                                    ? formData.fixtureAl
                                    : ""
                                }
                                disabled={fixtureAl.length === 0}
                                onChange={ handleChange }
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: { xs: "0.875rem", sm: "1rem" },
                                    },
                                }}
                            >
                                {fixtureAl.map((item) => (
                                    <MenuItem key={ item.id } value={ item.id }>
                                        { item.fixtureAl }
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="FixtureCu"
                                name="fixtureCu"
                                value={
                                    fixtureCu.some((item) => item.id === formData.fixtureCu)
                                        ? formData.fixtureCu
                                        : ""
                                }
                                disabled={ fixtureCu.length === 0 }
                                onChange={ handleChange }
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: { xs: "0.875rem", sm: "1rem" },
                                    },
                                }}
                            >
                                {fixtureCu.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.fixtureCu}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Versión"
                                name="version"
                                type="number"
                                value={ formData.version || "" }
                                onChange={ handleChange }
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: { xs: "0.875rem", sm: "1rem" },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Impresora"
                                name="impresora"
                                value={ formData.impresora || "" }
                                onChange={ handleChange }
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: { xs: "0.875rem", sm: "1rem" },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Peso(Gr)"
                                type="number"
                                name="pesoGr"
                                value={ formData.pesoGr || "" }
                                onChange={ handleChange }
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: { xs: "0.875rem", sm: "1rem" },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Longitud(M)"
                                type="number"
                                name="longitud"
                                value={ formData.longitud || "" }
                                onChange={ handleChange }
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: { xs: "0.875rem", sm: "1rem" },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Tiempo impresión"
                                type="number"
                                name="tiempoImpresion"
                                value={ formData.tiempoImpresion || "" }
                                onChange={ handleChange }
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: { xs: "0.875rem", sm: "1rem" },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Precio externo"
                                type="number"
                                name="precioExterno"
                                value={ formData.precioExterno || "" }
                                onChange={ handleChange }
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: { xs: "0.875rem", sm: "1rem" },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Precio interno"
                                type="number"
                                name="precioInterno"
                                value={ formData.precioInterno || "" }
                                onChange={ handleChange }
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: { xs: "0.875rem", sm: "1rem" },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 1 }}>
                            <Button 
                                variant="contained" 
                                color="error" 
                                onClick={() => handleNavigate("/settings/impressions")}
                                sx={{ px: 3 }}
                            >
                                Cancelar
                            </Button>
                            
                            <Button 
                                variant="contained" 
                                color="success" 
                                type="submit"
                                sx={{ px: 3 }}
                            >
                                Registrar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </form>

            <Snackbar
                open={ openSnackbar }
                autoHideDuration={ 3000 }
                onClick={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right"}}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
                    ¡Registro guardado!
                </Alert>
            </Snackbar>

            <Snackbar
                open={ openErrorSnackbar }
                autoHideDuration={ 3000 }
                onClick={() => setOpenErrorSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error" variant="filled">
                    Hubo un error en el registro
                </Alert>
            </Snackbar>
        </>
    )
}

export default RegisterImpressionsTemplate
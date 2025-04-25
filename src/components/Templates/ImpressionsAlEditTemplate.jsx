import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import config from "../../../config";

const ImpressionsAlEditTemplate = () => {
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
    const { id } = useParams();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

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

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const formDataToSend = new FormData();

            formDataToSend.append("codigo", formData.codigo);
            formDataToSend.append("version", formData.version);
            formDataToSend.append("fecha", formData.fecha);
            formDataToSend.append("pesoGr", formData.pesoGr);
            formDataToSend.append("longitud", formData.longitud);
            formDataToSend.append("tiempoImpresion", formData.tiempoImpresion);
            formDataToSend.append("precioExterno", formData.precioExterno);
            formDataToSend.append("precioInterno", formData.precioInterno);

            const response = await fetch(`${config.apiUrl}/ImpresionesAl/EditarRegistro/${formData.id}`, {
                method: 'PUT',
                body: formDataToSend
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(`Error al actualizar: ${response.status} - ${errorData.message}`);
            };

            setTimeout(() => {
                handleNavigate("/settings/impressions/al");
            }, 1500);
        }catch(error){
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        if(!id) {
            console.error("Id invalido", id);
            return;
        };

        const getImpressionsById = async() => {
            try{
                const response = await fetch(`${config.apiUrl}/ImpresionesAl/ObtenerPorId?id=${id}`);

                if(!response.ok){
                    throw new Error(`Error ${response.status}${response.statusText}`);
                };

                const data = await response.json();
                const formattedData = {
                    ...data,
                    fecha: data.fecha ? new Date(data.fecha).toISOString().split("T")[0] : ""
                };

                setFormData(formattedData);
            }catch(error){
                console.log("Error obteniendo la impresión: ", error);
            }
        };

        getImpressionsById();
    }, [id]);

    return (
        <>
            <Container>
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
                        Editar
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
                        color="info"
                        sx={{ mt: 2 }}
                        onClick={ handleSubmit }
                    >
                        EDITAR
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
        </>
    )
}

export default ImpressionsAlEditTemplate
import { useState, useEffect } from "react";
import { MenuItem, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EditCUTemplate = () => {
    const[formData, setFormData] = useState({
        codigo: "",
        plantaId: "",
        solicitanteId: "",
        clienteId: "",
        nDibujo: "",
        nParte: "",
        revision: "",
        entregaLaboratorio: "",
        fai: "",
        liberacionLaboratorio: "",
        fechaDeLaSolicitud: "",
        estatusId: "",
        comentarios: "",
        estatusProyectoId: "",
    });

    const[planta, setPlanta] = useState([]);
    const[cliente, setCliente] = useState([]);
    const[solicitante, setSolicitante] = useState([]);
    const[estatusProyecto, setEstatusProyecto] = useState([]);
    const[estatus, setEstatus] = useState([]);
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            console.error("ID de la impresora es inválido:", id);
            return;
        }

        const getPrinterById = async () => {
            try {
                const response = await fetch(`https://app-mesa-mesacore-api-prod.azurewebsites.net/api/ImpresorasCobre/ObtenerImpresoraCobrePorId/${id}`);
                
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                const formattedData = {
                    ...data,
                    entregaLaboratorio: data.entregaLaboratorio ? new Date(data.entregaLaboratorio).toISOString().split("T")[0] : "",
                    liberacionLaboratorio: data.liberacionLaboratorio ? new Date(data.liberacionLaboratorio).toISOString().split("T")[0] : "",
                };

                setFormData(formattedData);
            } catch (error) {
                console.error("Error obteniendo la impresora:", error);
            }
        };

        getPrinterById();
    }, [id]);

    useEffect(() => {
        const getPlanta = async () =>{
            try{
                const reponse = await fetch("https://app-mesa-mesacore-api-prod.azurewebsites.net/api/ImpresorasCobre/ObtenerListaPlanta");
                const data = await reponse.json();
                setPlanta(data);
            }catch(error){
                console.log("Error en el fetching", error);
            }
        };

        getPlanta();
    }, []);

    useEffect(() => {     
        const fetchEstatus = async () => {
            try{
                const response = await fetch("https://app-mesa-mesacore-api-prod.azurewebsites.net/api/ImpresorasCobre/ObtenerListaEstatusProyecto");
    
                if(!response.ok){
                    throw new Error(`Error al hacer fetching: ${response.statusText}`);
                }
    
                const data = await response.json();
                console.log("Respuesta del backend:", data);
                setEstatusProyecto(data);
            }catch(error){
                console.log(`Error: ${error}`);
            }
        }
        fetchEstatus();
    }, []);

    useEffect(() => {
        const getCliente = async () => {
            try{
                const response = await fetch("https://app-mesa-mesacore-api-prod.azurewebsites.net/api/ImpresorasCobre/ObtenerListaCliente");
                const data = await response.json();
                setCliente(data);
            }catch(error){
                console.log("Error en el fetching", error);
            }
        };
        getCliente();
    }, []);

    useEffect(() => {
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

    useEffect(() => {
        const getEstatus = async () => {
            try{
                const response = await fetch("https://app-mesa-mesacore-api-prod.azurewebsites.net/api/ImpresorasCobre/ObtenerListaEstatus");
                const data = await response.json();
                setEstatus(data);
            }catch(error){
                console.log("Error en el fetching", error);
            }
        };
        getEstatus();
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            if (name === "fai") {

                if (value === "" || parseFloat(value) >= 0) {
                    return { ...prevData, [name]: value };
                }
                return prevData;
            }

            return { ...prevData, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = { ...formData };

        if (dataToSend.fai === "") {
            dataToSend.fai = null;
        }

        if (dataToSend.comentarios === "") {
            dataToSend.comentarios = null;
        }

        if(dataToSend.entregaLaboratorio === ""){
            dataToSend.entregaLaboratorio = null
        };

        if(dataToSend.liberacionLaboratorio === ""){
            dataToSend.liberacionLaboratorio = null
        };

        const response = await fetch("https://app-mesa-mesacore-api-prod.azurewebsites.net/api/ImpresorasCobre/Actualizar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)            
        });

        setOpenSnackbar(true);

        setTimeout(() => {
            handleNavigate("/settings/printers/cu");
        }, 3000);

        if(!response.ok){
            throw new Error(`Error al registrar: ${response.status}${response.statusText}`);
        }
    };


    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title"> EDITAR - FX </h2>

                    <form onSubmit={ handleSubmit } className="card-form">

                        <TextField
                            fullWidth
                            label="Nombre del proyecto"
                            required
                            variant="outlined"
                            name="nombreDelProyecto"
                            value={ formData.nombreDelProyecto || "" }
                            onChange={ handleChange }
                        />

                        <TextField
                            required
                            fullWidth
                            select                            
                            variant="outlined"
                            label="Estatus del proyecto"
                            name="estatusProyectoId"
                            value={
                                estatusProyecto.some((item) => item.id === formData.estatusProyectoId)
                                    ? formData.estatusProyectoId
                                    : ""
                            }
                            disabled={ estatusProyecto.length === 0 }
                            onChange={ handleChange }
                            sx={{
                                minWidth: "200px",
                                mr: 5,
                                "& .MuiInputBase-root": {
                                    fontSize: { xs: "0.875rem", sm: "1rem" },
                                },
                            }}
                        >                            
                            {estatusProyecto.map((item) => (
                                <MenuItem key={ item.id } value={ item.id }>
                                    { item.nombre }
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            type="date"
                            variant="outlined"
                            name="fechaDeLaSolicitud"
                            helperText="Fecha de la solicitud del proyecto"
                            value={ formData.fechaDeLaSolicitud || "" }
                            onChange={ handleChange }
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Codigo"
                            name="codigo"
                            value={ formData.codigo || "" }
                            onChange={ handleChange }
                        />

                        <TextField
                            select
                            required
                            fullWidth
                            variant="outlined"
                            label="Solicitante"
                            name="solicitanteId"
                            value={ solicitante.some((item) => item.id === formData.solicitanteId) ? formData.solicitanteId : "" }
                            disabled={ solicitante.length === 0 }
                            onChange={ handleChange }
                        >
                            {
                                solicitante.map((item) => (
                                    <MenuItem key={ item.id } value={ item.id }>
                                        { item.nombre }
                                    </MenuItem>
                                ))
                            }
                        </TextField>

                        <TextField
                            select
                            required
                            fullWidth
                            variant="outlined"
                            label="Planta"
                            name="plantaId"
                            value={ planta.some((item) => item.id === formData.plantaId) ? formData.plantaId : "" }
                            disabled={ planta.length === 0 }
                            onChange={ handleChange }
                        >
                            {
                                planta.map((item) => (
                                    <MenuItem key={ item.id } value={ item.id }>
                                        { item.nombre }
                                    </MenuItem>
                                ))
                            }
                        </TextField>

                        <TextField
                            select
                            required
                            fullWidth
                            variant="outlined"
                            label="Cliente"
                            name="clienteId"
                            value={ cliente.some((item) => item.id === formData.clienteId) ? formData.clienteId : "" }
                            disabled={ cliente.length === 0 }
                            onChange={ handleChange }
                        >
                            {
                                cliente.map((item) => (
                                    <MenuItem key={ item.id } value={ item.id }>
                                        { item.nombre }
                                    </MenuItem>
                                ))

                            }
                        </TextField>

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="No.Dibujo"
                            name="nDibujo"
                            value={ formData.nDibujo || "" }
                            onChange={ handleChange }
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="No.Parte"
                            name="nParte"
                            value={ formData.nParte || "" }
                            onChange={ handleChange }
                            
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Revisión"
                            name="revision"
                            value={ formData.revision || "" }
                            onChange={ handleChange }
                        />
                    
                        <TextField
                            fullWidth
                            type="date"
                            variant="outlined"
                            name="entregaLaboratorio"
                            helperText="Entrega laboratorio"
                            value={ formData.entregaLaboratorio || ""}
                            onChange={ handleChange }
                        />

                        <TextField
                            fullWidth
                            type="date"
                            variant="outlined"
                            name="liberacionLaboratorio"
                            helperText="Liberación laboratorio"
                            value={ formData.liberacionLaboratorio || "" }
                            onChange={ handleChange }
                        />

                        <TextField
                            select
                            required
                            variant="outlined"
                            label="Estatus"
                            name="estatusId"
                            value={ estatus.some((item) => item.id === formData.estatusId) ? formData.estatusId : "" }
                            disabled={ estatus.length === 0 }
                            onChange={ handleChange }
                        >
                            {
                                estatus.map((item) => (
                                    <MenuItem key={ item.id } value={ item.id }>
                                        { item.nombre }
                                    </MenuItem>
                                ))
                            }
                        </TextField>

                        <TextField
                            type="number"
                            fullWidth
                            variant="outlined"
                            label="FAI"
                            name="fai"
                            value={ formData.fai || "" }
                            onChange={ handleChange }
                        />


                        <TextField                        
                            multiline
                            fullWidth
                            maxRows={ 6 }
                            variant="outlined"
                            label="Comentarios"
                            name="comentarios"
                            value={ formData.comentarios || "" }
                            onChange={ handleChange }
                        />

                        <div className="card-actions">
                            <Button
                                color="error"
                                size="large"
                                variant="outlined"
                                onClick={() => handleNavigate("/settings/printers/cu")}
                            >
                                CANCELAR
                            </Button>
                            <Button
                                color="primary"
                                size="large"
                                variant="outlined"
                                type="submit"
                            >
                                ACTUALIZAR
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <Snackbar
                open={ openSnackbar }
                autoHideDuration={ 5000 }                
                onClose={ () => setOpenSnackbar(false) }
                anchorOrigin={ { vertical: "top", horizontal: "right" } }
            >
                <Alert onClose={ () => setOpenSnackbar(false) } severity="info" sx={{ width: "100>%" }} variant="filled">
                    ¡Registro actualizado!
                </Alert>
            </Snackbar>
        </>
    )
}

export default EditCUTemplate
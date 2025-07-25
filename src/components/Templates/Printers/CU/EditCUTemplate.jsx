import { useState, useEffect } from "react";
import { MenuItem, TextField, Button, Snackbar, Alert, styled, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import config from "../../../../../config";

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

const EditALTemplate = () => {
    const[formData, setFormData] = useState({
        proyectoId: "",
        codigo: "",
        clienteId: "",
        nDibujo: "",
        nParte: "",
        revision: "",
        entregaLaboratorio: null,
        fai: "",
        liberacionLaboratorio: null,
        estatusId: "",
        comentarios: "",
        archivoFai: null,
    });

    const[listaProyecto, setListaProyecto] = useState([]);
    const[cliente, setCliente] = useState([]);
    const[estatus, setEstatus] = useState([]);
    const[openSnackbar, setOpenSnackbar] = useState(false);
    const[fileName, setFileName] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            console.error("ID de la impresora es inválido:", id);
            return;
        }

        const getPrinterById = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/ImpresorasCobre/ObtenerImpresoraCobrePorId/${id}`);
                
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
        const getListaProyecto = async () => {
            try{
                const response = await fetch(`${config.apiUrl}/ImpresorasCobre/ObtenerListaProyectosCu`);
                const data = await response.json();
                setListaProyecto(data);
            }catch(error){
                console.error("Error en el fetching: ", error);
            }
        }

        getListaProyecto();
    }, []);

    useEffect(() => {
        const getCliente = async () => {
            try{
                const response = await fetch(`${config.apiUrl}/ImpresorasCobre/ObtenerListaCliente`);
                const data = await response.json();
                setCliente(data);
            }catch(error){
                console.log("Error en el fetching", error);
            }
        };
        getCliente();
    }, []);


    useEffect(() => {
        const getEstatus = async () => {
            try{
                const response = await fetch(`${config.apiUrl}/ImpresorasCobre/ObtenerListaEstatus`);
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
            let updateValue = value

            if(name === "fai" && value === ""){
                updateValue = null;
            }

            if(name === "comentarios" && value === ""){
                updateValue = null;
            }

            return { ...prevData, [name]: updateValue }
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                archivoFai: file,
            }));
            setFileName(file.name);
        } else {
            console.warn("No se seleccionó ningún archivo");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("proyectoId", formData.proyectoId);
            formDataToSend.append("codigo", formData.codigo);
            formDataToSend.append("clienteId", formData.clienteId);
            formDataToSend.append("nDibujo", formData.nDibujo);
            formDataToSend.append("nParte", formData.nParte);
            formDataToSend.append("revision", formData.revision);
            formDataToSend.append("EntregaLaboratorio", formData.entregaLaboratorio ?? "");
            formDataToSend.append("fai", formData.fai ?? "");
            formDataToSend.append("LiberacionLaboratorio", formData.liberacionLaboratorio ?? "");
            formDataToSend.append("estatusId", formData.estatusId);
            formDataToSend.append("comentarios", formData.comentarios ?? "");
            formDataToSend.append("FormFile", formData.archivoFai || null); 

            if(formData.archivoFai){
                formDataToSend.append("FormFile", formData.archivoFai);
            } else{
                formDataToSend.append("FormFile", "");
            }

            const response = await fetch(`${config.apiUrl}/ImpresorasCobre/Actualizar/${formData.id}`, {
                method: 'PUT',
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al actualizar: ${response.status} - ${errorData.message}`);
            }

            setOpenSnackbar(true);
            setTimeout(() => {
                handleNavigate("/settings/printers/cu");
            }, 3000);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title"> EDITAR - FX </h2>

                    <form onSubmit={ handleSubmit } className="card-form">

                    <TextField
                        select
                        required
                        fullWidth
                        variant="outlined"
                        label="Nombre del proyecto"
                        name="proyectoId"
                        value={formData.proyectoId || ""}
                        disabled={estatus.length === 0}
                        onChange={handleChange}
                    >
                        {listaProyecto.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.nombreDelProyecto}
                            </MenuItem>
                        ))}
                    </TextField>

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
                        fullWidth
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
                            accept=".pdf"
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

export default EditALTemplate
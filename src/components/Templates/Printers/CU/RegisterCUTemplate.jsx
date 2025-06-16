import { Alert, Button, MenuItem, Snackbar, TextField, styled, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const RegisterCUTemplate = () => {
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
    const[loading, setLoading] = useState(false);
    const[fileName, setFileName] = useState("");
    const navigate = useNavigate();    

    useEffect(() => {
        const getListaProyecto = async () => {
            try{
                const response = await fetch(`${config.apiUrl}/ImpresorasCobre/ObtenerListaProyectosCu`);
                const data = await response.json();
                console.log("Lista de proyecto", data);
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const validateFormData = () => {
                const requiredFields = [
                    "proyectoId",
                    "codigo",
                    "clienteId",
                    "nDibujo",
                    "nParte",
                    "revision",
                    "estatusId",
                ];

                for (const field of requiredFields) {
                    if (!formData[field]) {
                        throw new Error(`Campo obligatorio faltante: ${field}`);
                    }
                };

                if (formData.entregaLaboratorio === null) {
                    console.warn("El campo 'entregaLaboratorio' está vacío. Se enviará como null.");
                }

                if (formData.liberacionLaboratorio === null) {
                    console.warn("El campo 'liberacionLaboratorio' está vacío. Se enviará como null.");
                }
                
                if (!formData.archivoFai) {
                    console.warn("No se seleccionó ningún archivo. Se enviará como null.");
                }
                if (!formData.comentarios) {
                    console.warn("El campo 'comentarios' está vacío. Se enviará como null.");
                }
                if (formData.fai === undefined) {
                    console.warn("El campo 'fai' no está definido. Se enviará como null.");
                }
            };

            validateFormData();

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

            const response = await fetch(`${config.apiUrl}/ImpresorasCobre/Registrar`, {
                method: "POST",
                body: formDataToSend,
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json(); 
                } catch (jsonError) {                    
                    errorData = { message: response.statusText };
                }
                throw new Error(`Error al registrar: ${response.status} - ${errorData.message}`);
            }

            const data = await response.json();

            setOpenSnackbar(true);
            setTimeout(() => {
                handleNavigate("/settings/printers/cu");
            }, 3000);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }finally{
            setLoading(false);
        }
    };

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

    const handleNavigate = (path) => {
        navigate(path);
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title"> REGISTRO -  FX</h2>
                    <form className="card-form" onSubmit={ handleSubmit }>
                        
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
                            color="success"
                            size="large"
                            variant="outlined"
                            type="submit"
                        >
                            GUARDAR
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
                <Alert onClose={ () => setOpenSnackbar(false) } severity="success" sx={{ width: "100>%" }} variant="filled">
                    ¡Registro exitoso!
                </Alert>
            </Snackbar>

            <Snackbar
                open={ loading }
                anchorOrigin={{ vertical: "top", horizontal: "right" }}                
            >
                <Alert severity="info" sx={{ width: "100%" }} variant="filled">
                    Enviando registro...Por favor espera
                </Alert>
            </Snackbar>
        </>
    )
}

export default RegisterCUTemplate
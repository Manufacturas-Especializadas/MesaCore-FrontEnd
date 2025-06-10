import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ProjectCUDeleteTemplate from "./ProjectCUDeleteTemplate";
import config from "../../../../../config";

const ProjectCUIndexTemplate = () => {
    const[projectsCU, setProjectsCU] = useState([]);
    const[openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const[projectDelete, setProjectDelete] = useState(null);
    const navigate = useNavigate();
    const[snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const columns = [
        {
            name: "Nombre del proyecto",
            selector: row => row.nombreDelProyecto,
            center: "center",
            sortable: true
        },
        {
            name: "Fecha de la solicitud",
            selector: row => row.fechaDeLaSolicitud,
            center: "center"
        },
        {
            name: "Estatus",
            selector: row => row.estatus,
            center: "center"
        },
        {
            name: "Planta",
            selector: row => row.planta, 
            center: "center"
        },
        {
            name: "Solicitante",
            selector: row => row.solicitante, 
            center: "center"
        },
        {
            name: "Acciones",
            cell: row => (
                <div className="flex gap-2">
                    <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => handleNavigate(`/settings/projects/cu/edit/${row.id}`)}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                            setProjectDelete(row);
                            setOpenConfirmDialog(true);
                        }}
                    >
                        Eliminar
                    </Button>
                    
                    <ProjectCUDeleteTemplate
                        open={ openConfirmDialog && projectDelete?.id === row.id }
                        onClose={() => setOpenConfirmDialog(false)}
                        onConfirm={ handleDelete }
                        itemName={ row.nombreDelProyecto }
                    />
                </div>
            ),
            center: "center",
        }
    ];

    useEffect(() => {
        const fetchingProjects = async () => {
            try{
                const response = await fetch(`${config.apiUrl}/ProyectosCU/ObtenerListaDeProyectos`);

                if(!response.ok){
                    throw new Error("Error al hacer fetching");
                }

                const data = await response.json();
                console.log(data);
                setProjectsCU(data);
            }catch(error){
                console.error("Error al obtener los datos: ", error);
            }  
        }

        fetchingProjects();
    }, []);

    const handleDelete = async () => {
        const id = projectDelete?.id;
    
        if (!id) {
            console.error("No se encontró el ID del proyecto");
            setSnackbar({
                open: true,
                message: "ID del proyecto no encontrado",
                severity: "error"
            });
            return;
        }
    
        try {
            const response = await fetch(`${config.apiUrl}/ProyectosCU/Eliminar?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (!response.ok) throw new Error("Error al eliminar");
    
            setProjectsCU(projectsCU.filter(project => project.id !== id));
    
            setSnackbar({
                open: true,
                message: "Proyecto eliminado correctamente",
                severity: "success"
            });
    
        } catch (error) {
            console.error("Error al eliminar el proyecto: ", error.message);
            setSnackbar({
                open: true,
                message: "No se pudo eliminar el proyecto",
                severity: "error"
            });
        } finally {
            setOpenConfirmDialog(false);
            setProjectDelete(null);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between
                    items-center sm:items-center gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold">
                        Lista de proyecto CU
                    </h2>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleNavigate("/settings/projects/cu/register")}
                    >
                        Agregar
                    </Button>
                </div>

                <DataTable
                    columns={ columns }
                    data={ projectsCU }
                    pagination
                    highlightOnHover
                    responsive
                    noDataComponent="No hay registros disponibles"
                    className="border border-gray-200 rounded shadow-md bg-white"
                />
            </div>

            <Snackbar
                open={ snackbar.open }
                autoHideDuration={ 6000 }
                onClose={() => setSnackbar({...snackbar, open: false})}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    elevation={ 6 }
                    variant="filled"
                    onClose={() => setSnackbar({...snackbar, open: false})}
                    severity={ snackbar.severity }
                >
                    { snackbar.message }
                </Alert>
            </Snackbar>
        </>
    )
}

export default ProjectCUIndexTemplate
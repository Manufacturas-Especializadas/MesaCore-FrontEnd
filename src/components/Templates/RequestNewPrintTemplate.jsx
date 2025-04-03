import { Button, Paper, Typography } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";

const RequestNewPrintTemplate = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <Paper
                elevation={ 3 }
                sx={{
                    p: 4,
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)"
                }}
            >
                <Typography
                    variant="h5"
                    component="h5"
                    sx={{ fontWeight: "bold", mb: 1 }}
                >
                    Solicitar una nueva impresión
                </Typography>
                <Typography 
                    variant="body1"
                    sx={{ mb: 3, color: "#555" }}
                >
                    Completa el siguiente formulario
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<AddCircleOutlineRoundedIcon/>}
                    onClick={() => handleNavigate("/register")}
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        px: 4,
                        py: 1.5,
                        borderRadius: "8px"
                    }}
                >
                    Iniciar solicitud
                </Button>
            </Paper>
        </>
    )
}

export default RequestNewPrintTemplate
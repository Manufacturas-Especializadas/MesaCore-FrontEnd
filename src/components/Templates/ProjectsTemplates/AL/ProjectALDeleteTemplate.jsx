import { 
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle
} from "@mui/material";

const ProjectALDeleteTemplate = ({ open, onClose, onConfirm, itemName }) => {
    return (
        <>
            <Dialog
                open={ open }
                onClose={ onClose }
                aria-label="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alet-dialog-title">Eliminar proyecto</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas eliminar el proyecto {" "}
                        <strong>{ itemName || "este proyecto" }</strong>? Esta acción no se puede deshacer
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" onClick={ onClose } color="inherit">
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={ onConfirm } color="error" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ProjectALDeleteTemplate
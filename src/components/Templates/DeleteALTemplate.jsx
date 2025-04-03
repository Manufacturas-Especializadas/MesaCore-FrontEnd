import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const DeleteALTemplate = ({ open, onClose, onDelete }) => {

    return (
        <>
            <Dialog open={ open } onClose={ onClose }>
                <DialogTitle> Eliminar registro </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ onClose } color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={ onDelete } color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteALTemplate
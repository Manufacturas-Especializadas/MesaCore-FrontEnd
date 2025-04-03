import { Box, Button, Grid, Grid2, TextField, Typography } from "@mui/material";

const FilterSectionDashboard = () => {
    return (
        <>
            <Box
                sx={{
                    p: 3,
                    mb: 4,
                    backgroundColor: "#f9f9f9",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)"
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Filtrar
                </Typography>
                <Grid container spacing={ 2 }>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                fullWidth
                                label="Código"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>

                        <Grid item sx={ 12 } sm={ 6 }>
                            <TextField
                                fullWidth
                                label="N.Parte"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                        >
                            Aplicar filtrar
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                        >
                            Limpiar filtros
                        </Button>
                    </Box>
            </Box>
        </>
    )
}

export default FilterSectionDashboard
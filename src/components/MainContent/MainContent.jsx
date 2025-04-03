import { styled, Typography } from "@mui/material"

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("magin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${240}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0,
        }),
    })
)

const MainContent = ({ open }) => {
    return (
        <>
            <Main open={ open }>
                <Typography paragraph>
                Bienvenido al dashboard. Aquí puedes ver tus estadísticas y gestionar
                tus datos.
                </Typography>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                    odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
                    quis sem at nibh elementum imperdiet.
                </Typography>
            </Main>
        </>
    )
}

export default MainContent
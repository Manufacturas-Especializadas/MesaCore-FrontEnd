import { Card, CardActionArea, CardContent, Icon, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { carData } from "../../../data/cardData";
import { useAuth } from "../../../context/AuthContext";

const SettingsTemplates = () => {
    const { user } = useAuth();
    const role = user?.role || "";

    const items = carData({ role });

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                    gap-3 justify-center items-center min-h-screen">                
                {
                    items.map((item) => (
                        <Link key={ item.title } to={ item.path } className="underline-none">
                            <Card sx={{
                                    maxWidth: 345,
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                                    },
                                    marginLeft: '5rem'
                                }}>
                                <CardActionArea>
                                    <div className="flex justify-center items-center h-36 bg-gray-100">
                                        <Icon className="large" sx={{fontSize: '4rem'}}> { item.icon } </Icon>
                                    </div>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}>
                                            { item.title }
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center'}}>
                                            { item.subtitle }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default SettingsTemplates
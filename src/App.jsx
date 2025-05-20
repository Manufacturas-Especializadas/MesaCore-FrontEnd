import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import MyRoutes from "./Routes/Routes";
import Sidebar3 from "./components/Sidebar/Sidebar3";

function App() {
  const[open, setOpen] = useState(false);
  const[mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () =>{
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
          <Navbar handleDrawerOpen={handleDrawerToggle} />

          <Box sx={{ display: "flex", flexGrow: 1, width: "100%", overflow: "hidden" }}>
            <Sidebar3 
              open={isMobile ? mobileOpen : open}
              onClose={() => {
                if (isMobile) setMobileOpen(false);
                else setOpen(false);
              }}
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />

            {/* Contenido principal */}
            <Box
              component="main"
              sx={{
                marginTop: 1,
                flexGrow: 1,
                p: 3,
                overflowY: "auto",
                width: {
                  xs: "100%",
                  sm: `calc(100% - ${isMobile ? 0 : open ? 240 : 60}px)`,
                },
                transition: "width 0.3s ease",
              }}
            >
              <MyRoutes />
            </Box>
          </Box>
        </Box>
      </BrowserRouter>
    </>
  )
}

export default App
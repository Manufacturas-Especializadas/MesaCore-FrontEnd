import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";


import MyRoutes from "./Routes/Routes";

function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () =>{
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar handleDrawerOpen={ handleDrawerOpen }/>
        <Sidebar open={ open } handleDrawerClose={ handleDrawerClose }/>
        
        <Box sx={{marginTop: 2, marginLeft: 2}}>
          <MyRoutes/>
        </Box>
      </BrowserRouter>
    </>
  )
}

export default App
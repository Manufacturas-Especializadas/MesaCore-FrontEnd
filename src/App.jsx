import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";


import MyRoutes from "./Routes/Routes";
import Navbar2 from "./components/Navbar/Navbar2";
import Sidebar2 from "./components/Sidebar/Sidebar2";

function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () =>{
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const [isMobileOpen, setIsMobileOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsMobileOpen(!isMobileOpen);
  // };

  return (
    <>
      <BrowserRouter>
        <Navbar handleDrawerOpen={ handleDrawerOpen }/>
        <Sidebar open={ open } handleDrawerClose={ handleDrawerClose }/>

        {/* <Navbar2 toggleSidebar={toggleSidebar} isMobileOpen={isMobileOpen} />
        <Sidebar2 isMobileOpen={ isMobileOpen } toggleSidebar={ toggleSidebar }/> */}
        
        <Box sx={{marginTop: 10, marginLeft: 10,}}>
          <MyRoutes/>
        </Box>
      </BrowserRouter>
    </>
  )
}

export default App
import { Routes, Route } from "react-router-dom";
import Settings from "../pages/Settings/Settings";
import Printers from "../pages/Settings/3D Printrers/Printers";
import PrintersCu from "../pages/Settings/3D Printrers/CU/PrintersCu";
import PrintersAL from "../pages/Settings/3D Printrers/AL/PrintersAL";
import RegisterAL from "../pages/Settings/3D Printrers/AL/RegisterAL";
import Dashboard from "../pages/Dashboard/Dashboard";
import EditAL from "../pages/Settings/3D Printrers/AL/EditAL";
import RegisterCu from "../pages/Settings/3D Printrers/CU/RegisterCu";
import RegisterPrinter from "../pages/Dashboard/RegisterPrinter";
import EditCu from "../pages/Settings/3D Printrers/CU/EditCU";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import Impressions from "../pages/Settings/StatisticalImpressions/Impressions";
import RegisterImpressions from "../pages/Settings/StatisticalImpressions/RegisterImpressions";

const MyRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/registerLogin" element={<Register/>}/>
                <Route path="/register" element={<RegisterPrinter/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/settings/impressions" element={<Impressions/>}/>
                <Route path="/settings/impressions/register" element={<RegisterImpressions/>}/>
                <Route path="/settings/printers" element={<Printers/>}/>
                <Route path="/settings/printers/cu" element={<PrintersCu/>}/>
                <Route path="/settings/printers/cu/register" element={<RegisterCu/>}/>
                <Route path="/settings/printers/cu/edit/:id" element={<EditCu/>}/>
                <Route path="/settings/printers/al" element={<PrintersAL/>}/>
                <Route path="/settings/printers/al/register" element={<RegisterAL/>}/>
                <Route path="/settings/printers/al/edit/:id" element={<EditAL/>}/>
            </Routes>
        </>
    )
}

export default MyRoutes
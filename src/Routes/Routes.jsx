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
import PrivateRoute from "../Auth/PrivateRoute";

const MyRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={
                    <PrivateRoute requireRole={['Admin', 'Empleado', 'Gerente', 'Jefe']}>
                        <Dashboard/>        
                    </PrivateRoute>
                }/>
                <Route path="/register" element={
                    <PrivateRoute requireRole={['Admin', 'Empleado', 'Gerente', 'Jefe']}>
                        <RegisterPrinter/>
                    </PrivateRoute>
                }/>
                <Route path="/registerLogin" element={
                    <PrivateRoute requireRole="Admin">
                        <Register/>
                    </PrivateRoute>
                }/>
                <Route path="/settings" element={
                    <PrivateRoute requireRole="Admin">
                        <Settings/>
                    </PrivateRoute>
                }/>
                <Route path="/settings/impressions" element={
                    <PrivateRoute requireRole={['Admin']}>
                        <Impressions/>
                    </PrivateRoute>
                }/>
                <Route path="/settings/impressions/register" element={
                    <PrivateRoute requireRole="Admin">
                        <RegisterImpressions/>
                    </PrivateRoute>
                }/>
                <Route path="/settings/printers" element={
                    <PrivateRoute requireRole="Admin">
                        <Printers/>
                    </PrivateRoute>
                }/>
                <Route path="/settings/printers/cu" element={
                    <PrivateRoute requireRole="Admin">
                        <PrintersCu/>
                    </PrivateRoute>
                }/>
                <Route path="/settings/printers/cu/register" element={
                    <PrivateRoute requireRole="Admin">
                        <RegisterCu/>
                    </PrivateRoute>
                }/>
                <Route path="/settings/printers/cu/edit/:id" element={
                    <PrivateRoute requireRole="Admin">
                        <EditCu/>
                    </PrivateRoute>
                }/>
                <Route path="/settings/printers/al" element={
                    <PrivateRoute requireRole="Admin">
                        <PrintersAL/>
                    </PrivateRoute>
                }/>
                <Route path="/settings/printers/al/register" element={
                    <PrivateRoute requireRole="Admin">
                        <RegisterAL/>
                    </PrivateRoute>
                }/>
                <Route path="/settings/printers/al/edit/:id" element={
                    <PrivateRoute requireRole="Admin">
                        <EditAL/>
                    </PrivateRoute>
                }/>
            </Routes>
        </>
    )
}

export default MyRoutes
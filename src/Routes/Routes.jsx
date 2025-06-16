import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PrivateRoute from "../Auth/PrivateRoute";

// Importaciones de páginas
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";

// Dashboard
import Dashboard from "../pages/Dashboard/Dashboard";
import RegisterRequest from "../pages/Dashboard/RegisterRequest";

// Settings
import Settings from "../pages/Settings/Settings";

// Impresoras 3D
import Printers from "../pages/Settings/3D Printrers/Printers";
import PrintersCu from "../pages/Settings/3D Printrers/CU/PrintersCu";
import PrintersAL from "../pages/Settings/3D Printrers/AL/PrintersAL";
import RegisterAL from "../pages/Settings/3D Printrers/AL/RegisterAL";
import EditAL from "../pages/Settings/3D Printrers/AL/EditAL";
import RegisterCu from "../pages/Settings/3D Printrers/CU/RegisterCu";
import EditCu from "../pages/Settings/3D Printrers/CU/EditCU";

// Estadísticas de impresiones
import Impressions from "../pages/Settings/StatisticalImpressions/Impressions";
import ImpressionsAl from "../pages/Settings/StatisticalImpressions/Al/ImpressionsAl";
import ImpressionsRegisterAl from "../pages/Settings/StatisticalImpressions/Al/ImpressionsAlRegister";
import ImpressionsAlEdit from "../pages/Settings/StatisticalImpressions/Al/ImpresionsAlEdit";
import ProjectIndex from "../pages/Settings/3D Printrers/Projects/ProjectIndex";

//Proyectos de impresoras 3D
import ProjectALIndex from "../pages/Settings/3D Printrers/Projects/AL/ProjectALIndex";
import ProjectALRegister from "../pages/Settings/3D Printrers/Projects/AL/ProjectALRegister";
import ProjectALEdit from "../pages/Settings/3D Printrers/Projects/AL/ProjectALEdit";
import ProjectCUIndex from "../pages/Settings/3D Printrers/Projects/CU/ProjectCUIndex";
import ProjectCURegister from "../pages/Settings/3D Printrers/Projects/CU/ProjectCURegister";
import ProjectCUEdit from "../pages/Settings/3D Printrers/Projects/CU/ProjectCUEdit";

const MyRoutes = () => {
    return (
        <Routes>
            {/* Ruta pública */}
            <Route path="/login" element={<Login />} />

            {/* Rutas privadas - Rol Admin o Empleado/Gerente/Jefe */}
            <Route
                path="/"
                element={
                    <PrivateRoute allowedRoles={['Admin', 'Empleado', 'Gerente', 'Jefe']}>
                        <Outlet />
                    </PrivateRoute>
                }
            >
                <Route index element={<Dashboard />} />

                <Route path="register" element={<RegisterRequest />} />

                {/* Configuración */}
                <Route path="settings">
                    <Route index element={<Settings />} />

                    {/* Proyectos */}
                    <Route path="projects">
                        <Route index element={<ProjectIndex/>}/>

                        <Route path="al">
                            <Route index element={<ProjectALIndex/>}/>
                            <Route path="register" element={<ProjectALRegister/>}/>
                            <Route path="edit/:id" element={<ProjectALEdit/>}/>
                        </Route>

                        <Route path="cu">
                            <Route index element={<ProjectCUIndex/>}/>
                            <Route path="register" element={<ProjectCURegister/>}/>
                            <Route path="edit/:id" element={<ProjectCUEdit/>}/>
                        </Route>
                    </Route>

                    {/* Impresoras 3D */}
                    <Route path="printers">
                        <Route index element={<Printers />} />

                        <Route path="cu">
                            <Route index element={<PrintersCu />} />
                            <Route path="register" element={<RegisterCu />} />
                            <Route path="edit/:id" element={<EditCu />} />
                        </Route>

                        <Route path="al">
                            <Route index element={<PrintersAL />} />
                            <Route path="register" element={<RegisterAL />} />
                            <Route path="edit/:id" element={<EditAL />} />
                        </Route>
                    </Route>

                    {/* Estadísticas de impresión */}
                    <Route path="impressions">
                        <Route index element={<Impressions />} />

                        <Route path="al">
                            <Route index element={<ImpressionsAl />} />
                            <Route path="register" element={<ImpressionsRegisterAl />} />
                            <Route path="edit/:id" element={<ImpressionsAlEdit />} />
                        </Route>
                    </Route>
                </Route>
            </Route>

            {/* Rutas privadas solo para Admin */}
            <Route
                path="/registerLogin"
                element={
                    <PrivateRoute allowedRoles="Admin">
                        <Register />
                    </PrivateRoute>
                }
            />

            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default MyRoutes;
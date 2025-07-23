import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import RutasProtegidas from "./RutasProtegidas";
import RutasPacientes from "./RutasPacientes";
import RutasMedicos from "./RutasMedicos";
import Error404 from "../pages/error404/Error404";
import SignUp from "../pages/home/SignUp";
import PanelAdmin from "../pages/home/Administrador/PanelAdmin";
import RutasAdmin from "./RutasAdmin"
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="medicos/*"
          element={
            <RutasProtegidas>
              <RutasMedicos />
            </RutasProtegidas>
          }
        />
        <Route
          path="pacientes/*"
          element={
            <RutasProtegidas>
              <RutasPacientes />
            </RutasProtegidas>
          }
        />
        
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="*" element={<Error404 />} />
        
        <Route 
        path="/Administrador/PanelAdmin/*" 
        element={
        <RutasProtegidas>
           <RutasAdmin /> 
        </RutasProtegidas>
        }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

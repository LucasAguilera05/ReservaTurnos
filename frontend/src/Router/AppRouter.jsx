import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import RutasProtegidas from "./RutasProtegidas";
import RutasPacientes from "./RutasPacientes";
import RutasMedicos from "./RutasMedicos";
import Error404 from "../pages/error404/Error404";
import SignUp from "../pages/home/SignUp";
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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

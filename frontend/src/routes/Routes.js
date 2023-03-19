import React from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayer } from "../layers/MainLayer";
import { MainPage } from "../pages/MainPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
        </Routes>
    );
}

export { AppRoutes };

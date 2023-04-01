import React from "react";
import { Route, Routes } from "react-router-dom";

import { MainPage, MintNFT, AccountAbstraction } from "../pages";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/nft-market" element={<MainPage />} />
            <Route path="mint-nft" element={<MintNFT />} />
            <Route path="account-abstraction" element={<AccountAbstraction />} />
        </Routes>
    );
}

export { AppRoutes };

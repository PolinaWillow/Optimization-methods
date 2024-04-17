import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import { OneDimensionalOptimization } from "./components/OneDimensionalOptimization/OneDimensionalOptimization";
import { MulticriteriaOptimization } from "./components/MulticriteriaOptimization/MulticriteriaOptimization";
import { BarrierFunctions } from "./components/BarrierFunctions/BarrierFunctions";

export const useRoutes = () =>{
    return(
        <Routes>
            <Route path="/" exact element={<OneDimensionalOptimization/>}/>
            <Route path="/multicriteria" exact element={<MulticriteriaOptimization/>}/>
            <Route path="/barrier" exact element={<BarrierFunctions/>}/>
            <Route path="*" element={<Navigate to="/" replace />}/>             
        </Routes>
    )
}
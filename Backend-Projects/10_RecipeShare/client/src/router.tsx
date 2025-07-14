import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RecipePlatform from "./pages/Home";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1 className="text-bold text-red-300 text-4xl">Recipe Sharing Platform</h1>
    },
    {
        path: "/home",
        element: <RecipePlatform />
    }
]);
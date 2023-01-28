import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import MovieDetail from "../pages/MovieDetail";
import Register from "../pages/Register";

const AppRouter = () => {
    return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:id" element={<MovieDetail />} />
    </Routes>
    </BrowserRouter>;
};

export default AppRouter;
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import "../../styles/home.css";

export const Perfil = () => {
    const { store, actions } = useContext(Context);
    const token = localStorage.getItem("token");
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/login", { replace: true });
        }
    },[token])

    const logoutUser = () => {
		actions.logout(); // Elimina el token en el store y localStorage
		navigate("/login"); // Redirige al login
	};

    return (
        <div className="text-center mt-5">
            <h1>Gracias por registrarte!!</h1>
            <p>Bienvenid@ a la comnunidad BLANK-MIND</p>
            <button className="btn bg-primary border text-light" onClick={() => { logoutUser(); }}>Cerrar Sesión</button>
        </div>
    );
};

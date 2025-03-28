import React, { useState } from "react";
import "../../styles/registro.css";
import { useNavigate } from 'react-router-dom';


export const Registro = () => {
  const [email, setEmail] = useState(""); // Guardamos el email
  const [password, setPassword] = useState(""); // Guardamos la contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Guardamos la confirmación de contraseña
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sign_up = async () => {
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}api/sign_up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.msg) {
        setMessage(data.msg); // Si la respuesta tiene "msg", lo mostramos
      } else {
        setMessage("¡Usuario registrado con éxito!");
        alert("¡Registro exitoso. Inicia sesión!");
        navigate("/login");
      }
    } catch (error) {
      setMessage("Hubo un problema con la solicitud. Intenta nuevamente."); // Si ocurre un error en la solicitud
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // para que no se recargue de la página
    sign_up();
  };

  return (
    <div className="container py-3 mt-4">
      <div className="row justify-content-center">
        <div className="card-login col-md-6 col-sm-8">
          <div className="cardshadow card">
            <div className="card-body">
              <h3 className="card-title1 text-center mb-4"style={{fontFamily :'fantasy'}}>Registrarse</h3>
              <form onSubmit={handleSubmit}>
                <div className="label mb-4">
                  <label htmlFor="inputEmail3" className="form-label">Email</label>
                  <input type="email"
                    className="form-control"
                    id="inputEmail3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="label mb-4">
                  <label htmlFor="inputPassword3" className="form-label">Contraseña</label>
                  <input type="password"
                    className="form-control"
                    id="inputPassword3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
                <div className="label mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                  <input type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required />
                </div>
                <div className="label mb-4">
                  <label className="form-label" >Términos y Condiciones</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="acceptTerms"
                      required
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">
                      Aceptar
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  Registrarse
                </button>
              </form>
              <div className="text-center">
              {message && <p style={{ color: "yellow" }}>{message}</p>} {/* Mostrar el mensaje de respuesta */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
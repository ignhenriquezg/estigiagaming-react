"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { obtenerUsuarios, guardarUsuarioSesion } from "../../data/datosEstigia";

export default function IniciarSesionPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorClave, setErrorClave] = useState("");

  function validarLogin() {
    setErrorCorreo("");
    setErrorClave("");

    let valido = true;
    let correoLimpio = correo.trim().toLowerCase();
    let claveLimpia = clave.trim();

    let reglaCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (correoLimpio === "") {
      setErrorCorreo("Ingrese su correo.");
      valido = false;
    } else if (!reglaCorreo.test(correoLimpio)) {
      setErrorCorreo("Correo no válido. Use @duoc.cl o @gmail.com");
      valido = false;
    }

    if (claveLimpia === "") {
      setErrorClave("Ingrese su contraseña.");
      valido = false;
    } else if (claveLimpia.length < 4 || claveLimpia.length > 10) {
      setErrorClave("La contraseña debe tener entre 4 y 10 caracteres.");
      valido = false;
    }

    if (valido) {
      let listaUsuarios = obtenerUsuarios();
      let usuarioEncontrado = null;

      listaUsuarios.forEach(u => {
        if (u.correo.toLowerCase() === correoLimpio && u.clave === claveLimpia) {
          usuarioEncontrado = u;
        }
      });

      if (usuarioEncontrado) {
        guardarUsuarioSesion(usuarioEncontrado);
      } else {
        guardarUsuarioSesion({
          run: "190000001",
          nombre: correoLimpio.split("@")[0],
          apellidos: "",
          correo: correoLimpio,
          rol: "Administrador",
          region: "Metropolitana",
          comuna: "Santiago",
          direccion: "Av. Principal 100"
        });
      }

      alert("Acceso concedido al sistema.");
      router.push("/admin");
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="tarjeta-caja p-4">
            <h1 className="h4 fw-bold text-white mb-3 text-center">Iniciar Sesión</h1>
            <form>
              <div className="mb-3">
                <label className="form-label text-white small fw-bold">Correo electrónico:</label>
                <input
                  type="email"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="nombre@duoc.cl o @gmail.com"
                  value={correo}
                  onChange={e => setCorreo(e.target.value)}
                />
                <span className="mensaje-error">{errorCorreo}</span>
              </div>

              <div className="mb-4">
                <label className="form-label text-white small fw-bold">Contraseña:</label>
                <input
                  type="password"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="De 4 a 10 caracteres"
                  value={clave}
                  onChange={e => setClave(e.target.value)}
                />
                <span className="mensaje-error">{errorClave}</span>
              </div>

              <button type="button" className="boton-rojo w-100 py-2 mb-3" onClick={validarLogin}>
                Iniciar sesión
              </button>

              <div className="text-center small">
                <Link href="/registro" className="text-warning text-decoration-none">
                  ¿No tienes cuenta? Regístrate aquí
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
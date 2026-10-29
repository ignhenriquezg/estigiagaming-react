"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { crearUsuarioCRUD } from "../../../../data/datosEstigia";

export default function AdminNuevoUsuarioPage() {
  const router = useRouter();
  const [run, setRun] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("Cliente");

  const [errorRun, setErrorRun] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");

  function guardarUsuarioAdmin() {
    setErrorRun("");
    setErrorNombre("");
    setErrorCorreo("");

    let correcto = true;
    let runLimpio = run.trim();
    let nombreLimpio = nombre.trim();
    let correoLimpio = correo.trim().toLowerCase();

    if (runLimpio === "") {
      setErrorRun("El RUN es obligatorio.");
      correcto = false;
    } else if (runLimpio.includes(".") || runLimpio.includes("-")) {
      setErrorRun("Debe ingresar el RUN sin puntos ni guion.");
      correcto = false;
    } else if (runLimpio.length < 7 || runLimpio.length > 9) {
      setErrorRun("El RUN debe tener entre 7 y 9 caracteres.");
      correcto = false;
    }

    if (nombreLimpio === "") {
      setErrorNombre("El nombre es obligatorio.");
      correcto = false;
    } else if (nombreLimpio.length > 100) {
      setErrorNombre("Máximo 100 caracteres permitidos.");
      correcto = false;
    }

    if (correoLimpio === "") {
      setErrorCorreo("El correo es obligatorio.");
      correcto = false;
    } else if (
      !correoLimpio.endsWith("@duoc.cl") &&
      !correoLimpio.endsWith("@profesor.duoc.cl") &&
      !correoLimpio.endsWith("@gmail.com")
    ) {
      setErrorCorreo("Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
      correcto = false;
    }

    if (correcto) {
      crearUsuarioCRUD({
        run: runLimpio,
        nombre: nombreLimpio,
        apellidos: "",
        correo: correoLimpio,
        clave: "1234",
        rol: rol,
        region: "Metropolitana",
        comuna: "Santiago",
        direccion: "Registrado por administrador"
      });
      alert("¡Usuario " + nombreLimpio + " (" + rol + ") creado con éxito!");
      router.push("/admin/usuarios");
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="tarjeta-caja p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h4 fw-bold text-white mb-0">Registrar Usuario en el Sistema</h1>
              <Link href="/admin/usuarios" className="btn btn-sm btn-outline-light">
                Volver a usuarios
              </Link>
            </div>

            <form>
              <div className="mb-3">
                <label className="form-label text-white small fw-bold">
                  RUN (sin puntos ni guion):
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ej: 190110222"
                  maxLength={9}
                  value={run}
                  onChange={e => setRun(e.target.value)}
                />
                <span className="mensaje-error">{errorRun}</span>
              </div>

              <div className="mb-3">
                <label className="form-label text-white small fw-bold">Nombre completo:</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ej: Carlos Silva"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
                <span className="mensaje-error">{errorNombre}</span>
              </div>

              <div className="mb-3">
                <label className="form-label text-white small fw-bold">Correo:</label>
                <input
                  type="email"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="usuario@duoc.cl o @gmail.com"
                  value={correo}
                  onChange={e => setCorreo(e.target.value)}
                />
                <span className="mensaje-error">{errorCorreo}</span>
              </div>

              <div className="mb-4">
                <label className="form-label text-white small fw-bold">Rol en el sistema:</label>
                <select
                  className="form-select bg-dark text-white border-secondary"
                  value={rol}
                  onChange={e => setRol(e.target.value)}
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Vendedor">Vendedor</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>

              <button
                type="button"
                className="boton-dorado w-100 py-2"
                onClick={guardarUsuarioAdmin}
              >
                Guardar usuario
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
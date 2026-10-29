"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { crearUsuarioCRUD, obtenerComunasPorRegion } from "../../data/datosEstigia";

export default function RegistroPage() {
  const router = useRouter();
  const [run, setRun] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");

  const [errorRun, setErrorRun] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellidos, setErrorApellidos] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorClave, setErrorClave] = useState("");
  const [errorRegion, setErrorRegion] = useState("");
  const [errorComuna, setErrorComuna] = useState("");
  const [errorDireccion, setErrorDireccion] = useState("");

  function cambiarRegion(nuevaRegion) {
    setRegion(nuevaRegion);
    let comunas = obtenerComunasPorRegion(nuevaRegion);
    if (comunas.length > 0) {
      setComuna(comunas[0]);
    } else {
      setComuna("");
    }
  }

  function validarRegistro() {
    setErrorRun("");
    setErrorNombre("");
    setErrorApellidos("");
    setErrorCorreo("");
    setErrorClave("");
    setErrorRegion("");
    setErrorComuna("");
    setErrorDireccion("");

    let correcto = true;
    let runLimpio = run.trim();
    let nombreLimpio = nombre.trim();
    let apellidosLimpio = apellidos.trim();
    let correoLimpio = correo.trim().toLowerCase();
    let claveLimpia = clave.trim();
    let direccionLimpia = direccion.trim();

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
    } else if (nombreLimpio.length > 50) {
      setErrorNombre("Máximo 50 caracteres permitidos.");
      correcto = false;
    }

    if (apellidosLimpio === "") {
      setErrorApellidos("Los apellidos son obligatorios.");
      correcto = false;
    } else if (apellidosLimpio.length > 100) {
      setErrorApellidos("Máximo 100 caracteres permitidos.");
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

    if (claveLimpia === "") {
      setErrorClave("La contraseña es obligatoria.");
      correcto = false;
    } else if (claveLimpia.length < 4 || claveLimpia.length > 10) {
      setErrorClave("Debe tener entre 4 y 10 caracteres.");
      correcto = false;
    }

    if (region === "") {
      setErrorRegion("Seleccione una región.");
      correcto = false;
    }

    if (comuna === "") {
      setErrorComuna("Seleccione una comuna.");
      correcto = false;
    }

    if (direccionLimpia === "") {
      setErrorDireccion("La dirección es obligatoria.");
      correcto = false;
    } else if (direccionLimpia.length > 300) {
      setErrorDireccion("Máximo 300 caracteres permitidos.");
      correcto = false;
    }

    if (correcto) {
      crearUsuarioCRUD({
        run: runLimpio,
        nombre: nombreLimpio,
        apellidos: apellidosLimpio,
        correo: correoLimpio,
        clave: claveLimpia,
        rol: "Cliente",
        region: region,
        comuna: comuna,
        direccion: direccionLimpia
      });
      alert("¡Cuenta registrada con éxito! Ahora puedes iniciar sesión.");
      router.push("/iniciar-sesion");
    }
  }

  let opcionesComunas = [];
  let listaComunas = obtenerComunasPorRegion(region);
  listaComunas.forEach(c => {
    opcionesComunas.push(<option key={c} value={c}>{c}</option>);
  });

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="tarjeta-caja p-4">
            <h1 className="h4 fw-bold text-white mb-3 text-center">Registro de Nuevo Usuario</h1>

            <form>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label text-white small fw-bold">RUN (sin puntos ni guion):</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" maxLength={9} value={run} onChange={e => setRun(e.target.value)} />
                  <span className="mensaje-error">{errorRun}</span>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-white small fw-bold">Fecha de nacimiento (opcional):</label>
                  <input type="date" className="form-control bg-dark text-white border-secondary" value={nacimiento} onChange={e => setNacimiento(e.target.value)} />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label text-white small fw-bold">Nombre:</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" value={nombre} onChange={e => setNombre(e.target.value)} />
                  <span className="mensaje-error">{errorNombre}</span>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-white small fw-bold">Apellidos:</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" value={apellidos} onChange={e => setApellidos(e.target.value)} />
                  <span className="mensaje-error">{errorApellidos}</span>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label text-white small fw-bold">Correo electrónico:</label>
                  <input type="email" className="form-control bg-dark text-white border-secondary" value={correo} onChange={e => setCorreo(e.target.value)} />
                  <span className="mensaje-error">{errorCorreo}</span>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-white small fw-bold">Contraseña (4 a 10 car.):</label>
                  <input type="password" className="form-control bg-dark text-white border-secondary" value={clave} onChange={e => setClave(e.target.value)} />
                  <span className="mensaje-error">{errorClave}</span>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label text-white small fw-bold">Región:</label>
                  <select className="form-select bg-dark text-white border-secondary" value={region} onChange={e => cambiarRegion(e.target.value)}>
                    <option value="">-- Selecciona región --</option>
                    <option value="Metropolitana">Región Metropolitana</option>
                    <option value="Valparaiso">Región de Valparaíso</option>
                    <option value="Biobio">Región del Biobío</option>
                  </select>
                  <span className="mensaje-error">{errorRegion}</span>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-white small fw-bold">Comuna:</label>
                  <select className="form-select bg-dark text-white border-secondary" value={comuna} onChange={e => setComuna(e.target.value)}>
                    {opcionesComunas.length === 0 ? (
                      <option value="">-- Selecciona primero una región --</option>
                    ) : (
                      opcionesComunas
                    )}
                  </select>
                  <span className="mensaje-error">{errorComuna}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-white small fw-bold">Dirección de despacho:</label>
                <input type="text" className="form-control bg-dark text-white border-secondary" value={direccion} onChange={e => setDireccion(e.target.value)} />
                <span className="mensaje-error">{errorDireccion}</span>
              </div>

              <button type="button" className="boton-rojo w-100 py-2" onClick={validarRegistro}>
                Registrar cuenta
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
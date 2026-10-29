"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");

  const [mensajeNombre, setMensajeNombre] = useState("");
  const [mensajeCorreo, setMensajeCorreo] = useState("");
  const [mensajeComentario, setMensajeComentario] = useState("");

  function validarContacto() {
    setMensajeNombre("");
    setMensajeCorreo("");
    setMensajeComentario("");

    let correcto = true;
    let nombreLimpio = nombre.trim();
    let correoLimpio = correo.trim().toLowerCase();
    let comentarioLimpio = comentario.trim();

    if (nombreLimpio === "") {
      setMensajeNombre("El nombre es obligatorio.");
      correcto = false;
    } else if (nombreLimpio.length > 100) {
      setMensajeNombre("El nombre no puede tener más de 100 caracteres.");
      correcto = false;
    }

    let formatoCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (correoLimpio === "") {
      setMensajeCorreo("El correo es obligatorio.");
      correcto = false;
    } else if (!formatoCorreo.test(correoLimpio)) {
      setMensajeCorreo("Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
      correcto = false;
    }

    if (comentarioLimpio === "") {
      setMensajeComentario("Debe escribir un comentario.");
      correcto = false;
    } else if (comentarioLimpio.length > 500) {
      setMensajeComentario("El comentario no puede superar los 500 caracteres.");
      correcto = false;
    }

    if (correcto) {
      alert("¡Mensaje enviado con éxito!");
      setNombre("");
      setCorreo("");
      setComentario("");
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="tarjeta-caja p-4">
            <h1 className="h4 fw-bold text-white mb-2 text-center">Formulario de Contacto</h1>
            <p className="text-secondary small text-center mb-4">
              Envíanos tus consultas técnicas o comerciales.
            </p>

            <form>
              <div className="mb-3">
                <label className="form-label text-white small fw-bold">Nombre completo:</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ej: Juan Perez"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
                <span className="mensaje-error">{mensajeNombre}</span>
              </div>

              <div className="mb-3">
                <label className="form-label text-white small fw-bold">Correo electrónico:</label>
                <input
                  type="email"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ej: usuario@duoc.cl o @gmail.com"
                  value={correo}
                  onChange={e => setCorreo(e.target.value)}
                />
                <span className="mensaje-error">{mensajeCorreo}</span>
              </div>

              <div className="mb-3">
                <label className="form-label text-white small fw-bold">Comentario:</label>
                <textarea
                  rows={4}
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Escribe tu mensaje..."
                  value={comentario}
                  onChange={e => setComentario(e.target.value)}
                />
                <span className="mensaje-error">{mensajeComentario}</span>
              </div>

              <button type="button" className="boton-rojo w-100 py-2" onClick={validarContacto}>
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
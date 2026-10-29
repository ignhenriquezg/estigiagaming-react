import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container py-5 text-center">
      <div className="tarjeta-caja p-5 mx-auto" style={{ maxWidth: "600px" }}>
        <h1 className="display-4 fw-bold text-danger mb-3">Error 404</h1>
        <h2 className="h5 text-white mb-3">
          La dirección que buscas no se encontró en el Inframundo
        </h2>
        <p className="text-secondary mb-4">
          Verifica la URL o regresa a la página principal de EstigiaGaming.
        </p>
        <Link href="/" className="boton-rojo">
          Volver al Home
        </Link>
      </div>
    </main>
  );
}
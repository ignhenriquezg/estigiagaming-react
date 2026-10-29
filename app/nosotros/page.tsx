import React from "react";

export default function NosotrosPage() {
  return (
    <main className="container py-5">
      <section className="tarjeta-caja p-4 mb-4">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <h1 className="h3 fw-bold text-white mb-3">Nuestra Forja y Filosofía</h1>
            <p className="text-secondary">
              EstigiaGaming nació de la pasión de entusiastas del hardware gamer en Chile,
              inspirados en la mitología y las armas del videojuego Hades.
            </p>
            <p className="text-secondary mb-0">
              Ofrecemos periféricos de alta respuesta y componentes de gran desempeño para
              que cada jugador alcance su mayor rendimiento competitivo.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/imagenes/nosotros.png"
              alt="Nosotros EstigiaGaming"
              className="img-fluid rounded border border-secondary shadow"
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="tarjeta-caja p-4 text-center">
        <h2 className="h5 fw-bold text-white mb-2">Desarrollo de Software</h2>
        <p className="text-warning mb-1">Estudiante de Ingeniería en Informática</p>
        <p className="text-secondary small mb-0">
          Duoc UC - Asignatura Desarrollo Full Stack II (DSY1104)
        </p>
      </section>
    </main>
  );
}
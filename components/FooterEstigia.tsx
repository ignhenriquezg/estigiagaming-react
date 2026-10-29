"use client";

import Link from "next/link";

export default function FooterEstigia() {
  function suscribir(e) {
    e.preventDefault();
    alert("¡Gracias por suscribirte!");
    e.target.reset();
  }

  return (
    <footer>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="text-white">ESTIGIA GAMING</h5>
            <p className="small">
              Tienda chilena de hardware gamer y componentes de alta calidad inspirados en el Inframundo.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="text-white">Enlaces Rápidos</h5>
            <ul className="list-unstyled small">
              <li><Link href="/nosotros" className="text-secondary text-decoration-none">Sobre nosotros</Link></li>
              <li><Link href="/contacto" className="text-secondary text-decoration-none">Contacto y soporte</Link></li>
              <li><Link href="/admin" className="text-secondary text-decoration-none">Panel administrador</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="text-white">Alertas</h5>
            <form onSubmit={suscribir}>
              <input
                type="email"
                className="form-control form-control-sm bg-dark text-white border-secondary mb-2"
                placeholder="Tu correo electrónico"
                required
              />
              <button type="submit" className="boton-rojo btn-sm">Suscribirme</button>
            </form>
          </div>
        </div>
        <div className="text-center pt-4 mt-3 border-top border-secondary small">
          <p className="mb-0">2026 EstigiaGaming - Proyecto Front-End Fullstack II - Duoc UC</p>
        </div>
      </div>
    </footer>
  );
}
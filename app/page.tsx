"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { obtenerProductos, agregarAlCarritoCRUD } from "../data/datosEstigia";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  function sumarCarrito(producto) {
    agregarAlCarritoCRUD(producto);
    alert(producto.nombre + " ha sido añadido al carrito.");
  }

  let filasDestacados = [];
  productos.slice(0, 4).forEach(prod => {
    filasDestacados.push(
      <div className="col-12 col-sm-6 col-md-3" key={prod.id}>
        <ProductCard producto={prod} onAgregar={sumarCarrito} />
      </div>
    );
  });

  return (
    <main>
      <section
        className="py-5"
        style={{
          background: "linear-gradient(180deg, rgba(217,37,52,0.15) 0%, rgba(15,14,19,1) 100%)"
        }}
      >
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6 text-center">
              <div className="carrusel-contenedor mb-4">
                <img src="/imagenes/zagreoarma.png" className="d-block w-100" alt="Espada Zagreo" />
              </div>
              <h1 className="h2 fw-bold text-white mb-3">
                FORJA TU SETUP CON EL PODER DEL INFRAMUNDO
              </h1>
              <p className="text-secondary mb-4">
                Equípate con el mejor armamento: periféricos reactivos, monitores fluidos y componentes de alto rendimiento para superar cada batalla.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link href="/productos" className="boton-rojo">Ver productos</Link>
                <Link href="/nosotros" className="btn btn-outline-secondary text-white">Conócenos</Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="/imagenes/banner-inicio.jpg"
                alt="Banner Estigia"
                className="img-fluid rounded border border-secondary shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-black text-center">
        <div className="container">
          <h2 className="h3 fw-bold text-white mb-2">FORJA TU DESTINO</h2>
          <p className="text-secondary mb-4">
            Conoce la fluidez visual que inspira a cada uno de nuestros artículos gamer.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="ratio ratio-16x9 rounded overflow-hidden border border-secondary shadow">
                <img src="/gif/hades-hades-game.gif" alt="Animación Hades" style={{ objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-2">
          <h2 className="h4 fw-bold text-white mb-0">Productos Destacados</h2>
          <Link href="/productos" className="text-warning text-decoration-none fw-bold">
            Ver todo el catálogo -&gt;
          </Link>
        </div>

        <div className="row g-4">{filasDestacados}</div>
      </section>
    </main>
  );
}
"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { obtenerProductos, agregarAlCarritoCRUD } from "../../data/datosEstigia";

export default function OfertasPage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  function agregar(producto) {
    agregarAlCarritoCRUD(producto);
    alert(producto.nombre + " añadido al carrito.");
  }

  let filas = [];
  productos.forEach(prod => {
    if (prod.enOferta) {
      filas.push(
        <div className="col-12 col-sm-6 col-md-4" key={prod.id}>
          <ProductCard producto={prod} onAgregar={agregar} />
        </div>
      );
    }
  });

  return (
    <main className="container py-5">
      <h1 className="h3 fw-bold text-white mb-2 text-center">Productos en Oferta</h1>
      <p className="text-secondary text-center mb-4">Descuentos especiales en hardware gamer.</p>
      <div className="row g-4">{filas}</div>
    </main>
  );
}
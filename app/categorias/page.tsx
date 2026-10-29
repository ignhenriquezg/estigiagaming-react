"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import {
  obtenerProductos,
  obtenerCategorias,
  agregarAlCarritoCRUD
} from "../../data/datosEstigia";

export default function CategoriasPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Periféricos");

  useEffect(() => {
    setProductos(obtenerProductos());
    setCategorias(obtenerCategorias());
  }, []);

  function agregar(producto) {
    agregarAlCarritoCRUD(producto);
    alert(producto.nombre + " añadido al carrito.");
  }

  let botonesCategorias = [];
  categorias.forEach(cat => {
    botonesCategorias.push(
      <div className="col-6 col-md-3" key={cat.id}>
        <button
          type="button"
          className="tarjeta-caja w-100 text-center p-3"
          onClick={() => setCategoriaSeleccionada(cat.nombre)}
        >
          <span className="fw-bold text-warning d-block">{cat.nombre}</span>
          <small className="text-secondary">{cat.descripcion}</small>
        </button>
      </div>
    );
  });

  let filasProductos = [];
  productos.forEach(prod => {
    if (prod.categoria === categoriaSeleccionada) {
      filasProductos.push(
        <div className="col-12 col-sm-6 col-md-4" key={prod.id}>
          <ProductCard producto={prod} onAgregar={agregar} />
        </div>
      );
    }
  });

  return (
    <main className="container py-5">
      <h1 className="h3 fw-bold text-white mb-4 text-center">Categorías</h1>
      <div className="row g-3 mb-5">{botonesCategorias}</div>

      <h2 className="h4 fw-bold text-white mb-3">{categoriaSeleccionada}</h2>
      <div className="row g-4">{filasProductos}</div>
    </main>
  );
}
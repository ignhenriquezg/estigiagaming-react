"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { obtenerProductos, agregarAlCarritoCRUD } from "../../data/datosEstigia";

function SearchBar({ onlyInStock, onOnlyInStockChange, filterText, onFilterTextChange }) {
  return (
    <form className="tarjeta-caja p-3 mb-4">
      <div className="row g-3 align-items-center">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control bg-dark text-white border-secondary"
            placeholder="Buscar producto..."
            value={filterText}
            onChange={e => onFilterTextChange(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={onlyInStock}
            onChange={e => onOnlyInStockChange(e.target.checked)}
          />
          <span className="text-white small">Mostrar solo productos en stock</span>
        </div>
      </div>
    </form>
  );
}

export default function ProductosPage() {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const respuesta = await fetch("http://localhost:4000/productos");
        const datos = await respuesta.json();
        setProducts(datos);
      } catch (error) {
        setProducts(obtenerProductos());
      }
    };
    cargarDatos();
  }, []);

  function agregar(producto) {
    agregarAlCarritoCRUD(producto);
    alert(producto.nombre + " añadido al carrito.");
  }

  let filas = [];
  products.forEach(product => {
    if (product.nombre.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (onlyInStock && product.stock <= 0) {
      return;
    }
    filas.push(
      <div className="col-12 col-sm-6 col-md-4" key={product.id}>
        <ProductCard producto={product} onAgregar={agregar} />
      </div>
    );
  });

  return (
    <main className="container py-5">
      <h1 className="h3 fw-bold text-white mb-2 text-center">Catálogo de Productos</h1>
      <p className="text-secondary text-center mb-4">
        Conoce nuestras armas principales disponibles para armar tu PC.
      </p>

      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}
        onlyInStock={onlyInStock}
        onOnlyInStockChange={setOnlyInStock}
      />

      <div className="row g-4">{filas}</div>
    </main>
  );
}
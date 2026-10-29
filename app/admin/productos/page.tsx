"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { obtenerProductos, eliminarProductoCRUD } from "../../../data/datosEstigia";

export default function AdminProductosPage() {
  const [productos, setProductos] = useState([]);
  const [soloCriticos, setSoloCriticos] = useState(false);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  function borrarProducto(id) {
    let nuevaLista = eliminarProductoCRUD(id);
    setProductos(nuevaLista);
    alert("Producto eliminado");
  }

  let filas = [];
  productos.forEach(prod => {
    if (soloCriticos && prod.stock > prod.stockCritico) {
      return;
    }

    let esCritico = prod.stock <= prod.stockCritico;

    filas.push(
      <tr key={prod.id}>
        <td>{prod.codigo}</td>
        <td>
          <img
            src={prod.imagen}
            alt={prod.nombre}
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
        </td>
        <td>{prod.nombre}</td>
        <td>{prod.categoria}</td>
        <td>${prod.precio}</td>
        <td className={esCritico ? "text-danger fw-bold" : ""}>{prod.stock}</td>
        <td>
          {esCritico ? (
            <span className="badge bg-danger">Stock Crítico</span>
          ) : (
            <span className="badge bg-success">Normal</span>
          )}
        </td>
        <td>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => borrarProducto(prod.id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    );
  });

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h1 className="h3 text-white fw-bold mb-0">Inventario de Productos</h1>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={() => setSoloCriticos(!soloCriticos)}
          >
            {soloCriticos ? "Ver todos los productos" : "Ver solo Stock Crítico"}
          </button>
          <Link href="/admin/productos/nuevo" className="boton-dorado">
            + Agregar producto
          </Link>
          <Link href="/admin" className="btn btn-sm btn-outline-light align-self-center">
            Volver al panel
          </Link>
        </div>
      </div>

      <div className="tarjeta-caja">
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead>
              <tr>
                <th>Código</th>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Alerta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{filas}</tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
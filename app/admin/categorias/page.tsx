"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  obtenerCategorias,
  crearCategoriaCRUD,
  eliminarCategoriaCRUD
} from "../../../data/datosEstigia";

export default function AdminCategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setCategorias(obtenerCategorias());
  }, []);

  function guardarCategoria() {
    setError("");
    if (nombre.trim() === "") {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }
    let nuevaLista = crearCategoriaCRUD({
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || "Categoría de hardware gamer."
    });
    setCategorias(nuevaLista);
    setNombre("");
    setDescripcion("");
  }

  function borrarCategoria(id) {
    let nuevaLista = eliminarCategoriaCRUD(id);
    setCategorias(nuevaLista);
  }

  let filas = [];
  categorias.forEach(cat => {
    filas.push(
      <tr key={cat.id}>
        <td>{cat.id}</td>
        <td>{cat.nombre}</td>
        <td>{cat.descripcion}</td>
        <td>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => borrarCategoria(cat.id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    );
  });

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-white fw-bold mb-0">Gestión de Categorías</h1>
        <Link href="/admin" className="btn btn-sm btn-outline-light">
          Volver al panel
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-md-5">
          <div className="tarjeta-caja p-4">
            <h2 className="h5 text-white fw-bold mb-3">Nueva Categoría</h2>
            <div className="mb-3">
              <label className="form-label text-white small fw-bold">Nombre:</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
              <span className="mensaje-error">{error}</span>
            </div>
            <div className="mb-3">
              <label className="form-label text-white small fw-bold">Descripción:</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
              />
            </div>
            <button type="button" className="boton-dorado w-100" onClick={guardarCategoria}>
              Guardar categoría
            </button>
          </div>
        </div>

        <div className="col-md-7">
          <div className="tarjeta-caja">
            <table className="table table-dark table-hover mb-0 align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{filas}</tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
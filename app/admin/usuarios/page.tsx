"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { obtenerUsuarios, eliminarUsuarioCRUD } from "../../../data/datosEstigia";

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    setUsuarios(obtenerUsuarios());
  }, []);

  function borrarUsuario(run) {
    let nuevaLista = eliminarUsuarioCRUD(run);
    setUsuarios(nuevaLista);
    alert("Usuario eliminado");
  }

  let filas = [];
  usuarios.forEach(u => {
    let claseBadge = "badge bg-secondary";
    if (u.rol === "Administrador") {
      claseBadge = "badge bg-danger";
    } else if (u.rol === "Vendedor") {
      claseBadge = "badge bg-warning text-dark";
    }

    filas.push(
      <tr key={u.run}>
        <td>{u.run}</td>
        <td>{u.nombre} {u.apellidos}</td>
        <td>{u.correo}</td>
        <td>
          <span className={claseBadge}>{u.rol}</span>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => borrarUsuario(u.run)}
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
        <h1 className="h3 text-white fw-bold mb-0">Listado de Usuarios</h1>
        <div className="d-flex gap-2">
          <Link href="/admin/usuarios/nuevo" className="boton-dorado">
            + Agregar usuario
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
                <th>RUN</th>
                <th>Nombre Completo</th>
                <th>Correo</th>
                <th>Rol</th>
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
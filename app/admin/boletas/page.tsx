"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { obtenerOrdenes } from "../../../data/datosEstigia";

export default function AdminBoletasPage() {
  const [ordenes, setOrdenes] = useState([]);
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);

  useEffect(() => {
    setOrdenes(obtenerOrdenes());
  }, []);

  let filas = [];
  ordenes.forEach(ord => {
    filas.push(
      <tr key={ord.id}>
        <td>{ord.numero}</td>
        <td>{ord.fecha}</td>
        <td>{ord.nombre} {ord.apellidos}</td>
        <td>{ord.correo}</td>
        <td className="precio-dorado fs-6">${ord.total}</td>
        <td>
          <span className={ord.estado === "Pagado" ? "badge bg-success" : "badge bg-danger"}>
            {ord.estado}
          </span>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={() => setBoletaSeleccionada(ord)}
          >
            Mostrar boleta
          </button>
        </td>
      </tr>
    );
  });

  let detalleItems = [];
  if (boletaSeleccionada) {
    boletaSeleccionada.items.forEach((item, index) => {
      detalleItems.push(
        <li key={index} className="text-secondary">
          {item.nombre} - Cantidad: {item.cantidad} - Subtotal: ${item.precio * item.cantidad}
        </li>
      );
    });
  }

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-white fw-bold mb-0">Órdenes y Boletas</h1>
        <Link href="/admin" className="btn btn-sm btn-outline-light">
          Volver al panel
        </Link>
      </div>

      <div className="tarjeta-caja mb-4">
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead>
              <tr>
                <th>N° Boleta</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Correo</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{filas}</tbody>
          </table>
        </div>
      </div>

      {boletaSeleccionada && (
        <div className="tarjeta-caja p-4">
          <h2 className="h5 text-warning fw-bold mb-3">
            Detalle de Boleta {boletaSeleccionada.numero}
          </h2>
          <p className="text-white mb-1">
            <strong>Cliente:</strong> {boletaSeleccionada.nombre} {boletaSeleccionada.apellidos}
          </p>
          <p className="text-white mb-2">
            <strong>Despacho:</strong> {boletaSeleccionada.calle}, {boletaSeleccionada.comuna}, {boletaSeleccionada.region}
          </p>
          <ul className="mb-3">{detalleItems}</ul>
          <p className="precio-dorado mb-0">Total: ${boletaSeleccionada.total}</p>
        </div>
      )}
    </main>
  );
}
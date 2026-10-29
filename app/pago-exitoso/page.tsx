"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { obtenerUltimaOrden } from "../../data/datosEstigia";

export default function PagoExitosoPage() {
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    setOrden(obtenerUltimaOrden());
  }, []);

  if (!orden) {
    return <main className="container py-5 text-white">Cargando resumen...</main>;
  }

  let filas = [];
  orden.items.forEach(item => {
    filas.push(
      <tr key={item.id}>
        <td><img src={item.imagen} alt={item.nombre} style={{ width: "40px", height: "40px", objectFit: "contain" }} /></td>
        <td>{item.nombre}</td>
        <td>${item.precio}</td>
        <td>{item.cantidad}</td>
        <td className="precio-dorado fs-6">${item.precio * item.cantidad}</td>
      </tr>
    );
  });

  return (
    <main className="container py-5">
      <div className="tarjeta-caja p-4">
        <h1 className="h4 fw-bold text-success mb-3">
          ✅ Se ha realizado la compra. nro {orden.numero}
        </h1>
        <p className="text-white mb-1"><strong>Cliente:</strong> {orden.nombre} {orden.apellidos} ({orden.correo})</p>
        <p className="text-secondary mb-4"><strong>Dirección:</strong> {orden.calle} {orden.departamento}, {orden.comuna}, {orden.region}</p>

        <table className="table table-dark table-striped align-middle mb-4">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>{filas}</tbody>
        </table>

        <h2 className="h4 text-white fw-bold text-center mb-4">
          Total pagado: <span className="precio-dorado">${orden.total}</span>
        </h2>

        <div className="text-center">
          <button type="button" className="btn btn-danger me-2" onClick={() => window.print()}>
            Imprimir boleta en PDF
          </button>
          <button type="button" className="btn btn-success me-2" onClick={() => alert("Boleta enviada a " + orden.correo)}>
            Enviar boleta por email
          </button>
          <Link href="/" className="btn btn-outline-light">Volver al Home</Link>
        </div>
      </div>
    </main>
  );
}
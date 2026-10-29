"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { obtenerUltimaOrden } from "../../data/datosEstigia";

export default function PagoErrorPage() {
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    setOrden(obtenerUltimaOrden());
  }, []);

  if (!orden) {
    return <main className="container py-5 text-white">Cargando detalle...</main>;
  }

  let filas = [];
  orden.items.forEach(item => {
    filas.push(
      <tr key={item.id}>
        <td><img src={item.imagen} alt={item.nombre} style={{ width: "40px", height: "40px", objectFit: "contain" }} /></td>
        <td>{item.nombre}</td>
        <td>${item.precio}</td>
        <td>{item.cantidad}</td>
        <td>${item.precio * item.cantidad}</td>
      </tr>
    );
  });

  return (
    <main className="container py-5">
      <div className="tarjeta-caja p-4 text-center">
        <h1 className="h4 fw-bold text-danger mb-2">
          ❌ No se pudo realizar el pago. nro {orden.numero}
        </h1>
        <p className="text-secondary mb-3">Detalle de compra</p>
        <Link href="/checkout" className="btn btn-success fw-bold mb-4">
          VOLVER A REALIZAR EL PAGO
        </Link>

        <table className="table table-dark table-striped align-middle mb-4 text-start">
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

        <h2 className="h4 text-white fw-bold">Total pagado: ${orden.total}</h2>
      </div>
    </main>
  );
}
"use client";

import Link from "next/link";

export default function ProductCard({ producto, onAgregar }) {
  let precioMostrar = producto.enOferta ? producto.precioOferta : producto.precio;

  return (
    <article className="tarjeta-caja text-center">
      <img src={producto.imagen} alt={producto.nombre} className="img-fluid" />
      <h3 className="h6 text-white mt-3 mb-1">{producto.nombre}</h3>
      <p className="small text-secondary mb-2">{producto.categoria}</p>
      <p className="precio-dorado mb-2">${precioMostrar}</p>
      <p className="small text-secondary mb-3">Stock: {producto.stock}</p>
      <div className="d-grid gap-2">
        <Link href={"/productos/" + producto.id} className="btn btn-sm btn-outline-light">
          Ver detalle
        </Link>
        <button
          type="button"
          className="boton-rojo w-100"
          onClick={() => onAgregar(producto)}
        >
          Añadir al carrito
        </button>
      </div>
    </article>
  );
}
"use client";

import { agregarAlCarritoCRUD } from "../data/datosEstigia";

export default function BotonAgregar({ producto }) {
  function agregar() {
    agregarAlCarritoCRUD(producto);
    alert(producto.nombre + " añadido al carrito.");
  }

  return (
    <button type="button" className="boton-rojo me-2" onClick={agregar}>
      Añadir al carrito
    </button>
  );
}
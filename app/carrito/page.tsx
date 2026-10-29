"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  obtenerProductos,
  obtenerCarrito,
  agregarAlCarritoCRUD,
  restarDelCarritoCRUD,
  eliminarDelCarritoCRUD,
  vaciarCarritoCRUD,
  calcularTotal
} from "../../data/datosEstigia";

export default function CarritoPage() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos());
    setCarrito(obtenerCarrito());
  }, []);

  function sumar(prod) {
    setCarrito(agregarAlCarritoCRUD(prod));
  }

  function restar(id) {
    setCarrito(restarDelCarritoCRUD(id));
  }

  function eliminar(id) {
    setCarrito(eliminarDelCarritoCRUD(id));
  }

  function limpiar() {
    setCarrito(vaciarCarritoCRUD());
  }

  let listaProductos = [];
  productos.forEach(prod => {
    listaProductos.push(
      <div className="col-6" key={prod.id}>
        <article className="tarjeta-caja text-center p-2">
          <img src={prod.imagen} alt={prod.nombre} style={{ height: "90px", objectFit: "contain" }} />
          <h3 className="small fw-bold text-white mt-2">{prod.nombre}</h3>
          <p className="precio-dorado fs-6 mb-2">${prod.precio}</p>
          <button type="button" className="boton-rojo btn-sm w-100" onClick={() => sumar(prod)}>
            Añadir
          </button>
        </article>
      </div>
    );
  });

  let filasCarrito = [];
  carrito.forEach(item => {
    let subtotal = item.precio * item.cantidad;
    filasCarrito.push(
      <tr key={item.id}>
        <td>
          <img src={item.imagen} alt={item.nombre} style={{ width: "45px", height: "45px", objectFit: "contain" }} />
        </td>
        <td>{item.nombre}</td>
        <td>${item.precio}</td>
        <td>
          <button type="button" className="btn btn-sm btn-secondary me-1" onClick={() => restar(item.id)}>-</button>
          <span className="mx-1">{item.cantidad}</span>
          <button type="button" className="btn btn-sm btn-secondary ms-1" onClick={() => sumar(item)}>+</button>
        </td>
        <td className="precio-dorado fs-6">${subtotal}</td>
        <td>
          <button type="button" className="btn btn-sm btn-danger" onClick={() => eliminar(item.id)}>
            Eliminar
          </button>
        </td>
      </tr>
    );
  });

  let total = calcularTotal(carrito);

  return (
    <main className="container py-5">
      <div className="row g-4">
        <div className="col-lg-5">
          <h2 className="h4 fw-bold text-white mb-3">Lista de productos</h2>
          <div className="row g-3">{listaProductos}</div>
        </div>

        <div className="col-lg-7">
          <h2 className="h4 fw-bold text-white mb-3">Carrito de Compras</h2>
          <div className="tarjeta-caja p-3">
            <div className="table-responsive">
              <table className="table table-dark table-striped align-middle mb-0">
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>{filasCarrito}</tbody>
              </table>
            </div>

            <div className="text-end mt-3">
              <h3 className="h5 text-white fw-bold">Total: <span className="precio-dorado">${total}</span></h3>
              <button type="button" className="btn btn-secondary me-2" onClick={limpiar}>Limpiar</button>
              <Link href="/checkout" className="btn btn-success fw-bold">Comprar ahora</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
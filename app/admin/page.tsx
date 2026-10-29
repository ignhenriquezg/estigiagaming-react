"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  obtenerProductos,
  obtenerUsuarios,
  obtenerOrdenes
} from "../../data/datosEstigia";

export default function AdminInicioPage() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalCriticos, setTotalCriticos] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalOrdenes, setTotalOrdenes] = useState(0);

  useEffect(() => {
    let prods = obtenerProductos();
    let users = obtenerUsuarios();
    let ords = obtenerOrdenes();

    let criticos = 0;
    prods.forEach(p => {
      if (p.stock <= p.stockCritico) {
        criticos = criticos + 1;
      }
    });

    setTotalProductos(prods.length);
    setTotalCriticos(criticos);
    setTotalUsuarios(users.length);
    setTotalOrdenes(ords.length);
  }, []);

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-white fw-bold">Panel de Control del Administrador</h1>
        <span className="badge bg-secondary p-2">Sistema Administrativo</span>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="tarjeta-caja text-center p-4">
            <h2 className="h6 text-secondary">COMPRAS / ÓRDENES</h2>
            <p className="fs-2 text-primary fw-bold mb-0">{totalOrdenes}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="tarjeta-caja text-center p-4">
            <h2 className="h6 text-secondary">PRODUCTOS EN TIENDA</h2>
            <p className="fs-2 text-warning fw-bold mb-0">{totalProductos}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="tarjeta-caja text-center p-4">
            <h2 className="h6 text-secondary">EN STOCK CRÍTICO</h2>
            <p className="fs-2 text-danger fw-bold mb-0">{totalCriticos}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="tarjeta-caja text-center p-4">
            <h2 className="h6 text-secondary">USUARIOS REGISTRADOS</h2>
            <p className="fs-2 text-white fw-bold mb-0">{totalUsuarios}</p>
          </div>
        </div>
      </div>

      <div className="tarjeta-caja p-4">
        <h3 className="h5 text-white mb-3">Menú de Gestión</h3>
        <div className="d-flex gap-3 flex-wrap">
          <Link href="/admin/productos" className="boton-rojo">
            Ver lista de productos
          </Link>
          <Link href="/admin/productos/nuevo" className="boton-dorado">
            + Nuevo producto
          </Link>
          <Link href="/admin/categorias" className="boton-rojo">
            Categorías
          </Link>
          <Link href="/admin/usuarios" className="boton-rojo">
            Ver lista de usuarios
          </Link>
          <Link href="/admin/usuarios/nuevo" className="boton-dorado">
            + Nuevo usuario
          </Link>
          <Link href="/admin/boletas" className="boton-dorado">
            Ver Boletas / Órdenes
          </Link>
        </div>
      </div>
    </main>
  );
}
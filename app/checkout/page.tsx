"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  obtenerCarrito,
  calcularTotal,
  obtenerUsuarioSesion,
  obtenerComunasPorRegion,
  guardarOrdenCompra,
  vaciarCarritoCRUD
} from "../../data/datosEstigia";

export default function CheckoutPage() {
  const router = useRouter();
  const [carrito, setCarrito] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [calle, setCalle] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [region, setRegion] = useState("Metropolitana");
  const [comuna, setComuna] = useState("Cerrillos");
  const [indicaciones, setIndicaciones] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    setCarrito(obtenerCarrito());
    let sesion = obtenerUsuarioSesion();
    if (sesion) {
      setNombre(sesion.nombre);
      setApellidos(sesion.apellidos);
      setCorreo(sesion.correo);
      setCalle(sesion.direccion);
      setRegion(sesion.region);
      setComuna(sesion.comuna);
    }
  }, []);

  function cambiarRegion(nuevaRegion) {
    setRegion(nuevaRegion);
    let comunas = obtenerComunasPorRegion(nuevaRegion);
    if (comunas.length > 0) {
      setComuna(comunas[0]);
    }
  }

  function procesarPago(conError) {
    if (nombre.trim() === "" || apellidos.trim() === "" || correo.trim() === "" || calle.trim() === "") {
      setMensajeError("Complete todos los campos obligatorios marcados con *.");
      return;
    }

    let total = calcularTotal(carrito);
    let nuevaOrden = {
      id: String(Date.now()),
      numero: "#20240705",
      fecha: "2026-10-26",
      nombre: nombre,
      apellidos: apellidos,
      correo: correo,
      calle: calle,
      departamento: departamento,
      region: region,
      comuna: comuna,
      indicaciones: indicaciones,
      items: carrito,
      total: total,
      estado: conError ? "Fallido" : "Pagado"
    };

    guardarOrdenCompra(nuevaOrden);

    if (conError) {
      router.push("/pago-error");
    } else {
      vaciarCarritoCRUD();
      router.push("/pago-exitoso");
    }
  }

  let filas = [];
  carrito.forEach(item => {
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

  let opcionesComunas = [];
  obtenerComunasPorRegion(region).forEach(c => {
    opcionesComunas.push(<option key={c} value={c}>{c}</option>);
  });

  let totalPagar = calcularTotal(carrito);

  return (
    <main className="container py-5">
      <div className="tarjeta-caja p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h4 fw-bold text-white mb-0">Carrito de compra - Checkout</h1>
          <span className="badge bg-primary fs-5">Total a pagar: ${totalPagar}</span>
        </div>

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

        {mensajeError !== "" && <p className="mensaje-error mb-3">{mensajeError}</p>}

        <h2 className="h5 text-white fw-bold mb-3">Información del cliente</h2>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label text-white small">Nombre*</label>
            <input type="text" className="form-control bg-dark text-white border-secondary" value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label text-white small">Apellidos*</label>
            <input type="text" className="form-control bg-dark text-white border-secondary" value={apellidos} onChange={e => setApellidos(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label text-white small">Correo*</label>
            <input type="email" className="form-control bg-dark text-white border-secondary" value={correo} onChange={e => setCorreo(e.target.value)} />
          </div>
        </div>

        <h2 className="h5 text-white fw-bold mb-3">Dirección de entrega de los productos</h2>
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <label className="form-label text-white small">Calle*</label>
            <input type="text" className="form-control bg-dark text-white border-secondary" value={calle} onChange={e => setCalle(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label text-white small">Departamento (opcional)</label>
            <input type="text" className="form-control bg-dark text-white border-secondary" value={departamento} onChange={e => setDepartamento(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-white small">Región*</label>
            <select className="form-select bg-dark text-white border-secondary" value={region} onChange={e => cambiarRegion(e.target.value)}>
              <option value="Metropolitana">Región Metropolitana</option>
              <option value="Valparaiso">Región de Valparaíso</option>
              <option value="Biobio">Región del Biobío</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label text-white small">Comuna*</label>
            <select className="form-select bg-dark text-white border-secondary" value={comuna} onChange={e => setComuna(e.target.value)}>
              {opcionesComunas}
            </select>
          </div>
          <div className="col-12">
            <label className="form-label text-white small">Indicaciones para la entrega (opcional)</label>
            <textarea className="form-control bg-dark text-white border-secondary" rows={2} value={indicaciones} onChange={e => setIndicaciones(e.target.value)} />
          </div>
        </div>

        <div className="text-end">
          <button type="button" className="btn btn-outline-danger me-2" onClick={() => procesarPago(true)}>
            Simular Pago con Error
          </button>
          <button type="button" className="btn btn-success fw-bold px-4" onClick={() => procesarPago(false)}>
            Pagar ahora ${totalPagar}
          </button>
        </div>
      </div>
    </main>
  );
}
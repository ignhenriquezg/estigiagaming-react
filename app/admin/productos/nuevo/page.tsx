"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { crearProductoCRUD } from "../../../../data/datosEstigia";

export default function AdminNuevoProductoPage() {
  const router = useRouter();
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [errorCodigo, setErrorCodigo] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorCategoria, setErrorCategoria] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorStock, setErrorStock] = useState("");

  function guardarProducto() {
    setErrorCodigo("");
    setErrorNombre("");
    setErrorCategoria("");
    setErrorPrecio("");
    setErrorStock("");

    let correcto = true;
    let codigoLimpio = codigo.trim();
    let nombreLimpio = nombre.trim();

    if (codigoLimpio.length < 3) {
      setErrorCodigo("El código debe tener al menos 3 caracteres.");
      correcto = false;
    }
    if (nombreLimpio === "") {
      setErrorNombre("El nombre es obligatorio.");
      correcto = false;
    }
    if (categoria === "") {
      setErrorCategoria("Seleccione una categoría.");
      correcto = false;
    }
    if (precio === "" || parseFloat(precio) < 0) {
      setErrorPrecio("Precio inválido (debe ser mayor o igual a 0).");
      correcto = false;
    }
    if (stock === "" || parseInt(stock) < 0) {
      setErrorStock("Stock inválido (debe ser mayor o igual a 0).");
      correcto = false;
    }

    if (correcto) {
      crearProductoCRUD({
        codigo: codigoLimpio,
        nombre: nombreLimpio,
        categoria: categoria,
        precio: parseInt(precio),
        precioOferta: parseInt(precio),
        enOferta: false,
        stock: parseInt(stock),
        stockCritico: 5,
        imagen: "/imagenes/producto-1.jpg",
        descripcion: descripcion.trim() || "Componente gamer de alto rendimiento."
      });
      alert("¡Producto " + nombreLimpio + " guardado con éxito!");
      router.push("/admin/productos");
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="tarjeta-caja p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h4 fw-bold text-white mb-0">Ingresar Nuevo Producto</h1>
              <Link href="/admin/productos" className="btn btn-sm btn-outline-light">
                Volver al inventario
              </Link>
            </div>

            <form>
              <div className="mb-3">
                <label className="form-label text-white small fw-bold">
                  Código (mínimo 3 caracteres):
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ej: STG-007"
                  value={codigo}
                  onChange={e => setCodigo(e.target.value)}
                />
                <span className="mensaje-error">{errorCodigo}</span>
              </div>

              <div className="mb-3">
                <label className="form-label text-white small fw-bold">
                  Nombre del producto:
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ej: Mouse Gamer"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
                <span className="mensaje-error">{errorNombre}</span>
              </div>

              <div className="mb-3">
                <label className="form-label text-white small fw-bold">Categoría:</label>
                <select
                  className="form-select bg-dark text-white border-secondary"
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                >
                  <option value="">-- Seleccionar categoría --</option>
                  <option value="Periféricos">Periféricos</option>
                  <option value="Monitores">Monitores</option>
                  <option value="Componentes">Componentes</option>
                  <option value="Audio">Audio</option>
                </select>
                <span className="mensaje-error">{errorCategoria}</span>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label text-white small fw-bold">Precio en CLP:</label>
                  <input
                    type="number"
                    className="form-control bg-dark text-white border-secondary"
                    min="0"
                    placeholder="Ej: 29990"
                    value={precio}
                    onChange={e => setPrecio(e.target.value)}
                  />
                  <span className="mensaje-error">{errorPrecio}</span>
                </div>
                <div className="col-6">
                  <label className="form-label text-white small fw-bold">Stock:</label>
                  <input
                    type="number"
                    className="form-control bg-dark text-white border-secondary"
                    min="0"
                    placeholder="Ej: 10"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                  />
                  <span className="mensaje-error">{errorStock}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-white small fw-bold">
                  Descripción (opcional):
                </label>
                <textarea
                  rows={3}
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Detalles técnicos..."
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="boton-dorado w-100 py-2"
                onClick={guardarProducto}
              >
                Guardar producto
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
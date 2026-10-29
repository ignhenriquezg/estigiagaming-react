import baseDatos from "../db.json";

export const PRODUCTOS_BASE = baseDatos.productos;
export const CATEGORIAS_BASE = baseDatos.categorias;
export const USUARIOS_BASE = baseDatos.usuarios;
export const BLOGS_BASE = baseDatos.blogs;
export const ORDENES_BASE = baseDatos.ordenes;

export function obtenerComunasPorRegion(region) {
  if (region === "Metropolitana") {
    return ["Santiago", "Lo Prado", "Pudahuel", "Maipú", "Cerrillos", "Providencia", "Las Condes"];
  } else if (region === "Valparaiso") {
    return ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"];
  } else if (region === "Biobio") {
    return ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante"];
  }
  return [];
}

export function obtenerProductos() {
  if (typeof window === "undefined") return PRODUCTOS_BASE;
  let guardados = localStorage.getItem("estigia_productos");
  if (guardados) {
    return JSON.parse(guardados);
  }
  localStorage.setItem("estigia_productos", JSON.stringify(PRODUCTOS_BASE));
  return PRODUCTOS_BASE;
}

export function crearProductoCRUD(nuevoProducto) {
  let lista = obtenerProductos();
  nuevoProducto.id = String(lista.length + 1);
  lista.push(nuevoProducto);
  localStorage.setItem("estigia_productos", JSON.stringify(lista));

  fetch("http://localhost:4000/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoProducto)
  }).catch(() => {});

  return lista;
}

export function actualizarProductoCRUD(productoEditado) {
  let lista = obtenerProductos();
  let nuevaLista = [];
  lista.forEach(item => {
    if (String(item.id) === String(productoEditado.id)) {
      nuevaLista.push(productoEditado);
    } else {
      nuevaLista.push(item);
    }
  });
  localStorage.setItem("estigia_productos", JSON.stringify(nuevaLista));
  return nuevaLista;
}

export function eliminarProductoCRUD(id) {
  let lista = obtenerProductos();
  let nuevaLista = [];
  lista.forEach(item => {
    if (String(item.id) !== String(id)) {
      nuevaLista.push(item);
    }
  });
  localStorage.setItem("estigia_productos", JSON.stringify(nuevaLista));

  fetch("http://localhost:4000/productos/" + id, {
    method: "DELETE"
  }).catch(() => {});

  return nuevaLista;
}

export function obtenerCategorias() {
  if (typeof window === "undefined") return CATEGORIAS_BASE;
  let guardadas = localStorage.getItem("estigia_categorias");
  if (guardadas) {
    return JSON.parse(guardadas);
  }
  localStorage.setItem("estigia_categorias", JSON.stringify(CATEGORIAS_BASE));
  return CATEGORIAS_BASE;
}

export function crearCategoriaCRUD(nuevaCategoria) {
  let lista = obtenerCategorias();
  nuevaCategoria.id = String(lista.length + 1);
  lista.push(nuevaCategoria);
  localStorage.setItem("estigia_categorias", JSON.stringify(lista));
  return lista;
}

export function eliminarCategoriaCRUD(id) {
  let lista = obtenerCategorias();
  let nuevaLista = [];
  lista.forEach(item => {
    if (String(item.id) !== String(id)) {
      nuevaLista.push(item);
    }
  });
  localStorage.setItem("estigia_categorias", JSON.stringify(nuevaLista));
  return nuevaLista;
}

export function obtenerUsuarios() {
  if (typeof window === "undefined") return USUARIOS_BASE;
  let guardados = localStorage.getItem("estigia_usuarios");
  if (guardados) {
    return JSON.parse(guardados);
  }
  localStorage.setItem("estigia_usuarios", JSON.stringify(USUARIOS_BASE));
  return USUARIOS_BASE;
}

export function crearUsuarioCRUD(nuevoUsuario) {
  let lista = obtenerUsuarios();
  lista.push(nuevoUsuario);
  localStorage.setItem("estigia_usuarios", JSON.stringify(lista));

  fetch("http://localhost:4000/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoUsuario)
  }).catch(() => {});

  return lista;
}

export function eliminarUsuarioCRUD(run) {
  let lista = obtenerUsuarios();
  let nuevaLista = [];
  lista.forEach(item => {
    if (item.run !== run) {
      nuevaLista.push(item);
    }
  });
  localStorage.setItem("estigia_usuarios", JSON.stringify(nuevaLista));
  return nuevaLista;
}

export function obtenerCarrito() {
  if (typeof window === "undefined") return [];
  let guardado = localStorage.getItem("estigia_carrito");
  if (guardado) {
    return JSON.parse(guardado);
  }
  return [];
}

export function guardarCarrito(carrito) {
  if (typeof window === "undefined") return;
  localStorage.setItem("estigia_carrito", JSON.stringify(carrito));
  window.dispatchEvent(new Event("cambioCarrito"));
}

export function agregarAlCarritoCRUD(producto) {
  let carrito = obtenerCarrito();
  let encontrado = false;
  let precioReal = producto.enOferta ? producto.precioOferta : producto.precio;

  carrito.forEach(item => {
    if (String(item.id) === String(producto.id)) {
      item.cantidad = item.cantidad + 1;
      encontrado = true;
    }
  });

  if (!encontrado) {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: precioReal,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  return carrito;
}

export function restarDelCarritoCRUD(id) {
  let carrito = obtenerCarrito();
  let nuevoCarrito = [];

  carrito.forEach(item => {
    if (String(item.id) === String(id)) {
      if (item.cantidad > 1) {
        item.cantidad = item.cantidad - 1;
        nuevoCarrito.push(item);
      }
    } else {
      nuevoCarrito.push(item);
    }
  });

  guardarCarrito(nuevoCarrito);
  return nuevoCarrito;
}

export function eliminarDelCarritoCRUD(id) {
  let carrito = obtenerCarrito();
  let nuevoCarrito = [];

  carrito.forEach(item => {
    if (String(item.id) !== String(id)) {
      nuevoCarrito.push(item);
    }
  });

  guardarCarrito(nuevoCarrito);
  return nuevoCarrito;
}

export function vaciarCarritoCRUD() {
  guardarCarrito([]);
  return [];
}

export function calcularTotal(carrito) {
  let total = 0;
  carrito.forEach(item => {
    total = total + item.precio * item.cantidad;
  });
  return total;
}

export function obtenerUsuarioSesion() {
  if (typeof window === "undefined") return null;
  let guardado = localStorage.getItem("estigia_sesion");
  if (guardado) {
    return JSON.parse(guardado);
  }
  return null;
}

export function guardarUsuarioSesion(usuario) {
  if (typeof window === "undefined") return;
  if (usuario) {
    localStorage.setItem("estigia_sesion", JSON.stringify(usuario));
  } else {
    localStorage.removeItem("estigia_sesion");
  }
  window.dispatchEvent(new Event("cambioCarrito"));
}

export function obtenerOrdenes() {
  if (typeof window === "undefined") return ORDENES_BASE;
  let guardadas = localStorage.getItem("estigia_ordenes");
  if (guardadas) {
    return JSON.parse(guardadas);
  }
  localStorage.setItem("estigia_ordenes", JSON.stringify(ORDENES_BASE));
  return ORDENES_BASE;
}

export function guardarOrdenCompra(nuevaOrden) {
  let lista = obtenerOrdenes();
  lista.push(nuevaOrden);
  localStorage.setItem("estigia_ordenes", JSON.stringify(lista));
  localStorage.setItem("estigia_ultima_orden", JSON.stringify(nuevaOrden));
  return nuevaOrden;
}

export function obtenerUltimaOrden() {
  if (typeof window === "undefined") return null;
  let guardada = localStorage.getItem("estigia_ultima_orden");
  if (guardada) {
    return JSON.parse(guardada);
  }
  return ORDENES_BASE[0];
}
function renderizarListaProductos(productos) {
  let contenedor = document.createElement("ul");
  contenedor.id = "lista-productos";

  productos.forEach(function (prod) {
    let item = document.createElement("li");
    item.className = "item-producto";
    item.innerText = prod.nombre + " - $" + prod.precio;
    contenedor.appendChild(item);
  });

  return contenedor;
}

function renderizarMensajeError(mensajeError) {
  let contenedor = document.createElement("div");

  if (mensajeError && mensajeError.trim() !== "") {
    let span = document.createElement("span");
    span.className = "mensaje-error";
    span.innerText = mensajeError;
    contenedor.appendChild(span);
  }

  return contenedor;
}

function crearBotonEstigia(props) {
  let boton = document.createElement("button");
  boton.className = "boton-rojo";
  boton.innerText = props.etiqueta;

  if (props.onClick) {
    boton.addEventListener("click", props.onClick);
  }

  return boton;
}

function renderizarTarjetaProducto(props) {
  let articulo = document.createElement("article");
  articulo.className = "tarjeta-caja";

  let titulo = document.createElement("h3");
  titulo.innerText = props.nombre;

  let categoria = document.createElement("p");
  categoria.className = "categoria-texto";
  categoria.innerText = props.categoria;

  let precio = document.createElement("p");
  precio.className = "precio-dorado";
  precio.innerText = "$" + props.precio;

  articulo.appendChild(titulo);
  articulo.appendChild(categoria);
  articulo.appendChild(precio);

  return articulo;
}

function crearEstadoFormulario() {
  return {
    nombre: "",
    correo: "",
    comentario: "",
    cambiarCampo: function (campo, valor) {
      this[campo] = valor;
    }
  };
}

function crearEstadoCarrito() {
  return {
    items: [],
    contador: 0,
    total: 0,
    agregarProducto: function (producto) {
      this.items.push(producto);
      this.contador = this.contador + 1;
      this.total = this.total + producto.precio;
    },
    vaciar: function () {
      this.items = [];
      this.contador = 0;
      this.total = 0;
    }
  };
}

function validarRunUsuario(run) {
  let limpio = run.trim();
  if (limpio === "") {
    return false;
  }
  if (limpio.includes(".") || limpio.includes("-")) {
    return false;
  }
  if (limpio.length < 7 || limpio.length > 9) {
    return false;
  }
  return true;
}

function validarCorreoUsuario(correo) {
  let limpio = correo.trim().toLowerCase();
  if (limpio === "") {
    return false;
  }
  let regla = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return regla.test(limpio);
}
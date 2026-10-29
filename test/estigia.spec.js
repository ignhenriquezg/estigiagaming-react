describe("Suite de Pruebas Unitarias Front-End - EstigiaGaming", function () {

  it("1. Renderizado correcto: debería renderizar todos los productos de la lista", function () {
    let datosProductos = [
      { id: "1", nombre: "Mouse Gamer Estigia V32", precio: 49990 },
      { id: "2", nombre: "Teclado Mecánico Zagreus Pro", precio: 89990 },
      { id: "3", nombre: "Monitor Curvo Hades 240Hz", precio: 259990 }
    ];

    let listaDOM = renderizarListaProductos(datosProductos);
    let elementos = listaDOM.querySelectorAll(".item-producto");

    expect(elementos.length).toBe(3);
    expect(elementos[0].innerText).toContain("Mouse Gamer Estigia V32");
    expect(elementos[1].innerText).toContain("Teclado Mecánico Zagreus Pro");
  });

  it("2. Renderizado condicional: debería mostrar el mensaje de error cuando hay un error presente", function () {
    let contenedor = renderizarMensajeError("El correo es obligatorio.");
    let spanError = contenedor.querySelector(".mensaje-error");

    expect(spanError).not.toBeNull();
    expect(spanError.innerText).toBe("El correo es obligatorio.");
  });

  it("3. Renderizado condicional: no debería mostrar ningún mensaje cuando no hay error", function () {
    let contenedor = renderizarMensajeError("");
    let spanError = contenedor.querySelector(".mensaje-error");

    expect(spanError).toBeNull();
  });

  it("4. Propiedades (props): el botón debería recibir correctamente la etiqueta y la función onClick", function () {
    let funcionEspia = jasmine.createSpy("onClick");
    let boton = crearBotonEstigia({
      etiqueta: "Añadir al carrito",
      onClick: funcionEspia
    });

    expect(boton.innerText).toBe("Añadir al carrito");
    boton.click();
    expect(funcionEspia).toHaveBeenCalled();
  });

  it("5. Propiedades (props): la tarjeta de producto debería mostrar nombre, categoría y precio recibidos", function () {
    let tarjeta = renderizarTarjetaProducto({
      nombre: "Tarjeta Gráfica RTX 5060",
      categoria: "Componentes",
      precio: 389990
    });

    expect(tarjeta.querySelector("h3").innerText).toBe("Tarjeta Gráfica RTX 5060");
    expect(tarjeta.querySelector(".categoria-texto").innerText).toBe("Componentes");
    expect(tarjeta.querySelector(".precio-dorado").innerText).toBe("$389990");
  });

  it("6. Gestión de Estado (state): debería actualizar el estado del formulario cuando el usuario introduce texto", function () {
    let estadoFormulario = crearEstadoFormulario();

    estadoFormulario.cambiarCampo("nombre", "Ignacio Henríquez");
    estadoFormulario.cambiarCampo("correo", "ign.henriquezg@duoc.cl");

    expect(estadoFormulario.nombre).toBe("Ignacio Henríquez");
    expect(estadoFormulario.correo).toBe("ign.henriquezg@duoc.cl");
  });

  it("7. Gestión de Estado (state): debería actualizar el contador y el total al agregar y vaciar el carrito", function () {
    let carrito = crearEstadoCarrito();

    carrito.agregarProducto({ id: "1", nombre: "Mouse Gamer", precio: 49990 });
    carrito.agregarProducto({ id: "2", nombre: "Teclado Mecánico", precio: 89990 });

    expect(carrito.contador).toBe(2);
    expect(carrito.total).toBe(139980);

    carrito.vaciar();
    expect(carrito.contador).toBe(0);
    expect(carrito.total).toBe(0);
  });

  it("8. Simulación de Eventos: debería incrementar el estado del carrito al simular un clic en el botón", function () {
    let carrito = crearEstadoCarrito();
    let botonAgregar = crearBotonEstigia({
      etiqueta: "Comprar",
      onClick: function () {
        carrito.agregarProducto({ id: "4", nombre: "Auriculares Melinoe", precio: 64990 });
      }
    });

    botonAgregar.click();

    expect(carrito.contador).toBe(1);
    expect(carrito.total).toBe(64990);
  });

  it("9. Lógica de Validación: debería validar correctamente el RUN sin puntos ni guion y los correos permitidos", function () {
    expect(validarRunUsuario("214089572")).toBe(true);
    expect(validarRunUsuario("21.408.957-2")).toBe(false);
    expect(validarRunUsuario("")).toBe(false);
    expect(validarRunUsuario("123")).toBe(false);

    expect(validarCorreoUsuario("ign.henriquezg@duoc.cl")).toBe(true);
    expect(validarCorreoUsuario("usuario@gmail.com")).toBe(true);
    expect(validarCorreoUsuario("usuario@hotmail.com")).toBe(false);
    expect(validarCorreoUsuario("")).toBe(false);
  });

  it("10. Uso de Mocks: debería simular la llamada a la API de productos con createSpyObj", async function () {
    let servicioAPI = jasmine.createSpyObj("ServicioAPI", ["getData"]);
    servicioAPI.getData.and.returnValue(
      Promise.resolve({
        productos: [{ id: "1", nombre: "Mouse Gamer Estigia V32", precio: 49990 }]
      })
    );

    let respuesta = await servicioAPI.getData();

    expect(servicioAPI.getData).toHaveBeenCalled();
    expect(respuesta.productos.length).toBe(1);
    expect(respuesta.productos[0].nombre).toBe("Mouse Gamer Estigia V32");
  });

});
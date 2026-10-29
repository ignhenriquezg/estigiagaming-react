"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  obtenerCarrito,
  calcularTotal,
  obtenerUsuarioSesion,
  guardarUsuarioSesion
} from "../data/datosEstigia";

let tema_musical = {
  nombre: "No Escape - Hades",
  artista: "Darren Korb",
  archivo: "/audio/hades-tema.mp3",
  playing: false,
  audio: null,
  play: function () {
    if (!this.audio) {
      this.audio = new Audio(this.archivo);
    }
    this.audio.play();
    this.playing = true;
  },
  pausar: function () {
    if (this.playing && this.audio) {
      this.audio.pause();
      this.playing = false;
    }
  },
  bajarVolumen: function () {
    if (this.audio && this.audio.volume > 0.2) {
      this.audio.volume = this.audio.volume - 0.2;
    } else if (this.audio) {
      this.audio.volume = 0;
    }
  },
  subirVolumen: function () {
    if (this.audio && this.audio.volume < 0.8) {
      this.audio.volume = this.audio.volume + 0.2;
    } else if (this.audio) {
      this.audio.volume = 1;
    }
  }
};

export default function NavbarEstigia() {
  const [cantidad, setCantidad] = useState(0);
  const [total, setTotal] = useState(0);
  const [usuario, setUsuario] = useState(null);

  const actualizarDatosMenu = () => {
    let carrito = obtenerCarrito();
    let sumaCantidad = 0;
    carrito.forEach(item => {
      sumaCantidad = sumaCantidad + item.cantidad;
    });
    setCantidad(sumaCantidad);
    setTotal(calcularTotal(carrito));
    setUsuario(obtenerUsuarioSesion());
  };

  useEffect(() => {
    actualizarDatosMenu();
    window.addEventListener("cambioCarrito", actualizarDatosMenu);
    return () => {
      window.removeEventListener("cambioCarrito", actualizarDatosMenu);
    };
  }, []);

  function tocar_tema() {
    tema_musical.play();
  }

  function pausar_tema() {
    tema_musical.pausar();
  }

  function bajar_volumen() {
    tema_musical.bajarVolumen();
  }

  function subir_volumen() {
    tema_musical.subirVolumen();
  }

  function salirSesion() {
    guardarUsuarioSesion(null);
    setUsuario(null);
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark barra-navegacion py-3">
        <div className="container">
          <img id="logopagina" src="/imagenes/logo.png" alt="Logo Estigia" className="me-2 rounded" />
          <Link className="navbar-brand logotipo-marca" href="/">
            ESTIGIA<span>GAMING🔥</span>
          </Link>

          <div className="collapse navbar-collapse show" id="menuPrincipal">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
              <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/productos">Productos</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/categorias">Categorías</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/ofertas">Ofertas</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/nosotros">Nosotros</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/blogs">Blogs</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/contacto">Contacto</Link></li>
            </ul>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div className="d-flex align-items-center gap-1">
                <button type="button" className="boton-dorado btn-sm" onClick={tocar_tema}>▶ Tocar</button>
                <button type="button" className="btn btn-sm btn-outline-secondary text-white" onClick={pausar_tema}>⏸ Pausar</button>
                <button type="button" className="btn btn-sm btn-outline-secondary text-white" onClick={bajar_volumen}>🔉 -</button>
                <button type="button" className="btn btn-sm btn-outline-secondary text-white" onClick={subir_volumen}>🔊 +</button>
              </div>

              {usuario ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-warning small fw-bold">{usuario.nombre}</span>
                  <Link href="/admin" className="btn btn-sm btn-outline-warning">Panel Admin</Link>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={salirSesion}>Salir</button>
                </div>
              ) : (
                <>
                  <Link href="/iniciar-sesion" className="nav-link">Iniciar sesión</Link>
                  <span className="text-secondary">|</span>
                  <Link href="/registro" className="nav-link">Registrar usuario</Link>
                </>
              )}

              <Link href="/carrito" className="btn btn-success btn-sm fw-bold ms-2">
                Carrito ${total} <span className="badge bg-danger ms-1" id="contador-carrito">{cantidad}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
import Link from "next/link";
import { BLOGS_BASE } from "../../data/datosEstigia";

export default function BlogsPage() {
  let filas = [];
  BLOGS_BASE.forEach(blog => {
    filas.push(
      <div className="col-md-6" key={blog.id}>
        <article className="tarjeta-caja">
          <img src={blog.imagen} alt={blog.titulo} />
          <h2 className="h5 text-white mt-3">{blog.titulo}</h2>
          <p className="text-secondary small">{blog.resumen}</p>
          <Link href={"/blogs/" + blog.id} className="boton-rojo btn-sm">
            Leer caso completo
          </Link>
        </article>
      </div>
    );
  });

  return (
    <main className="container py-5">
      <h1 className="h3 fw-bold text-white mb-4 text-center">Noticias y Casos Curiosos</h1>
      <div className="row g-4">{filas}</div>
    </main>
  );
}
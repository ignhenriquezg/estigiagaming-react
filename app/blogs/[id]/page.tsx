export const instant = false;
import Link from "next/link";

export default async function DetalleBlogPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await fetch("http://localhost:4000/blogs/" + id);
  const blogEncontrado = await response.json();

  let listaVentajas = [];
  blogEncontrado.ventajas.forEach((v, i) => {
    listaVentajas.push(<li key={i}>{v}</li>);
  });

  return (
    <main className="container py-5">
      <article className="tarjeta-caja p-4">
        <h1 className="h3 fw-bold text-white mb-3">{blogEncontrado.titulo}</h1>
        <img
          src={blogEncontrado.imagen}
          alt={blogEncontrado.titulo}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
        />
        <p className="text-secondary">{blogEncontrado.contenido}</p>
        <h2 className="h5 text-white mt-3">Recomendaciones y ventajas:</h2>
        <ul className="text-secondary">{listaVentajas}</ul>
        <Link href="/blogs" className="boton-rojo btn-sm mt-2">
          Volver a blogs
        </Link>
      </article>
    </main>
  );
}
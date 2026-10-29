export const instant = false;
import Link from "next/link";
import BotonAgregar from "../../../components/BotonAgregar";

export default async function ProductoConId(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const response = await fetch("http://localhost:4000/productos/" + slug);
  const product = await response.json();

  return (
    <main className="container py-5">
      <div className="tarjeta-caja p-4">
        <div className="row align-items-center g-4">
          <div className="col-md-5 text-center">
            <img src={product.imagen} alt={product.nombre} className="img-fluid" />
          </div>
          <div className="col-md-7">
            <span className="badge bg-secondary mb-2">{product.categoria}</span>
            <h1 className="h3 text-white fw-bold">{product.nombre}</h1>
            <p className="text-secondary">{product.descripcion}</p>
            <p className="precio-dorado">${product.precio}</p>
            <p className="small text-secondary">Stock disponible: {product.stock}</p>
            <BotonAgregar producto={product} />
            <Link href="/productos" className="btn btn-outline-light">
              Volver
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
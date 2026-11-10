import { Link } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'
import PortadaLibro from '../components/PortadaLibro'
import { plural } from '../utils/formato'

export default function Libros() {
  const libros = useNookStore((s) => s.libros)
  const publicaciones = useNookStore((s) => s.publicaciones)

  return (
    <main className="contenedor seccion">
      <div className="encabezado-pagina">
        <div>
          <p className="mono">{plural(libros.length, 'LIBRO', 'LIBROS')} · CARGADOS POR LA COMUNIDAD</p>
          <h1 className="h1 h1--grande">La <em>biblioteca</em></h1>
        </div>
        <Link to="/libros/nuevo" className="boton boton--primario">Agregar un libro</Link>
      </div>

      <div className="grilla-libros">
        {libros.map((l) => {
          const n = publicaciones.filter((p) => p.libroId === l.id).length
          return (
            <Link key={l.id} to={`/libros/${l.id}`} className="item-libro" aria-label={`${l.titulo}, de ${l.autor}`}>
              <PortadaLibro libro={l} size="md" />
              <span className="item-libro__titulo">{l.titulo}</span>
              <span className="item-libro__sub">{l.autor} · {plural(n, 'publicación', 'publicaciones', 'sin publicaciones')}</span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}

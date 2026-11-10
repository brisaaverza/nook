import { Link, useParams } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'
import Avatar from '../components/Avatar'
import PortadaLibro from '../components/PortadaLibro'
import HiloComentarios from '../components/HiloComentarios'
import Icono from '../components/Icono'
import { haceCuanto } from '../utils/formato'

export default function DetallePublicacion() {
  const { id } = useParams()
  const p = useNookStore((s) => s.publicaciones.find((x) => x.id === id))
  const autor = useNookStore((s) => (p ? s.usuarios.find((u) => u.id === p.autorId) : null))
  const libro = useNookStore((s) => (p && p.libroId ? s.libros.find((l) => l.id === p.libroId) : null))

  if (!p) return <main className="contenedor angosto"><p className="vacio">No encontramos esa publicación.</p></main>

  return (
    <main className="contenedor angosto">
      <Link to="/" className="volver"><Icono nombre="atras" /> Volver al inicio</Link>

      <article>
        <p className="mono">{libro ? 'SOBRE UN LIBRO' : 'DEBATE LIBRE'} · {haceCuanto(p.fecha).toUpperCase()}</p>
        <h1 className="h1">{p.titulo}</h1>

        <div className="autor-fila">
          <Avatar usuario={autor} size={40} />
          <div>
            <Link to={`/perfil/${autor.id}`} className="meta__nombre">{autor.nombre}</Link>
            <span className="mono" style={{ display: 'block' }}>@{autor.handle}</span>
          </div>
        </div>

        {libro && (
          <div className="caja-libro">
            <PortadaLibro libro={libro} size="sm" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="mono">ESTA PUBLICACIÓN ES SOBRE</p>
              <p className="caja-libro__titulo">{libro.titulo}</p>
              <p className="caja-libro__sub">{libro.autor}{libro.anio ? ` · ${libro.anio}` : ''}</p>
            </div>
            <Link to={`/libros/${libro.id}`} className="boton boton--borde">Ver libro</Link>
          </div>
        )}

        <p className="cuerpo-largo">{p.cuerpo}</p>
      </article>

      <HiloComentarios publicacionId={p.id} />
    </main>
  )
}

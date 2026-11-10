import { Link, useParams } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'
import PortadaLibro from '../components/PortadaLibro'
import Icono from '../components/Icono'
import { haceCuanto, plural } from '../utils/formato'

export default function DetalleLibro() {
  const { id } = useParams()
  const libro = useNookStore((s) => s.libros.find((l) => l.id === id))
  const usuarios = useNookStore((s) => s.usuarios)
  const publicaciones = useNookStore((s) => s.publicaciones)
  const comentarios = useNookStore((s) => s.comentarios)

  if (!libro) return <main className="contenedor"><p className="vacio">No encontramos ese libro.</p></main>

  const cargador = usuarios.find((u) => u.id === libro.cargadoPor)
  const pubs = publicaciones.filter((p) => p.libroId === libro.id && p.estado === 'visible').sort((a, b) => b.fecha - a.fecha)

  return (
    <main className="contenedor seccion-corta">
      <Link to="/libros" className="volver"><Icono nombre="atras" /> Biblioteca</Link>
      <div className="detalle-libro">
        <PortadaLibro libro={libro} size="lg" />
        <div className="detalle-libro__info">
          <p className="mono">{libro.anio ? `AÑO ${libro.anio}` : 'AÑO SIN DATO'} · CARGADO POR @{cargador?.handle}</p>
          <h1 className="h1 h1--grande">{libro.titulo}</h1>
          <p className="detalle-libro__autor">{libro.autor}</p>
          <Link to={`/publicar?libro=${libro.id}`} className="boton boton--primario" style={{ marginTop: 28 }}>Escribir sobre este libro</Link>

          <p className="mono rotulo rotulo--linea" style={{ marginTop: 48 }}>PUBLICACIONES SOBRE ESTE LIBRO · {pubs.length}</p>
          {pubs.map((p) => {
            const autor = usuarios.find((u) => u.id === p.autorId)
            const n = comentarios.filter((c) => c.publicacionId === p.id).length
            return (
              <div key={p.id} className="item-lista">
                <Link to={`/publicacion/${p.id}`} className="item-lista__titulo">{p.titulo}</Link>
                <p className="item-lista__sub">{autor.nombre} · {haceCuanto(p.fecha)} · {plural(n, 'comentario', 'comentarios', 'sin comentarios')}</p>
              </div>
            )
          })}
          {pubs.length === 0 && <p className="vacio">Nadie escribió sobre este libro todavía.</p>}
        </div>
      </div>
    </main>
  )
}

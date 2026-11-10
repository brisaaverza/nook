import { Link, useNavigate } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'
import Avatar from './Avatar'
import PortadaLibro from './PortadaLibro'
import Icono from './Icono'
import { haceCuanto, plural } from '../utils/formato'

export default function TarjetaPublicacion({ publicacion: p }) {
  const navigate = useNavigate()
  const autor = useNookStore((s) => s.usuarios.find((u) => u.id === p.autorId))
  const libro = useNookStore((s) => (p.libroId ? s.libros.find((l) => l.id === p.libroId) : null))
  const nComentarios = useNookStore((s) => s.comentarios.filter((c) => c.publicacionId === p.id).length)

  return (
    <article className="tarjeta">
      <div className="meta">
        <Avatar usuario={autor} />
        <Link to={`/perfil/${autor.id}`} className="meta__nombre">{autor.nombre}</Link>
        <span className="mono">@{autor.handle} · {haceCuanto(p.fecha)}</span>
      </div>

      <div className="tarjeta__cuerpo">
        <div className="tarjeta__texto">
          <Link to={`/publicacion/${p.id}`} className="tarjeta__titulo">{p.titulo}</Link>
          <p className="tarjeta__extracto">{p.cuerpo}</p>
        </div>
        {libro && <PortadaLibro libro={libro} size="sm" onClick={() => navigate(`/libros/${libro.id}`)} />}
      </div>

      <div className="tarjeta__pie">
        {libro ? (
          <Link to={`/libros/${libro.id}`} className="etiqueta etiqueta--libro">
            <Icono nombre="libro" size={14} /> Sobre «{libro.titulo}»
          </Link>
        ) : (
          <span className="etiqueta etiqueta--debate">
            <Icono nombre="debate" size={14} /> Debate libre
          </span>
        )}
        <Link to={`/publicacion/${p.id}`} className="tarjeta__comentarios">
          <Icono nombre="comentario" size={15} />
          {plural(nComentarios, 'comentario', 'comentarios', 'Sin comentarios')}
        </Link>
      </div>
    </article>
  )
}

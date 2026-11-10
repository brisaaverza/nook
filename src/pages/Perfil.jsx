import { Link, useParams } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'
import Avatar from '../components/Avatar'
import { haceCuanto } from '../utils/formato'

export default function Perfil() {
  const { id } = useParams()
  const usuario = useNookStore((s) => s.usuarios.find((u) => u.id === id))
  const publicaciones = useNookStore((s) => s.publicaciones)
  const comentarios = useNookStore((s) => s.comentarios)
  const libros = useNookStore((s) => s.libros)

  if (!usuario) return <main className="contenedor angosto"><p className="vacio">No encontramos ese perfil.</p></main>

  const pubs = publicaciones.filter((p) => p.autorId === usuario.id && p.estado === 'visible').sort((a, b) => b.fecha - a.fecha)
  const stats = [
    { label: 'PUBLICACIONES', valor: pubs.length },
    { label: 'COMENTARIOS', valor: comentarios.filter((c) => c.autorId === usuario.id).length },
    { label: 'LIBROS CARGADOS', valor: libros.filter((l) => l.cargadoPor === usuario.id).length },
  ]

  return (
    <main className="contenedor angosto seccion">
      <div className="perfil">
        <Avatar usuario={usuario} size={96} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <h1 className="h1">{usuario.nombre}</h1>
          <p className="mono">@{usuario.handle} · en Nook desde {usuario.fechaRegistro}</p>
          <p className="perfil__bio">{usuario.bio}</p>
        </div>
      </div>

      <div className="stats">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="stats__valor">{s.valor}</p>
            <p className="mono">{s.label}</p>
          </div>
        ))}
      </div>

      <p className="mono rotulo rotulo--linea" style={{ marginTop: 40 }}>PUBLICACIONES</p>
      {pubs.map((p) => (
        <div key={p.id} className="item-lista">
          <p className="mono">{p.libroId ? 'SOBRE UN LIBRO' : 'DEBATE LIBRE'} · {haceCuanto(p.fecha).toUpperCase()}</p>
          <Link to={`/publicacion/${p.id}`} className="item-lista__titulo">{p.titulo}</Link>
          <p className="item-lista__extracto">{p.cuerpo}</p>
        </div>
      ))}
      {pubs.length === 0 && <p className="vacio">Todavía no publicó nada.</p>}
    </main>
  )
}

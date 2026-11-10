import { Link } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'

// Fila tipo "historias": quién está leyendo qué.
export default function LeyendoAhora() {
  const usuarios = useNookStore((s) => s.usuarios)
  const libros = useNookStore((s) => s.libros)
  const yoId = useNookStore((s) => s.usuarioActualId)

  return (
    <div className="leyendo">
      <p className="mono rotulo">LEYENDO AHORA</p>
      <div className="leyendo__fila">
        {usuarios.map((u) => {
          const libro = libros.find((l) => l.id === u.leyendoId)
          return (
            <Link key={u.id} to={`/perfil/${u.id}`} className="leyendo__item" aria-label={`${u.nombre} está leyendo ${libro?.titulo}`}>
              <span className="leyendo__anillo">
                <span className="leyendo__avatar" style={{ background: u.color }}>{u.iniciales}</span>
                {libro && <span className="leyendo__mini-tapa" style={{ background: libro.color }} aria-hidden="true" />}
              </span>
              <span className="leyendo__nombre">{u.id === yoId ? 'Vos' : u.nombre.split(' ')[0]}</span>
              <span className="leyendo__libro">{libro?.titulo}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'
import Avatar from './Avatar'
import Icono from './Icono'

// La caja de "¿Qué estás leyendo?" estilo Facebook, arriba de todo el feed.
export default function CajaPublicar() {
  const navigate = useNavigate()
  const yo = useNookStore((s) => s.usuarios.find((u) => u.id === s.usuarioActualId))
  const primerNombre = yo.nombre.split(' ')[0]

  return (
    <div className="caja-publicar">
      <div className="caja-publicar__fila">
        <Avatar usuario={yo} size={48} />
        <button type="button" className="caja-publicar__input" onClick={() => navigate('/publicar')}>
          ¿Qué estás leyendo, {primerNombre}?
        </button>
      </div>
      <div className="caja-publicar__atajos">
        <button type="button" className="atajo" onClick={() => navigate(`/publicar?libro=${yo.leyendoId}`)}>
          <Icono nombre="libro" size={18} color="#6E1E2B" /> Reseñar un libro
        </button>
        <button type="button" className="atajo" onClick={() => navigate('/publicar?libro=')}>
          <Icono nombre="debate" size={18} color="#2F4A3A" /> Abrir un debate
        </button>
        <button type="button" className="atajo" onClick={() => navigate('/libros/nuevo')}>
          <Icono nombre="mas" size={18} color="#7E5418" /> Cargar un libro
        </button>
      </div>
    </div>
  )
}

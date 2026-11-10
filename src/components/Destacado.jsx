import { useNavigate } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'
import PortadaLibro from './PortadaLibro'
import Avatar from './Avatar'
import carita from '../assets/nook-carita.png'
import { plural } from '../utils/formato'

// Bloque grande tipo portada de Substack.
// Se elige por cantidad de comentarios: es un conteo, no un algoritmo de recomendación.
export default function Destacado({ publicacion: p }) {
  const navigate = useNavigate()
  const autor = useNookStore((s) => s.usuarios.find((u) => u.id === p.autorId))
  const libro = useNookStore((s) => (p.libroId ? s.libros.find((l) => l.id === p.libroId) : null))
  const nComentarios = useNookStore((s) => s.comentarios.filter((c) => c.publicacionId === p.id).length)
  const abrir = () => navigate(`/publicacion/${p.id}`)

  return (
    <section aria-label="Destacado" className="contenedor destacado-wrap">
      <div className="destacado">
        <div className="destacado__visual">
          {libro ? (
            <>
              <span className="destacado__tapa-atras destacado__tapa-atras--izq" aria-hidden="true" />
              <span className="destacado__tapa-atras destacado__tapa-atras--der" aria-hidden="true" />
              <PortadaLibro libro={libro} size="lg" girada onClick={() => navigate(`/libros/${libro.id}`)} />
            </>
          ) : (
            <img src={carita} alt="" style={{ width: 200 }} />
          )}
        </div>
        <div className="destacado__texto">
          <p className="mono destacado__kicker">DESTACADO · EL HILO MÁS ACTIVO</p>
          <button type="button" className="destacado__titulo" onClick={abrir}>{p.titulo}</button>
          <p className="destacado__extracto">{p.cuerpo}</p>
          <div className="destacado__pie">
            <button type="button" className="boton boton--crema" onClick={abrir}>Leer y sumarme al hilo</button>
            <span className="destacado__autor">
              <Avatar usuario={autor} size={30} anillo />
              {autor.nombre} · {plural(nComentarios, 'comentario', 'comentarios')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

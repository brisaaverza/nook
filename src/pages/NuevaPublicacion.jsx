import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'

export default function NuevaPublicacion() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const libros = useNookStore((s) => s.libros)
  const publicar = useNookStore((s) => s.publicar)

  const [libroId, setLibroId] = useState(params.get('libro') || '')
  const [titulo, setTitulo] = useState('')
  const [cuerpo, setCuerpo] = useState('')
  const [error, setError] = useState('')

  const libroElegido = libros.find((l) => l.id === libroId)
  const opciones = [{ id: '', titulo: 'Debate libre', color: 'transparent' }, ...libros]

  const enviar = async (e) => {
    e.preventDefault()
    try {
      const nueva = await publicar({ libroId: libroId || null, titulo, cuerpo })
      navigate(`/publicacion/${nueva.id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="contenedor angosto seccion">
      <p className="mono">NUEVA PUBLICACIÓN</p>
      <h1 className="h1">¿Sobre qué querés <em>escribir</em>?</h1>

      <form onSubmit={enviar}>
        <fieldset className="fieldset">
          <legend className="label">Libro asociado <span className="suave">(opcional)</span></legend>
          <div className="opciones-libro">
            {opciones.map((o) => (
              <button
                key={o.id || 'debate'}
                type="button"
                aria-pressed={libroId === o.id}
                className={'opcion-libro' + (libroId === o.id ? ' opcion-libro--activa' : '')}
                onClick={() => setLibroId(o.id)}
              >
                <span className="opcion-libro__tapa" style={{ background: o.color }} aria-hidden="true" />
                {o.titulo}
              </button>
            ))}
          </div>
          <p className="ayuda">
            {libroElegido
              ? `Se publica como comentario sobre «${libroElegido.titulo}».`
              : 'Sin libro asociado: se publica como debate abierto.'}{' '}
            <Link to="/libros/nuevo">¿No está el libro? Agregalo</Link>
          </p>
        </fieldset>

        <div className="grupo">
          <label htmlFor="np-titulo" className="label">Título</label>
          <input id="np-titulo" className="campo campo--titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Un título que invite a debatir" />
        </div>
        <div className="grupo">
          <label htmlFor="np-cuerpo" className="label">Texto</label>
          <textarea id="np-cuerpo" rows={8} className="campo campo--serif" value={cuerpo} onChange={(e) => setCuerpo(e.target.value)} placeholder="Contá qué pensás. Si hay spoilers, avisá arriba." />
        </div>
        {error && <p role="alert" className="error">{error}</p>}
        <div className="acciones">
          <Link to="/" className="boton boton--fantasma">Cancelar</Link>
          <button type="submit" className="boton boton--primario">Publicar</button>
        </div>
      </form>
    </main>
  )
}

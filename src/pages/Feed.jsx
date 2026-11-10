import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'
import Destacado from '../components/Destacado'
import CajaPublicar from '../components/CajaPublicar'
import LeyendoAhora from '../components/LeyendoAhora'
import TarjetaPublicacion from '../components/TarjetaPublicacion'
import carita from '../assets/nook-carita.png'
import { plural } from '../utils/formato'

const FILTROS = [
  { id: 'todo', label: 'Todo' },
  { id: 'libros', label: 'Sobre libros' },
  { id: 'debates', label: 'Debates libres' },
]

export default function Feed() {
  const publicaciones = useNookStore((s) => s.publicaciones)
  const comentarios = useNookStore((s) => s.comentarios)
  const libros = useNookStore((s) => s.libros)
  const [filtro, setFiltro] = useState('todo')

  // Orden CRONOLÓGICO simple (más nuevo primero). Sin algoritmo, a propósito.
  const visibles = useMemo(
    () => publicaciones.filter((p) => p.estado === 'visible').sort((a, b) => b.fecha - a.fecha),
    [publicaciones]
  )
  const cuenta = (pid) => comentarios.filter((c) => c.publicacionId === pid).length
  const destacado = useMemo(
    () => [...visibles].sort((a, b) => cuenta(b.id) - cuenta(a.id))[0],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visibles, comentarios]
  )
  const lista = visibles.filter((p) => {
    if (destacado && p.id === destacado.id) return false
    if (filtro === 'libros') return !!p.libroId
    if (filtro === 'debates') return !p.libroId
    return true
  })
  const enDebate = libros
    .map((l) => ({ ...l, n: visibles.filter((p) => p.libroId === l.id).length }))
    .filter((l) => l.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 4)

  return (
    <>
      <h1 className="solo-lectores">Inicio de Nook</h1>
      {destacado && <Destacado publicacion={destacado} />}

      <main className="contenedor dos-columnas">
        <section className="columna-principal">
          <CajaPublicar />
          <LeyendoAhora />

          <div className="seccion-titulo">
            <h2 className="h2">Lo más <em>reciente</em></h2>
            <div role="tablist" aria-label="Filtrar publicaciones" className="pastillas">
              {FILTROS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={filtro === f.id}
                  className={'pastilla' + (filtro === f.id ? ' pastilla--activa' : '')}
                  onClick={() => setFiltro(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {lista.map((p) => <TarjetaPublicacion key={p.id} publicacion={p} />)}
          {lista.length === 0 && <p className="vacio">Todavía no hay publicaciones en esta sección.</p>}
        </section>

        <aside className="columna-lateral">
          <div className="caja-eslogan">
            <img src={carita} alt="" />
            <p className="caja-eslogan__titulo">Menos métricas, <em>más experiencias.</em></p>
            <p>Sin likes que cuenten, sin algoritmo, sin notificaciones. El feed va por fecha y lo importante pasa en los hilos.</p>
          </div>

          <div>
            <p className="mono rotulo rotulo--linea">LIBROS EN DEBATE</p>
            {enDebate.map((l) => (
              <Link key={l.id} to={`/libros/${l.id}`} className="fila-libro">
                <span className="fila-libro__tapa" style={{ background: l.color }} aria-hidden="true" />
                <span>
                  <span className="fila-libro__titulo">{l.titulo}</span>
                  <span className="fila-libro__sub">{l.autor} · {plural(l.n, 'publicación', 'publicaciones')}</span>
                </span>
              </Link>
            ))}
            <Link to="/libros/nuevo" className="boton boton--borde boton--ancho">Agregar un libro a la biblioteca</Link>
          </div>
        </aside>
      </main>
    </>
  )
}

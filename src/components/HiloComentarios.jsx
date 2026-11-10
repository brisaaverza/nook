import { useMemo, useState } from 'react'
import { useNookStore } from '../store/useNookStore'
import { construirArbol, contarComentarios, NIVEL_MAXIMO } from '../utils/arbolComentarios'
import { plural } from '../utils/formato'
import Comentario from './Comentario'
import FormularioComentario from './FormularioComentario'

export default function HiloComentarios({ publicacionId }) {
  const todos = useNookStore((s) => s.comentarios)
  const comentar = useNookStore((s) => s.comentar)
  const [respondiendoA, setRespondiendoA] = useState(null)

  // PASO 1 (cálculo): lista plana -> árbol. useMemo evita recalcularlo en cada
  // render; solo se rehace cuando cambian los comentarios.
  const arbol = useMemo(
    () => construirArbol(todos.filter((c) => c.publicacionId === publicacionId && c.estado === 'visible')),
    [todos, publicacionId]
  )
  const total = contarComentarios(arbol)

  // PASO 2 (render): cada raíz se dibuja con el componente recursivo <Comentario />.
  return (
    <section aria-labelledby="titulo-hilo" className="hilo">
      <div className="hilo__encabezado">
        <h2 id="titulo-hilo" className="h2">
          El hilo <em>· {plural(total, 'comentario', 'comentarios')}</em>
        </h2>
        <span className="mono">HASTA {NIVEL_MAXIMO} NIVELES DE RESPUESTA</span>
      </div>

      <FormularioComentario
        id="comentario-nuevo"
        etiqueta="Sumá tu comentario"
        placeholder="¿Qué te pareció?"
        textoBoton="Comentar"
        onEnviar={(texto) => comentar({ publicacionId, comentarioPadreId: null, cuerpo: texto })}
      />

      <div className="hilo__lista">
        {arbol.map((nodo) => (
          <Comentario key={nodo.id} nodo={nodo} respondiendoA={respondiendoA} setRespondiendoA={setRespondiendoA} />
        ))}
        {total === 0 && <p className="vacio">Nadie comentó todavía. Abrí vos el hilo.</p>}
      </div>
    </section>
  )
}

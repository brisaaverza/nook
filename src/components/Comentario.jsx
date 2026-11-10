import { Link } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'
import { NIVEL_MAXIMO } from '../utils/arbolComentarios'
import { haceCuanto } from '../utils/formato'
import Avatar from './Avatar'
import Icono from './Icono'
import FormularioComentario from './FormularioComentario'

/**
 * Componente RECURSIVO: se dibuja a sí mismo y después dibuja sus hijos
 * llamando otra vez a <Comentario />. Corta solo porque el nivel 3 no tiene hijos.
 *
 * Props:
 *  - nodo: comentario con { hijos: [...], nivel }
 *  - respondiendoA / setRespondiendoA: qué comentario tiene el formulario abierto
 *    (vive en el padre para que haya un solo formulario abierto a la vez)
 */
export default function Comentario({ nodo, respondiendoA, setRespondiendoA }) {
  const autor = useNookStore((s) => s.usuarios.find((u) => u.id === nodo.autorId))
  const comentar = useNookStore((s) => s.comentar)
  const puedeResponder = nodo.nivel < NIVEL_MAXIMO
  const abierto = respondiendoA === nodo.id

  const responder = async (texto) => {
    await comentar({ publicacionId: nodo.publicacionId, comentarioPadreId: nodo.id, cuerpo: texto })
    setRespondiendoA(null)
  }

  return (
    <div className={`comentario comentario--nivel-${nodo.nivel}`}>
      <div className="comentario__caja">
        <div className="meta">
          <Avatar usuario={autor} size={26} />
          <Link to={`/perfil/${autor.id}`} className="meta__nombre">{autor.nombre}</Link>
          <span className="mono">{haceCuanto(nodo.fecha)} · nivel {nodo.nivel}</span>
        </div>
        <p className="comentario__texto">{nodo.cuerpo}</p>

        {puedeResponder ? (
          <button type="button" className="comentario__responder" onClick={() => setRespondiendoA(abierto ? null : nodo.id)}>
            <Icono nombre="responder" size={14} /> Responder
          </button>
        ) : (
          <span className="mono comentario__max">NIVEL MÁXIMO · ESTE COMENTARIO NO ADMITE RESPUESTAS</span>
        )}

        {abierto && (
          <FormularioComentario
            id={`respuesta-${nodo.id}`}
            etiqueta={`Respondiendo a ${autor.nombre}`}
            placeholder="Escribí tu respuesta"
            textoBoton="Responder"
            onEnviar={responder}
            onCancelar={() => setRespondiendoA(null)}
            compacto
          />
        )}
      </div>

      {nodo.hijos.length > 0 && (
        <div className="comentario__hijos">
          {nodo.hijos.map((hijo) => (
            <Comentario key={hijo.id} nodo={hijo} respondiendoA={respondiendoA} setRespondiendoA={setRespondiendoA} />
          ))}
        </div>
      )}
    </div>
  )
}

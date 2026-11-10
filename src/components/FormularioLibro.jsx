import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNookStore } from '../store/useNookStore'
import { buscarPosibleDuplicado } from '../services/libros'
import { COLORES_TAPA } from '../data/mock'
import PortadaLibro from './PortadaLibro'

// Formulario para cargar un libro a mano, con aviso de posible duplicado mientras escribís.
export default function FormularioLibro({ onCreado, onCancelar }) {
  const libros = useNookStore((s) => s.libros)
  const usuarios = useNookStore((s) => s.usuarios)
  const agregarLibro = useNookStore((s) => s.agregarLibro)

  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [anio, setAnio] = useState('')
  const [error, setError] = useState('')

  const duplicado = buscarPosibleDuplicado(titulo, libros)
  const cargadorDup = duplicado && usuarios.find((u) => u.id === duplicado.cargadoPor)
  const vistaPrevia = {
    titulo: titulo.trim() || 'Título del libro',
    autor: autor.trim() || 'Autor/a',
    color: COLORES_TAPA[libros.length % COLORES_TAPA.length],
  }

  const enviar = async (e) => {
    e.preventDefault()
    try {
      const nuevo = await agregarLibro({ titulo, autor, anio })
      onCreado(nuevo)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="form-libro">
      <form onSubmit={enviar} className="form-libro__campos">
        <div className="grupo">
          <label htmlFor="ab-titulo" className="label">Título</label>
          <input id="ab-titulo" className="campo" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej: El túnel" />
        </div>

        {duplicado && (
          <div role="status" className="aviso">
            <p><strong>Ojo:</strong> ya existe «{duplicado.titulo}» de {duplicado.autor}, cargado por @{cargadorDup?.handle}.</p>
            <Link to={`/libros/${duplicado.id}`} className="boton boton--borde boton--chico">Ver ese libro</Link>
          </div>
        )}

        <div className="fila-campos">
          <div className="grupo" style={{ flex: 2 }}>
            <label htmlFor="ab-autor" className="label">Autor/a</label>
            <input id="ab-autor" className="campo" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Ej: Ernesto Sabato" />
          </div>
          <div className="grupo" style={{ flex: 1 }}>
            <label htmlFor="ab-anio" className="label">Año</label>
            <input id="ab-anio" className="campo" inputMode="numeric" value={anio} onChange={(e) => setAnio(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))} placeholder="1948" />
          </div>
        </div>

        {error && <p role="alert" className="error">{error}</p>}
        <div className="acciones">
          <button type="button" className="boton boton--fantasma" onClick={onCancelar}>Cancelar</button>
          <button type="submit" className="boton boton--primario">Agregar a la biblioteca</button>
        </div>
      </form>

      <div className="form-libro__preview">
        <p className="mono">ASÍ SE VA A VER</p>
        <PortadaLibro libro={vistaPrevia} size="lg" />
      </div>
    </div>
  )
}

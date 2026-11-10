import { useState } from 'react'

// Formulario reutilizable: sirve para comentar la publicación y para responder.
export default function FormularioComentario({ id, etiqueta, placeholder, textoBoton, onEnviar, onCancelar, compacto = false }) {
  const [texto, setTexto] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const enviar = async (e) => {
    e.preventDefault()
    setEnviando(true)
    try {
      await onEnviar(texto)
      setTexto('')
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar} className={'form-comentario' + (compacto ? ' form-comentario--compacto' : '')}>
      <label htmlFor={id} className="label">{etiqueta}</label>
      <textarea
        id={id}
        rows={compacto ? 2 : 3}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={placeholder}
        className="campo"
      />
      {error && <p role="alert" className="error">{error}</p>}
      <div className="acciones">
        {onCancelar && (
          <button type="button" className="boton boton--fantasma" onClick={onCancelar}>Cancelar</button>
        )}
        <button type="submit" className="boton boton--primario" disabled={enviando}>{textoBoton}</button>
      </div>
    </form>
  )
}

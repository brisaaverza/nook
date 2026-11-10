// Tapa de libro dibujada con CSS (no hay imágenes de tapas: los libros se cargan a mano).
// size: 'sm' (feed), 'md' (biblioteca), 'lg' (detalle del libro)
export default function PortadaLibro({ libro, size = 'md', onClick, girada = false }) {
  if (!libro) return null
  const clase = `portada portada--${size}` + (girada ? ' portada--girada' : '')
  const contenido = (
    <>
      <span className="portada__lomo" aria-hidden="true" />
      <span className="portada__marco" aria-hidden="true" />
      <span className="portada__titulo">{libro.titulo}</span>
      <span className="portada__autor">{size === 'sm' ? libro.autor.split(' ').pop() : libro.autor}</span>
    </>
  )

  if (onClick) {
    return (
      <button type="button" className={clase} style={{ background: libro.color }} onClick={onClick} aria-label={`Ver el libro ${libro.titulo}`}>
        {contenido}
      </button>
    )
  }
  return (
    <div className={clase} style={{ background: libro.color }} aria-hidden="true">
      {contenido}
    </div>
  )
}

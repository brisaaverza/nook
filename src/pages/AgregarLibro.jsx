import { useNavigate } from 'react-router-dom'
import FormularioLibro from '../components/FormularioLibro'

export default function AgregarLibro() {
  const navigate = useNavigate()
  return (
    <main className="contenedor medio seccion">
      <p className="mono">BIBLIOTECA · CARGA MANUAL</p>
      <h1 className="h1">Sumá un libro a <em>Nook</em></h1>
      <p className="bajada">Cualquier lector puede cargar libros. Antes de guardar, revisamos que no esté repetido.</p>
      <FormularioLibro onCreado={(libro) => navigate(`/libros/${libro.id}`)} onCancelar={() => navigate('/libros')} />
    </main>
  )
}

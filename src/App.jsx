import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Feed from './pages/Feed'
import DetallePublicacion from './pages/DetallePublicacion'
import Libros from './pages/Libros'
import DetalleLibro from './pages/DetalleLibro'
import AgregarLibro from './pages/AgregarLibro'
import Perfil from './pages/Perfil'
import NuevaPublicacion from './pages/NuevaPublicacion'
import ScrollArriba from './components/ScrollArriba'
import Login from './pages/Login'
import { useNookStore } from './store/useNookStore'

export default function App() {
  const sesionIniciada = useNookStore((s) => s.sesionIniciada)
  if (!sesionIniciada) return <Login />

  return (
    <div className="app">
      <ScrollArriba />
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/publicacion/:id" element={<DetallePublicacion />} />
        <Route path="/publicar" element={<NuevaPublicacion />} />
        <Route path="/libros" element={<Libros />} />
        <Route path="/libros/nuevo" element={<AgregarLibro />} />
        <Route path="/libros/:id" element={<DetalleLibro />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route
          path="*"
          element={
            <main className="contenedor angosto seccion">
              <p className="vacio">Esta página no existe. <Link to="/">Volver al inicio</Link></p>
            </main>
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

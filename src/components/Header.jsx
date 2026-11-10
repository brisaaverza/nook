import { Link, NavLink, useNavigate } from 'react-router-dom'
import { salir } from '../services/auth'
import carita from '../assets/nook-carita.png'
import nombre from '../assets/nook-nombre.png'
import Avatar from './Avatar'
import { useNookStore } from '../store/useNookStore'

export default function Header() {
  const yo = useNookStore((s) => s.usuarios.find((u) => u.id === s.usuarioActualId))
  const cerrarSesion = useNookStore((s) => s.cerrarSesion)
  const navigate = useNavigate()
  const cerrar = async () => {
    await salir()
    cerrarSesion()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header__contenido">
        <Link to="/" className="logo" aria-label="Nook, ir al inicio">
          <img src={carita} alt="" className="logo__carita" />
          <img src={nombre} alt="Nook" className="logo__nombre" />
        </Link>

        <nav aria-label="Principal" className="nav">
          <NavLink to="/" end className="nav__link">Inicio</NavLink>
          <NavLink to="/libros" className="nav__link">Biblioteca</NavLink>
          <NavLink to={`/perfil/${yo.id}`} className="nav__link">Mi perfil</NavLink>
        </nav>

        <div className="header__yo">
          <button type="button" className="boton boton--fantasma boton--chico" onClick={cerrar}>Salir</button>
          <Link to={`/perfil/${yo.id}`} aria-label="Mi perfil">
            <Avatar usuario={yo} size={44} />
          </Link>
        </div>
      </div>
    </header>
  )
}

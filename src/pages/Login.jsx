import { useState } from 'react'
import { useNookStore } from '../store/useNookStore'
import { ingresarConMail, ingresarConGoogle, recuperarContrasena } from '../services/auth'
import carita from '../assets/nook-carita.png'
import nombre from '../assets/nook-nombre.png'

export default function Login() {
  const iniciarSesion = useNookStore((s) => s.iniciarSesion)
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [verContrasena, setVerContrasena] = useState(false)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [cargando, setCargando] = useState(false)

  const ejecutar = async (accion) => {
    setError('')
    setAviso('')
    setCargando(true)
    try {
      const id = await accion()
      iniciarSesion(id)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  const olvide = async () => {
    setError('')
    try {
      setAviso(await recuperarContrasena(usuario))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="login">
      <div className="login__tarjeta">
        <div className="login__marca">
          <img src={carita} alt="" className="login__carita" />
          <img src={nombre} alt="Nook" className="login__nombre" />
          <p className="login__eslogan">Menos métricas, <em>más experiencias.</em></p>
        </div>

        <form
          className="login__form"
          onSubmit={(e) => {
            e.preventDefault()
            ejecutar(() => ingresarConMail(usuario, contrasena))
          }}
        >
          <div className="grupo">
            <label htmlFor="login-usuario" className="label">Mail o nombre de usuario</label>
            <div className="campo-icono">
              <span className="campo-icono__arroba" aria-hidden="true">@</span>
              <input
                id="login-usuario"
                className="campo"
                autoComplete="username"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="brisa o brisa@mail.com"
              />
            </div>
          </div>

          <div className="grupo">
            <div className="login__fila-label">
              <label htmlFor="login-contrasena" className="label">Contraseña</label>
              <button type="button" className="link-chico" onClick={olvide}>¿Olvidaste tu contraseña?</button>
            </div>
            <div className="campo-icono">
              <input
                id="login-contrasena"
                className="campo"
                type={verContrasena ? 'text' : 'password'}
                autoComplete="current-password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
              />
              <button type="button" className="campo-icono__ver" onClick={() => setVerContrasena(!verContrasena)}>
                {verContrasena ? 'Ocultar' : 'Ver'}
              </button>
            </div>
          </div>

          {error && <p role="alert" className="error">{error}</p>}
          {aviso && <p role="status" className="aviso-ok">{aviso}</p>}

          <button type="submit" className="boton boton--primario boton--ancho boton--alto" disabled={cargando}>
            {cargando ? 'Entrando…' : 'Ingresar'}
          </button>

          <div className="separador"><span>o</span></div>

          <button
            type="button"
            className="boton boton--google boton--ancho boton--alto"
            disabled={cargando}
            onClick={() => ejecutar(ingresarConGoogle)}
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
            </svg>
            Continuar con Google
          </button>
        </form>

        <p className="login__registro">
          ¿Todavía no tenés cuenta? <button type="button" className="link-chico" onClick={() => setAviso('El registro llega en la próxima versión. Por ahora, entrá con cualquier usuario y contraseña.')}>Crear cuenta</button>
        </p>
      </div>
      <p className="mono login__pie">PROTOTIPO · INGRESO SIMULADO CON DATOS DE PRUEBA</p>
    </main>
  )
}

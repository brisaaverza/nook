export default function Avatar({ usuario, size = 28, anillo = false }) {
  if (!usuario) return null
  return (
    <span
      aria-hidden="true"
      className={'avatar' + (anillo ? ' avatar--anillo' : '')}
      style={{ width: size, height: size, background: usuario.color, fontSize: Math.round(size * 0.38) }}
    >
      {usuario.iniciales}
    </span>
  )
}

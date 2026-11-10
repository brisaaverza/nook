// Íconos de línea simples (SVG), para no depender de una librería.
const trazos = {
  libro: (
    <>
      <path d="M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M19 17H6a2 2 0 0 0-2 2" />
    </>
  ),
  debate: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  comentario: <path d="M4 5h16v11H9l-5 4z" />,
  responder: (
    <>
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h10a6 6 0 0 1 6 6v4" />
    </>
  ),
  mas: <path d="M12 5v14M5 12h14" />,
  atras: <path d="M15 18l-6-6 6-6" />,
}

export default function Icono({ nombre, size = 16, color = 'currentColor' }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {trazos[nombre]}
    </svg>
  )
}

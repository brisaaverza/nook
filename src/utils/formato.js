// Pequeñas utilidades de texto.

export function plural(n, uno, varios, cero) {
  if (n === 0 && cero) return cero
  return `${n} ${n === 1 ? uno : varios}`
}

// "hace 2 h", "ayer", "hace 3 días"...
export function haceCuanto(fecha) {
  const min = Math.round((Date.now() - fecha) / 60000)
  if (min < 1) return 'recién'
  if (min < 60) return `hace ${min} min`
  const h = Math.round(min / 60)
  if (h < 24) return `hace ${h} h`
  const d = Math.round(h / 24)
  if (d === 1) return 'ayer'
  return `hace ${d} días`
}

// Para comparar títulos sin que importen tildes, mayúsculas o signos.
export function normalizar(texto) {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function apellido(autor) {
  const partes = autor.split(' ')
  return partes[partes.length - 1]
}

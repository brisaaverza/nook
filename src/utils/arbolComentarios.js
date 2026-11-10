// ============================================================
//  Comentarios anidados — la pieza técnica central de Nook
// ============================================================
// En la base guardamos cada comentario como un documento PLANO con una
// referencia a su padre (comentarioPadreId). NO guardamos comentarios
// adentro de comentarios. El árbol se reconstruye acá, en el frontend.

export const NIVEL_MAXIMO = 3

/**
 * Convierte la lista plana en un árbol y le calcula el nivel a cada nodo.
 *
 * 1. Recorremos la lista una vez y armamos un "índice" por id
 *    (cada comentario + un array vacío de hijos).
 * 2. Recorremos de nuevo: si el comentario tiene padre, lo metemos en
 *    los hijos del padre; si no tiene, es una raíz (nivel 1).
 * 3. Por último bajamos por el árbol asignando nivel = nivel del padre + 1.
 *
 * Es O(n): cada comentario se visita una cantidad fija de veces.
 */
export function construirArbol(listaPlana) {
  const porId = {}
  listaPlana.forEach((c) => {
    porId[c.id] = { ...c, hijos: [] }
  })

  const raices = []
  listaPlana.forEach((c) => {
    const nodo = porId[c.id]
    const padre = c.comentarioPadreId ? porId[c.comentarioPadreId] : null
    if (padre) padre.hijos.push(nodo)
    else raices.push(nodo) // sin padre (o padre borrado) => primer nivel
  })

  const asignarNivel = (nodos, nivel) => {
    nodos.forEach((n) => {
      n.nivel = nivel
      n.hijos.sort((a, b) => a.fecha - b.fecha)
      asignarNivel(n.hijos, nivel + 1)
    })
  }
  raices.sort((a, b) => a.fecha - b.fecha)
  asignarNivel(raices, 1)
  return raices
}

/**
 * Nivel de un comentario dentro de la lista plana: cuántos padres hay que
 * subir hasta llegar a uno sin padre. Lo usamos para VALIDAR antes de guardar
 * (no alcanza con esconder el botón "Responder" en la interfaz).
 */
export function nivelDe(id, listaPlana) {
  let nivel = 1
  let actual = listaPlana.find((c) => c.id === id)
  while (actual && actual.comentarioPadreId) {
    const padreId = actual.comentarioPadreId
    actual = listaPlana.find((c) => c.id === padreId)
    nivel++
  }
  return nivel
}

export function contarComentarios(arbol) {
  return arbol.reduce((total, n) => total + 1 + contarComentarios(n.hijos), 0)
}

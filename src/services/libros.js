// Funciones que hablan con la colección "libros" de Firestore.
// Decisión del diagnóstico: CUALQUIER usuario puede cargar un libro,
// y antes de guardar revisamos que no esté repetido.
import { collection, addDoc } from 'firebase/firestore'
import { db, firebaseConfigurado } from './firebase'
import { normalizar } from '../utils/formato'
import { COLORES_TAPA } from '../data/mock'

/** Busca un libro con un título igual o muy parecido (sin tildes ni mayúsculas). */
export function buscarPosibleDuplicado(titulo, libros) {
  const t = normalizar(titulo)
  if (t.length < 3) return null
  return (
    libros.find((l) => {
      const otro = normalizar(l.titulo)
      return otro === t || (t.length >= 5 && otro.includes(t))
    }) || null
  )
}

export async function agregarLibro({ titulo, autor, anio, cargadoPor }, librosExistentes) {
  const t = (titulo || '').trim()
  const a = (autor || '').trim()
  if (!t || !a) throw new Error('Completá título y autor/a.')

  const repetido = librosExistentes.find(
    (l) => normalizar(l.titulo) === normalizar(t) && normalizar(l.autor) === normalizar(a)
  )
  if (repetido) throw new Error('Ese libro ya está en Nook. Usá el que existe.')

  const nuevo = {
    titulo: t,
    autor: a,
    anio: anio ? Number(anio) : null,
    cargadoPor,
    color: COLORES_TAPA[librosExistentes.length % COLORES_TAPA.length],
  }

  if (firebaseConfigurado) {
    const ref = await addDoc(collection(db, 'libros'), nuevo)
    return { id: ref.id, ...nuevo }
  }
  return { id: 'l' + Date.now(), ...nuevo }
}

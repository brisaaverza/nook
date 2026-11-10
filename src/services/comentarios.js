// Funciones que hablan con la colección "comentarios" de Firestore.
import { collection, addDoc } from 'firebase/firestore'
import { db, firebaseConfigurado } from './firebase'
import { NIVEL_MAXIMO, nivelDe } from '../utils/arbolComentarios'

/**
 * Crea un comentario. Si comentarioPadreId viene vacío es de primer nivel;
 * si no, es una respuesta. Validamos acá que no se pase del nivel máximo,
 * aunque la interfaz ya esconda el botón "Responder" en el nivel 3.
 */
export async function comentar({ publicacionId, comentarioPadreId, autorId, cuerpo }, comentariosDeLaPublicacion) {
  const texto = (cuerpo || '').trim()
  if (!texto) throw new Error('El comentario está vacío.')

  if (comentarioPadreId) {
    const nivelPadre = nivelDe(comentarioPadreId, comentariosDeLaPublicacion)
    if (nivelPadre >= NIVEL_MAXIMO) {
      throw new Error(`Este hilo llegó al nivel máximo (${NIVEL_MAXIMO}).`)
    }
  }

  const nuevo = {
    publicacionId,
    comentarioPadreId: comentarioPadreId || null,
    autorId,
    cuerpo: texto,
    fecha: Date.now(),
    estado: 'visible',
  }

  if (firebaseConfigurado) {
    const ref = await addDoc(collection(db, 'comentarios'), nuevo)
    return { id: ref.id, ...nuevo }
  }
  return { id: 'c' + Date.now(), ...nuevo }
}

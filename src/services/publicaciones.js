// Funciones que hablan con la colección "publicaciones" de Firestore.
import { collection, addDoc } from 'firebase/firestore'
import { db, firebaseConfigurado } from './firebase'

/**
 * Crea una publicación. Un solo modelo cubre los dos casos:
 *  - libroId con valor  => publicación sobre un libro
 *  - libroId = null     => debate abierto
 * Devuelve el documento creado o lanza un Error con el motivo.
 */
export async function crearPublicacion({ autorId, libroId, titulo, cuerpo }) {
  const t = (titulo || '').trim()
  const c = (cuerpo || '').trim()
  if (!t) throw new Error('La publicación necesita un título.')
  if (!c) throw new Error('Escribí el texto de la publicación.')

  const nueva = {
    autorId,
    libroId: libroId || null,
    titulo: t,
    cuerpo: c,
    fecha: Date.now(),
    estado: 'visible', // pensado para moderación futura (visible / oculto)
  }

  if (firebaseConfigurado) {
    const ref = await addDoc(collection(db, 'publicaciones'), nueva)
    return { id: ref.id, ...nueva }
  }
  return { id: 'p' + Date.now(), ...nueva } // modo mock
}

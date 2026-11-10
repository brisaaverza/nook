// Estado global con Zustand: los datos cargados y el usuario logueado.
// Las páginas leen de acá; las acciones llaman a /services y guardan el resultado.
import { create } from 'zustand'
import * as mock from '../data/mock'
import { crearPublicacion } from '../services/publicaciones'
import { comentar } from '../services/comentarios'
import { agregarLibro } from '../services/libros'

export const useNookStore = create((set, get) => ({
  sesionIniciada: false,
  usuarioActualId: mock.USUARIO_ACTUAL_ID,
  iniciarSesion: (id) => set({ sesionIniciada: true, usuarioActualId: id }),
  cerrarSesion: () => set({ sesionIniciada: false }),
  usuarios: mock.usuarios,
  libros: mock.libros,
  publicaciones: mock.publicaciones,
  comentarios: mock.comentarios,

  // ---- Lecturas cómodas ----
  usuario: (id) => get().usuarios.find((u) => u.id === id),
  libro: (id) => get().libros.find((l) => l.id === id),

  // ---- Acciones ----
  publicar: async (datos) => {
    const nueva = await crearPublicacion({ ...datos, autorId: get().usuarioActualId })
    set((s) => ({ publicaciones: [nueva, ...s.publicaciones] }))
    return nueva
  },

  comentar: async ({ publicacionId, comentarioPadreId, cuerpo }) => {
    const deEsta = get().comentarios.filter((c) => c.publicacionId === publicacionId)
    const nuevo = await comentar(
      { publicacionId, comentarioPadreId, cuerpo, autorId: get().usuarioActualId },
      deEsta
    )
    set((s) => ({ comentarios: [...s.comentarios, nuevo] }))
    return nuevo
  },

  agregarLibro: async (datos) => {
    const nuevo = await agregarLibro({ ...datos, cargadoPor: get().usuarioActualId }, get().libros)
    set((s) => ({ libros: [...s.libros, nuevo] }))
    return nuevo
  },
}))

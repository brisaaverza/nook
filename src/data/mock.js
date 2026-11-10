// Datos de prueba (mock). Tienen la MISMA forma que tendrán los documentos en Firestore:
// colecciones usuarios, libros, publicaciones y comentarios.

export const USUARIO_ACTUAL_ID = 'u0'

export const usuarios = [
  { id: 'u0', nombre: 'Brisa', handle: 'brisa', iniciales: 'BR', color: '#6E1E2B', bio: 'Leo de noche y subrayo en lápiz.', fechaRegistro: '2026', leyendoId: 'l1' },
  { id: 'u1', nombre: 'Martina Sosa', handle: 'martina', iniciales: 'MS', color: '#2F4A3A', bio: 'Borges, Cortázar y café frío.', fechaRegistro: '2025', leyendoId: 'l3' },
  { id: 'u2', nombre: 'Jonathan Ruiz', handle: 'jonathan', iniciales: 'JR', color: '#22344F', bio: 'Novelas cortas y ciencia ficción rioplatense.', fechaRegistro: '2025', leyendoId: 'l2' },
  { id: 'u3', nombre: 'Valeria Paz', handle: 'valeria', iniciales: 'VP', color: '#7E5418', bio: 'Club de lectura los jueves. Siempre llego con el libro a medias.', fechaRegistro: '2026', leyendoId: 'l4' },
  { id: 'u4', nombre: 'Tomás Ibarra', handle: 'tomi', iniciales: 'TI', color: '#2A1E1A', bio: 'Releo más de lo que leo.', fechaRegistro: '2026', leyendoId: 'l5' },
]

export const libros = [
  { id: 'l1', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, cargadoPor: 'u1', color: '#6E1E2B' },
  { id: 'l2', titulo: 'Rayuela', autor: 'Julio Cortázar', anio: 1963, cargadoPor: 'u2', color: '#22344F' },
  { id: 'l3', titulo: 'Ficciones', autor: 'Jorge Luis Borges', anio: 1944, cargadoPor: 'u1', color: '#2F4A3A' },
  { id: 'l4', titulo: 'Pedro Páramo', autor: 'Juan Rulfo', anio: 1955, cargadoPor: 'u3', color: '#7E5418' },
  { id: 'l5', titulo: 'La invención de Morel', autor: 'Adolfo Bioy Casares', anio: 1940, cargadoPor: 'u4', color: '#2A1E1A' },
  { id: 'l6', titulo: 'Las cosas que perdimos en el fuego', autor: 'Mariana Enriquez', anio: 2016, cargadoPor: 'u3', color: '#8E3B26' },
]

// libroId: null  => debate abierto.  libroId con valor => publicación sobre ese libro.
// fecha: milisegundos (como un Timestamp de Firestore). Se arma relativa a "ahora".
const hace = (minutos) => Date.now() - minutos * 60 * 1000

export const publicaciones = [
  { id: 'p1', autorId: 'u1', libroId: 'l1', fecha: hace(120), estado: 'visible', titulo: 'El final se siente apurado (y creo que es a propósito)', cuerpo: 'Después de casi cuatrocientas páginas de calma, las últimas veinte pasan volando. En la primera lectura me molestó. En la segunda me pareció que el libro se acelera igual que el tiempo de Macondo, hasta que no queda nada.\n\n¿Les pasó lo mismo? ¿Es un defecto o una decisión?' },
  { id: 'p2', autorId: 'u3', libroId: null, fecha: hace(240), estado: 'visible', titulo: '¿Se puede abandonar un libro a la mitad sin culpa?', cuerpo: 'En el club siempre hay alguien que dice que hay que terminar todo lo que se empieza. Yo tengo una pila de libros a medias y no me arrepiento de ninguno. ¿Dónde está el límite para ustedes?' },
  { id: 'p3', autorId: 'u2', libroId: 'l2', fecha: hace(1300), estado: 'visible', titulo: 'Leí Rayuela siguiendo el tablero y cambió todo', cuerpo: 'La primera vez la leí de corrido y me pareció una novela de París con un final raro. Ahora la hice saltando capítulos como propone Cortázar y los capítulos prescindibles terminan siendo los más importantes.' },
  { id: 'p4', autorId: 'u4', libroId: 'l5', fecha: hace(2900), estado: 'visible', titulo: 'La invención de Morel en una sola tarde', cuerpo: 'Son menos de cien páginas y no hay una sola que sobre. Lo que más me impresiona es cómo un libro de 1940 anticipa tanto de lo que hoy hacemos con las pantallas.' },
  { id: 'p5', autorId: 'u0', libroId: null, fecha: hace(4300), estado: 'visible', titulo: '¿Papel o e-reader? Abro el debate', cuerpo: 'Me regalaron un e-reader y no sé si me convence. Leo más rápido, pero me acuerdo menos de lo que leo. ¿Alguien más lo siente así?' },
  { id: 'p6', autorId: 'u3', libroId: 'l6', fecha: hace(7200), estado: 'visible', titulo: 'Enriquez y el terror que sale del barrio', cuerpo: 'Lo que da miedo en estos cuentos no son los fantasmas, son las calles que reconocés. Lo leí en el colectivo y tuve que cerrarlo dos veces.' },
]

// Lista PLANA de comentarios. comentarioPadreId: null => comentario de primer nivel.
export const comentarios = [
  { id: 'c1', publicacionId: 'p1', comentarioPadreId: null, autorId: 'u2', fecha: hace(60), estado: 'visible', cuerpo: 'Coincido en que se acelera, pero lo leo como forma: el ritmo del final imita el viento que se lleva a Macondo.' },
  { id: 'c2', publicacionId: 'p1', comentarioPadreId: 'c1', autorId: 'u1', fecha: hace(50), estado: 'visible', cuerpo: 'Puede ser. En la primera lectura no lo sentí así, lo entendí recién al releer.' },
  { id: 'c3', publicacionId: 'p1', comentarioPadreId: 'c2', autorId: 'u3', fecha: hace(40), estado: 'visible', cuerpo: 'Eso pasa mucho con este libro: la segunda lectura es casi otra novela.' },
  { id: 'c4', publicacionId: 'p1', comentarioPadreId: 'c1', autorId: 'u4', fecha: hace(30), estado: 'visible', cuerpo: '¿Y el árbol genealógico del principio? Sin eso no llego al final.' },
  { id: 'c5', publicacionId: 'p1', comentarioPadreId: null, autorId: 'u0', fecha: hace(10), estado: 'visible', cuerpo: 'Yo lo dejé en la página 200. ¿Vale la pena retomarlo?' },
  { id: 'c6', publicacionId: 'p2', comentarioPadreId: null, autorId: 'u1', fecha: hace(180), estado: 'visible', cuerpo: 'Sin culpa. Abandonar también es una forma de leer: sabés qué no es para vos.' },
  { id: 'c7', publicacionId: 'p2', comentarioPadreId: 'c6', autorId: 'u2', fecha: hace(120), estado: 'visible', cuerpo: 'Yo les doy cincuenta páginas. Si no me agarró, lo dejo.' },
  { id: 'c8', publicacionId: 'p3', comentarioPadreId: null, autorId: 'u4', fecha: hace(1200), estado: 'visible', cuerpo: 'Me tentaste. ¿Arrancaste por el capítulo 73?' },
  { id: 'c9', publicacionId: 'p5', comentarioPadreId: null, autorId: 'u3', fecha: hace(4200), estado: 'visible', cuerpo: 'Papel para lo que quiero subrayar, e-reader para el colectivo.' },
]

export const COLORES_TAPA = ['#22344F', '#2F4A3A', '#8E3B26', '#7E5418', '#6E1E2B', '#2A1E1A']

# Nook — *menos métricas, más experiencias*

Red social / foro de libros. Proyecto 05 de **Desarrollo de Software** (2° año, Tecnicatura).
Un Goodreads renovado con estética editorial tipo Substack: publicaciones sobre un libro,
debates abiertos y comentarios anidados en hilo.

---

## Cómo abrirlo en tu compu

Necesitás tener instalado **Node.js** (versión 18 o más nueva): https://nodejs.org

1. Descomprimí la carpeta `nook` donde quieras (por ejemplo en Documentos).
2. Abrí la carpeta en **Visual Studio Code** (Archivo › Abrir carpeta).
3. Abrí la terminal de VS Code (Terminal › Nueva terminal) y escribí:

   ```bash
   npm install
   ```

   (Se hace una sola vez. Descarga las librerías; tarda un par de minutos.)

4. Después, cada vez que quieras usarlo:

   ```bash
   npm run dev
   ```

5. Abrí en el navegador la dirección que aparece (normalmente http://localhost:5173).

**Para entrar:** escribí cualquier usuario y una contraseña de 4 caracteres o más,
o tocá "Continuar con Google". El ingreso está simulado y entrás como Brisa.

> Los datos son de prueba: lo que publiques o comentes se ve al instante,
> pero si recargás la página vuelve al estado inicial. Para que se guarde de verdad
> hay que conectar Firebase (ver más abajo).

---

## Qué se puede hacer

| Funcionalidad | Estado |
|---|---|
| Iniciar sesión (usuario/mail + contraseña, Google, olvidé mi contraseña) | Simulado; listo para Firebase Auth |
| Feed cronológico con filtros (todo / sobre libros / debates) | Funciona |
| Publicar sobre un libro **o** abrir un debate libre | Funciona |
| Comentar y responder en hilo, **hasta 3 niveles** | Funciona |
| Cargar un libro a mano, con aviso de duplicados | Funciona |
| Biblioteca, detalle de libro y perfil de usuario | Funciona |
| Likes, seguir usuarios | Después del MVP |
| Feed con algoritmo, notificaciones en tiempo real, mensajes privados | **Fuera de alcance a propósito** |

---

## Estructura de carpetas

```
src/
├── components/   piezas reutilizables (tarjeta de publicación, comentario recursivo,
│                 tapa de libro, caja para publicar, formulario de libro...)
├── pages/        Login, Feed, DetallePublicacion, NuevaPublicacion, Libros,
│                 DetalleLibro, AgregarLibro, Perfil
├── services/     funciones que hablan con Firebase (publicaciones, comentarios,
│                 libros, auth). Sin Firebase configurado, trabajan con datos mock.
├── store/        estado global con Zustand (usuario logueado + datos)
├── utils/        arbolComentarios.js (¡la pieza central!) y formato de textos
├── data/         datos de prueba con la misma forma que los documentos de Firestore
└── assets/       logo de Nook
```

---

## Modelo de datos (colecciones de Firestore)

| Entidad | Campos clave | Por qué |
|---|---|---|
| **usuarios** | nombre, handle, fechaRegistro | quién publica y comenta |
| **libros** | titulo, autor, anio, cargadoPor | base propia, cargada a mano por cualquier usuario |
| **publicaciones** | autorId, **libroId (opcional)**, titulo, cuerpo, fecha, estado | un solo modelo: `libroId` vacío = debate abierto |
| **comentarios** | publicacionId, **comentarioPadreId (opcional)**, autorId, cuerpo, fecha, estado | `comentarioPadreId` nulo = primer nivel |

El campo `estado` (visible/oculto) queda pensado para moderación futura.

### ¿Por qué `comentarioPadreId` y no comentarios adentro de comentarios?

Cada comentario se guarda **plano**, con una referencia a su padre. Así es fácil
consultarlos todos de una publicación, agregar uno nuevo o validar la profundidad,
sin reescribir un documento gigante. El árbol se reconstruye en el frontend:

1. `construirArbol()` (en `src/utils/arbolComentarios.js`) arma un índice por id,
   cuelga cada comentario de su padre y le asigna el nivel.
2. `<HiloComentarios>` hace ese cálculo una vez con `useMemo` (no en cada render).
3. `<Comentario>` es **recursivo**: se dibuja y después dibuja a sus hijos con
   `<Comentario>`. En el nivel 3 no aparece "Responder".
4. `comentar()` (en `services/comentarios.js`) **valida** igual el límite de nivel
   antes de guardar, por si alguien saltea la interfaz.

---

## Conectar Firebase (cuando quieras que se guarde de verdad)

1. Creá un proyecto en https://console.firebase.google.com y agregá una app Web.
2. Activá **Firestore Database** y, en **Authentication**, los métodos
   *Correo/contraseña* y *Google*.
3. Copiá el archivo `.env.example` como `.env` y pegá los datos de tu app.
4. Reiniciá `npm run dev`. Los services detectan la configuración y empiezan a usar
   Firebase (`addDoc`, `signInWithEmailAndPassword`, `signInWithPopup`...).

Falta conectar las *lecturas* a Firestore (hoy el store arranca con los datos mock):
es el siguiente paso, con `getDocs`/`onSnapshot` en el store.

// Inicio de sesión. Con Firebase configurado usa Firebase Auth de verdad;
// sin configurar, SIMULA el ingreso (cualquier usuario + contraseña entra como Brisa).
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { auth, firebaseConfigurado } from './firebase'
import { USUARIO_ACTUAL_ID } from '../data/mock'

const esperar = (ms) => new Promise((r) => setTimeout(r, ms))

export async function ingresarConMail(usuarioOMail, contrasena) {
  const u = (usuarioOMail || '').trim()
  if (!u) throw new Error('Escribí tu mail o nombre de usuario.')
  if (!contrasena) throw new Error('Escribí tu contraseña.')

  if (firebaseConfigurado) {
    // Firebase Auth entra con mail. (Entrar por nombre de usuario requiere buscar
    // primero el mail de ese usuario en la colección "usuarios".)
    const cred = await signInWithEmailAndPassword(auth, u, contrasena)
    return cred.user.uid
  }
  if (contrasena.length < 4) throw new Error('La contraseña es muy corta (mínimo 4 caracteres).')
  await esperar(400)
  return USUARIO_ACTUAL_ID
}

export async function ingresarConGoogle() {
  if (firebaseConfigurado) {
    const cred = await signInWithPopup(auth, new GoogleAuthProvider())
    return cred.user.uid
  }
  await esperar(400)
  return USUARIO_ACTUAL_ID
}

export async function recuperarContrasena(mail) {
  const m = (mail || '').trim()
  if (!m.includes('@')) throw new Error('Escribí tu mail arriba y te mandamos un enlace.')
  if (firebaseConfigurado) await sendPasswordResetEmail(auth, m)
  else await esperar(300)
  return `Te mandamos un enlace a ${m} para crear una contraseña nueva.`
}

export async function salir() {
  if (firebaseConfigurado) await signOut(auth)
}

import carita from '../assets/nook-carita.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__contenido">
        <span className="footer__marca">
          <img src={carita} alt="" />
          NOOK · MENOS MÉTRICAS, MÁS EXPERIENCIAS
        </span>
        <span>PROTOTIPO MVP · DESARROLLO DE SOFTWARE</span>
      </div>
    </footer>
  )
}

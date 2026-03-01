import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PreguntasFrecuentes.css";
import Header from "../../components/Header";

export default function PreguntasFrecuentes() {
  const navigate = useNavigate();

  const faqsUsuarios = [
    
  { q: "¿Cómo compro entradas?", a: "Desde la sección Entradas puedes seleccionar el abono y completar la compra." },
  { q: "¿Puedo devolver mi entrada?", a: "Consulta las condiciones en Política y Privacidad." },
  { q: "¿Hay restricciones de edad?", a: "Depende de la normativa del evento. Revisa la sección Info." },
  { q: "¿Qué puedo llevar al festival?", a: "Consulta la lista de objetos permitidos en Preguntas Frecuentes." },
  { q: "¿Dónde se celebra y cómo llego?", a: "La ubicación y accesos están en la sección Info/Mapa." },
  { q: "¿Qué pasa si llueve?", a: "El festival se celebra salvo condiciones extremas. Sigue comunicaciones oficiales." },
{
      q: "¿Puedo devolver mi entrada?",
      a: "Las entradas pueden cancelarse según las condiciones indicadas en Política y Privacidad."
    }
  ];

  const faqsProveedores = [
 { q: "¿Cómo me registro como proveedor?", a: "En Registro elige Proveedor y añade la descripción del servicio." },
  { q: "¿Cómo solicito un espacio?", a: "Desde Proveedores podrás iniciar el proceso de solicitud." },
  { q: "¿Qué tipos de proveedor se aceptan?", a: "Foodtruck, merchandising, servicios técnicos, etc." },
  { q: "¿Cómo se valida mi solicitud?", a: "El equipo revisa tu propuesta y contacta contigo." },
  { q: "¿Hay cuota o comisión?", a: "Depende del tipo de servicio. Se especifica en las condiciones de proveedores." },
  { q: "¿Qué documentación necesito?", a: "Licencias, seguro, certificados sanitarios (si aplica) y datos fiscales." },
  ];

  // Para abrir/cerrar cada FAQ
  const [openKey, setOpenKey] = useState(null);
  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  return (
    <div className="faq-page">
      {/* Header simple (podéis sustituirlo por vuestro Navbar común si lo tenéis) */}
      <Header />
      <main className="faq-content">
        <h1 className="faq-title">Preguntas Frecuentes</h1>

        <section className="faq-section">
          <h2 className="faq-subtitle">Usuarios</h2>

          {faqsUsuarios.map((item, idx) => {
            const key = `u-${idx}`;
            const isOpen = openKey === key;

            return (
              <div className="faq-card" key={key} onClick={() => toggle(key)}>
                <div className="faq-q">
                  <strong>{item.q}</strong>
                  <span className="faq-arrow">{isOpen ? "▴" : "▾"}</span>
                </div>
                {isOpen && <p className="faq-a">{item.a}</p>}
              </div>
            );
          })}
        </section>

        <hr className="faq-divider" />

        <section className="faq-section">
          <h2 className="faq-subtitle">Proveedores</h2>

          {faqsProveedores.map((item, idx) => {
            const key = `p-${idx}`;
            const isOpen = openKey === key;

            return (
              <div className="faq-card" key={key} onClick={() => toggle(key)}>
                <div className="faq-q">
                  <strong>{item.q}</strong>
                  <span className="faq-arrow">{isOpen ? "▴" : "▾"}</span>
                </div>
                {isOpen && <p className="faq-a">{item.a}</p>}
              </div>
            );
          })}
        </section>
      </main>

       <footer className="footer">
                <div className="footer-left">
                    <a href="#ig" className="circle-icon">IG</a>
                    <a href="#tw" className="circle-icon">TW</a>
                    <a href="#fb" className="circle-icon">FB</a>
                </div>

                <div className="footer-center">
                    <a href="#proveedores" className="proveedores-link" onClick={(e) => {
                        e.preventDefault();
                        navigate('/proveedores');
                    }}>
                        ¿Quieres ser proveedor?
                    </a>
                </div>

                <div className="footer-right">
                    <div className="spotify-placeholder">
                        Música, API SPOTIFY
                    </div>
                </div>
            </footer>
    </div>
  );
}
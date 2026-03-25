import React, { useState, useEffect } from "react";
import "./PreguntasFrecuentes.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getFaqsUsuarios, getFaqsProveedores } from "../../services/api";

export default function PreguntasFrecuentes() {

  const [faqsUsuarios, setFaqsUsuarios] = useState([]);
  const [faqsProveedores, setFaqsProveedores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openKey, setOpenKey] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const [usuariosData, proveedoresData] = await Promise.all([
          getFaqsUsuarios(),
          getFaqsProveedores()
        ]);
        setFaqsUsuarios(Array.isArray(usuariosData) ? usuariosData : []);
        setFaqsProveedores(Array.isArray(proveedoresData) ? proveedoresData : []);
      } catch (err) {
        console.error("Error al cargar FAQs:", err);
        setError("Error al cargar las preguntas frecuentes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  return (
    <div className="faq-page">

      <Header />

      <main className="faq-content">
        <h1 className="faq-title">Preguntas Frecuentes</h1>

        <section className="faq-section">
          <h2 className="faq-subtitle">Usuarios</h2>

          {isLoading ? (
            <p className="loading-text" style={{ textAlign: 'center', color: '#ccc' }}>Cargando preguntas frecuentes...</p>
          ) : error ? (
            <p className="error-text" style={{ textAlign: 'center', color: '#ff4d4d' }}>{error}</p>
          ) : faqsUsuarios.map((item, idx) => {
            const key = `u-${idx}`;
            const isOpen = openKey === key;

            return (
              <div className="faq-card" key={key} onClick={() => toggle(key)}>
                <div className="faq-q">
                  <strong>{item.pregunta || item.q}</strong>
                  <span className="faq-arrow">{isOpen ? "▴" : "▾"}</span>
                </div>
                {isOpen && <p className="faq-a">{item.respuesta || item.a}</p>}
              </div>
            );
          })}
        </section>

        <hr className="faq-divider" />

        <section className="faq-section">
          <h2 className="faq-subtitle">Proveedores</h2>

          {isLoading ? (
            <p className="loading-text" style={{ textAlign: 'center', color: '#ccc' }}>Cargando preguntas frecuentes...</p>
          ) : error ? (
            <p className="error-text" style={{ textAlign: 'center', color: '#ff4d4d' }}>{error}</p>
          ) : faqsProveedores.map((item, idx) => {
            const key = `p-${idx}`;
            const isOpen = openKey === key;

            return (
              <div className="faq-card" key={key} onClick={() => toggle(key)}>
                <div className="faq-q">
                  <strong>{item.pregunta || item.q}</strong>
                  <span className="faq-arrow">{isOpen ? "▴" : "▾"}</span>
                </div>
                {isOpen && <p className="faq-a">{item.respuesta || item.a}</p>}
              </div>
            );
          })}
        </section>

      </main>

      <Footer />

    </div>
  );
}
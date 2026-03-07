import React, { useState, useEffect } from "react";
import "./PreguntasFrecuentes.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getFaqsUsuarios, getFaqsProveedores } from "../../services/api";

export default function PreguntasFrecuentes() {

  const [faqsUsuarios, setFaqsUsuarios] = useState([]);
  const [faqsProveedores, setFaqsProveedores] = useState([]);

  const [openKey, setOpenKey] = useState(null);

  useEffect(() => {
    getFaqsUsuarios().then(data => setFaqsUsuarios(data));
    getFaqsProveedores().then(data => setFaqsProveedores(data));
  }, []);

  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  return (
    <div className="faq-page">

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

      <Footer />

    </div>
  );
}
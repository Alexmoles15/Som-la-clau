import React, { useState } from "react";
import fondoLlaves from "../assets/fondo-llaves.png";
import pattern from "../styles/patternPage.module.css";
import css from "../styles/Contacto.module.css";
import { useLanguage } from "../i18n/LanguageContext";

function Contacto() {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    provincia: "",
    localidad: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (enviado) {
      setEnviado(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(t.contacto.mailSubject);
    const body = encodeURIComponent(
      `${t.contacto.nombre}: ${form.nombre}
${t.contacto.email}: ${form.email}
${t.contacto.telefono}: ${form.telefono}
${t.contacto.provincia}: ${form.provincia}
${t.contacto.localidad}: ${form.localidad}

${t.contacto.mensajeLabel}:
${form.mensaje}`
    );

    setEnviado(true);
    window.location.href = `mailto:serrallerssomlaclau@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className={pattern.page}>
      <div
        className={pattern.pattern}
        style={{ backgroundImage: `url(${fondoLlaves})` }}
      />
      <div className={pattern.softLayer} />
      <div className={pattern.content}>
        <div className={css.container}>
          <section className={css.hero}>
            <div className={css.heroBadge}>{t.contacto.heroBadge}</div>
            <h1 className={css.title}>{t.contacto.heroTitle}</h1>
            <p className={css.heroText}>{t.contacto.heroText}</p>
          </section>

          <div className={css.layout}>
            <div className={css.leftColumn}>
              <div className={css.urgentBox}>
                <div className={css.urgentTopLine}>
                  {t.contacto.urgentTopLine}
                </div>
                <h2 className={css.urgentTitle}>{t.contacto.urgentTitle}</h2>
                <p className={css.urgentText}>{t.contacto.urgentText}</p>

                <a href="tel:667572011" className={css.phone}>
                  📞 667 572 011
                </a>

                <div className={css.urgentNote}>{t.contacto.urgentNote}</div>
              </div>

              <div className={css.formBox}>
                <div className={css.formHeader}>
                  <span className={css.formBadge}>{t.contacto.formBadge}</span>
                  <h2 className={css.formTitle}>{t.contacto.formTitle}</h2>
                  <p className={css.formSubtitle}>{t.contacto.formSubtitle}</p>
                </div>

                {enviado && (
                  <div className={css.successBox}>{t.contacto.successBox}</div>
                )}

                <form className={css.form} onSubmit={handleSubmit}>
                  <div className={css.row}>
                    <div className={css.field}>
                      <label className={css.label}>{t.contacto.nombre}</label>
                      <input
                        type="text"
                        name="nombre"
                        placeholder={t.contacto.placeholders.nombre}
                        className={css.input}
                        value={form.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={css.field}>
                      <label className={css.label}>{t.contacto.email}</label>
                      <input
                        type="email"
                        name="email"
                        placeholder={t.contacto.placeholders.email}
                        className={css.input}
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={css.row}>
                    <div className={css.field}>
                      <label className={css.label}>{t.contacto.telefono}</label>
                      <input
                        type="text"
                        name="telefono"
                        placeholder={t.contacto.placeholders.telefono}
                        className={css.input}
                        value={form.telefono}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={css.field}>
                      <label className={css.label}>{t.contacto.provincia}</label>
                      <input
                        type="text"
                        name="provincia"
                        placeholder={t.contacto.placeholders.provincia}
                        className={css.input}
                        value={form.provincia}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={css.rowSingle}>
                    <div className={css.field}>
                      <label className={css.label}>{t.contacto.localidad}</label>
                      <input
                        type="text"
                        name="localidad"
                        placeholder={t.contacto.placeholders.localidad}
                        className={css.input}
                        value={form.localidad}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={css.rowSingle}>
                    <div className={css.field}>
                      <label className={css.label}>
                        {t.contacto.mensajeLabel}
                      </label>
                      <textarea
                        name="mensaje"
                        placeholder={t.contacto.placeholders.mensaje}
                        className={css.textarea}
                        value={form.mensaje}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className={css.button}>
                    {t.contacto.enviar}
                  </button>
                </form>
              </div>
            </div>

            <div>
              <div className={css.infoBox}>
                <h2 className={css.infoTitle}>{t.contacto.infoTitle}</h2>

                <div className={css.infoItem}>
                  <div className={css.iconWrap}>
                    <span className={css.icon}>📍</span>
                  </div>
                  <div>
                    <div className={css.infoLabel}>{t.contacto.direccion}</div>
                    <div className={css.infoText}>
                      {t.contacto.addressValue}
                    </div>
                  </div>
                </div>

                <div className={css.infoItem}>
                  <div className={css.iconWrap}>
                    <span className={css.icon}>📞</span>
                  </div>
                  <div>
                    <div className={css.infoLabel}>{t.contacto.telefono}</div>
                    <a href="tel:667572011" className={css.infoLink}>
                      667 572 011
                    </a>
                  </div>
                </div>

                <div className={css.infoItem}>
                  <div className={css.iconWrap}>
                    <span className={css.icon}>✉️</span>
                  </div>
                  <div>
                    <div className={css.infoLabel}>{t.contacto.emailLabel}</div>
                    <a
                      href="mailto:serrallerssomlaclau@gmail.com"
                      className={css.infoLink}
                    >
                      serrallerssomlaclau@gmail.com
                    </a>
                  </div>
                </div>

                <div className={css.infoItem}>
                  <div className={css.iconWrap}>
                    <span className={css.icon}>🕒</span>
                  </div>
                  <div>
                    <div className={css.infoLabel}>{t.contacto.horario}</div>
                    <div className={css.infoText}>
                      {t.contacto.schedule.weekdays}
                      <br />
                      {t.contacto.schedule.weekdaysHours}
                      <br />
                      {t.contacto.schedule.saturday}
                    </div>
                  </div>
                </div>

                <div className={css.noteBox}>{t.contacto.noteBox}</div>

                <div className={css.sideCta}>
                  <a href="tel:667572011" className={css.sideCtaButton}>
                    {t.contacto.callNow}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contacto;
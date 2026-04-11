import React, { useState } from "react";
import fondoLlaves from "../assets/fondo-llaves.png";
import pattern from "../styles/patternPage.module.css";
import css from "../styles/Contacto.module.css";

function Contacto() {
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

    const subject = encodeURIComponent("Consulta desde la web");
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}
Email: ${form.email}
Teléfono: ${form.telefono}
Provincia: ${form.provincia}
Localidad: ${form.localidad}

Mensaje:
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
            <div className={css.heroBadge}>Contacto directo</div>
            <h1 className={css.title}>Estamos aquí para ayudarte</h1>
            <p className={css.heroText}>
              Si necesitas una intervención urgente, llámanos directamente. Si tu
              consulta no es urgente, puedes enviarnos un mensaje con los detalles
              y te responderemos lo antes posible.
            </p>
          </section>

          <div className={css.layout}>
            <div className={css.leftColumn}>
              <div className={css.urgentBox}>
                <div className={css.urgentTopLine}>Atención inmediata</div>
                <h2 className={css.urgentTitle}>¿Servicio urgente?</h2>
                <p className={css.urgentText}>
                  Para aperturas, problemas de acceso o incidencias que no pueden
                  esperar, te recomendamos llamar directamente.
                </p>

                <a href="tel:667572011" className={css.phone}>
                  📞 667 572 011
                </a>

                <div className={css.urgentNote}>
                  La llamada directa es la forma más rápida de atender una urgencia.
                </div>
              </div>

              <div className={css.formBox}>
                <div className={css.formHeader}>
                  <span className={css.formBadge}>Consulta online</span>
                  <h2 className={css.formTitle}>¿No es urgente?</h2>
                  <p className={css.formSubtitle}>
                    Envíanos un mensaje con tu consulta y te responderemos lo antes posible.
                  </p>
                </div>

                {enviado && (
                  <div className={css.successBox}>
                    Se ha preparado tu mensaje en el correo. Revisa el borrador y envíalo.
                  </div>
                )}

                <form className={css.form} onSubmit={handleSubmit}>
                  <div className={css.row}>
                    <div className={css.field}>
                      <label className={css.label}>Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre"
                        className={css.input}
                        value={form.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={css.field}>
                      <label className={css.label}>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="tu@email.com"
                        className={css.input}
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={css.row}>
                    <div className={css.field}>
                      <label className={css.label}>Teléfono</label>
                      <input
                        type="text"
                        name="telefono"
                        placeholder="Tu teléfono"
                        className={css.input}
                        value={form.telefono}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={css.field}>
                      <label className={css.label}>Provincia</label>
                      <input
                        type="text"
                        name="provincia"
                        placeholder="Provincia"
                        className={css.input}
                        value={form.provincia}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={css.rowSingle}>
                    <div className={css.field}>
                      <label className={css.label}>Localidad</label>
                      <input
                        type="text"
                        name="localidad"
                        placeholder="Localidad"
                        className={css.input}
                        value={form.localidad}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={css.rowSingle}>
                    <div className={css.field}>
                      <label className={css.label}>Mensaje</label>
                      <textarea
                        name="mensaje"
                        placeholder="Explícanos brevemente qué necesitas"
                        className={css.textarea}
                        value={form.mensaje}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className={css.button}>
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>

            <div>
              <div className={css.infoBox}>
                <h2 className={css.infoTitle}>Información de contacto</h2>

                <div className={css.infoItem}>
                  <div className={css.iconWrap}>
                    <span className={css.icon}>📍</span>
                  </div>
                  <div>
                    <div className={css.infoLabel}>Dirección</div>
                    <div className={css.infoText}>Travessia Santa Eugènia 26</div>
                  </div>
                </div>

                <div className={css.infoItem}>
                  <div className={css.iconWrap}>
                    <span className={css.icon}>📞</span>
                  </div>
                  <div>
                    <div className={css.infoLabel}>Teléfono</div>
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
                    <div className={css.infoLabel}>Correo electrónico</div>
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
                    <div className={css.infoLabel}>Horario</div>
                    <div className={css.infoText}>
                      De lunes a viernes
                      <br />
                      09:00h a 13:00h | 15:00h a 19:30h
                      <br />
                      Sábado de 09:30h a 13:30h
                    </div>
                  </div>
                </div>

                <div className={css.noteBox}>
                  Para urgencias, recomendamos llamar directamente al teléfono de contacto.
                </div>

                <div className={css.sideCta}>
                  <a href="tel:667572011" className={css.sideCtaButton}>
                    Llamar ahora
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
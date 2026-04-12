import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import css from "../styles/Solicitud.module.css";

const TELEFONO_EMPRESA = "34667572011";
const EMAIL_DESTINO = "alexgarciamoles@gmail.com";

type LocationState = {
  servicioInicial?: string;
};

function Solicitud() {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const { t, language } = useLanguage();

  const serviciosDisponibles = useMemo(
    () => t.solicitud.availableServices,
    [t.solicitud.availableServices]
  );

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    provincia: "",
    localidad: "",
    direccion: "",
    urgencia: t.solicitud.urgencyOptions[0],
    problema: "",
  });

  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>(
    []
  );

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      urgencia: t.solicitud.urgencyOptions[0],
    }));
  }, [language, t.solicitud.urgencyOptions]);

  useEffect(() => {
    if (
      state?.servicioInicial &&
      serviciosDisponibles.includes(state.servicioInicial)
    ) {
      setServiciosSeleccionados([state.servicioInicial]);
    }
  }, [state, serviciosDisponibles]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleServicio = (servicio: string) => {
    setServiciosSeleccionados((prev) =>
      prev.includes(servicio)
        ? prev.filter((s) => s !== servicio)
        : [...prev, servicio]
    );
  };

  const mensaje = useMemo(() => {
    const listaServicios =
      serviciosSeleccionados.length > 0
        ? serviciosSeleccionados.map((s) => `- ${s}`).join("\n")
        : t.solicitud.notSpecified;

    return `${t.solicitud.requestMessage.title}

${t.solicitud.requestMessage.name}: ${form.nombre}
${t.solicitud.requestMessage.phone}: ${form.telefono}
${t.solicitud.requestMessage.province}: ${form.provincia}
${t.solicitud.requestMessage.city}: ${form.localidad}
${t.solicitud.requestMessage.address}: ${form.direccion}
${t.solicitud.requestMessage.urgency}: ${form.urgencia}

${t.solicitud.requestMessage.selectedServices}:
${listaServicios}

${t.solicitud.requestMessage.problemDescription}:
${form.problema}`;
  }, [form, serviciosSeleccionados, t.solicitud]);

  const validarFormulario = () => {
    if (!form.nombre.trim()) {
      alert(t.solicitud.validation.nameRequired);
      return false;
    }

    if (!form.telefono.trim()) {
      alert(t.solicitud.validation.phoneRequired);
      return false;
    }

    if (!form.provincia.trim()) {
      alert(t.solicitud.validation.provinceRequired);
      return false;
    }

    if (!form.localidad.trim()) {
      alert(t.solicitud.validation.cityRequired);
      return false;
    }

    if (!form.direccion.trim()) {
      alert(t.solicitud.validation.addressRequired);
      return false;
    }

    if (serviciosSeleccionados.length === 0) {
      alert(t.solicitud.validation.selectServiceRequired);
      return false;
    }

    if (!form.problema.trim()) {
      alert(t.solicitud.validation.problemRequired);
      return false;
    }

    return true;
  };

  const enviarPorEmail = () => {
    if (!validarFormulario()) return;

    const subject = encodeURIComponent(t.solicitud.emailSubject);
    const body = encodeURIComponent(mensaje);

    window.location.href = `mailto:${EMAIL_DESTINO}?subject=${subject}&body=${body}`;
  };

  const enviarPorWhatsApp = () => {
    if (!validarFormulario()) return;

    const texto = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${TELEFONO_EMPRESA}?text=${texto}`, "_blank");
  };

  return (
    <main className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>{t.solicitud.pageTitle}</h1>
        <p className={css.subtitle}>{t.solicitud.pageSubtitle}</p>

        <div className={css.noticeBox}>
          <h2 className={css.noticeTitle}>{t.solicitud.noticeTitle}</h2>
          <p className={css.noticeText}>{t.solicitud.noticeText}</p>
          <a href="tel:667572011" className={css.phone}>
            667 572 011
          </a>
        </div>

        <div className={css.formBox}>
          <div className={css.form}>
            <input
              type="text"
              name="nombre"
              placeholder={t.solicitud.placeholders.nombre}
              className={css.input}
              value={form.nombre}
              onChange={handleChange}
            />

            <input
              type="text"
              name="telefono"
              placeholder={t.solicitud.placeholders.telefono}
              className={css.input}
              value={form.telefono}
              onChange={handleChange}
            />

            <input
              type="text"
              name="provincia"
              placeholder={t.solicitud.placeholders.provincia}
              className={css.input}
              value={form.provincia}
              onChange={handleChange}
            />

            <input
              type="text"
              name="localidad"
              placeholder={t.solicitud.placeholders.localidad}
              className={css.input}
              value={form.localidad}
              onChange={handleChange}
            />

            <input
              type="text"
              name="direccion"
              placeholder={t.solicitud.placeholders.direccion}
              className={css.input}
              value={form.direccion}
              onChange={handleChange}
            />

            <select
              name="urgencia"
              className={css.input}
              value={form.urgencia}
              onChange={handleChange}
            >
              {t.solicitud.urgencyOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            <div className={css.servicesBox}>
              <h3 className={css.servicesTitle}>{t.solicitud.servicesTitle}</h3>
              <div className={css.servicesGrid}>
                {serviciosDisponibles.map((servicio) => {
                  const seleccionado = serviciosSeleccionados.includes(servicio);

                  return (
                    <button
                      key={servicio}
                      type="button"
                      onClick={() => toggleServicio(servicio)}
                      className={
                        seleccionado
                          ? `${css.serviceButton} ${css.serviceButtonActive}`
                          : css.serviceButton
                      }
                    >
                      {servicio}
                    </button>
                  );
                })}
              </div>
            </div>

            <textarea
              name="problema"
              placeholder={t.solicitud.placeholders.problema}
              className={css.textarea}
              value={form.problema}
              onChange={handleChange}
            />

            <div className={css.summaryBox}>
              <h3 className={css.summaryTitle}>{t.solicitud.summaryTitle}</h3>
              <p className={css.summaryText}>
                <strong>{t.solicitud.summaryServices}:</strong>{" "}
                {serviciosSeleccionados.length > 0
                  ? serviciosSeleccionados.join(", ")
                  : t.solicitud.noneSelected}
              </p>
              <p className={css.summaryText}>
                <strong>{t.solicitud.summaryUrgency}:</strong> {form.urgencia}
              </p>
            </div>

            <div className={css.actions}>
              <button type="button" className={css.emailButton} onClick={enviarPorEmail}>
                {t.solicitud.emailButton}
              </button>

              <button
                type="button"
                className={css.whatsappButton}
                onClick={enviarPorWhatsApp}
              >
                {t.solicitud.whatsappButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Solicitud;
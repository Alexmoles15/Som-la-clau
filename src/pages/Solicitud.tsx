import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const TELEFONO_EMPRESA = "34667572011"; // para WhatsApp en formato internacional sin espacios
const EMAIL_DESTINO = "alexgarciamoles@gmail.com";

const serviciosDisponibles = [
  "Apertura de puertas",
  "Apertura de coches",
  "Cambio de cerraduras",
  "Cajas fuertes",
  "Bombines antibumping",
  "Servicio urgente 24h",
];

type LocationState = {
  servicioInicial?: string;
};

function Solicitud() {
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    provincia: "",
    localidad: "",
    direccion: "",
    urgencia: "No urgente",
    problema: "",
  });

  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);

  useEffect(() => {
    if (
      state?.servicioInicial &&
      serviciosDisponibles.includes(state.servicioInicial)
    ) {
      setServiciosSeleccionados([state.servicioInicial]);
    }
  }, [state]);

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
        : "No especificado";

    return `Nueva solicitud de servicio

Nombre: ${form.nombre}
Teléfono: ${form.telefono}
Provincia: ${form.provincia}
Localidad: ${form.localidad}
Dirección: ${form.direccion}
Urgencia: ${form.urgencia}

Servicios seleccionados:
${listaServicios}

Descripción del problema:
${form.problema}`;
  }, [form, serviciosSeleccionados]);

  const validarFormulario = () => {
    if (!form.nombre.trim()) {
      alert("Introduce el nombre.");
      return false;
    }

    if (!form.telefono.trim()) {
      alert("Introduce el teléfono.");
      return false;
    }

    if (!form.provincia.trim()) {
      alert("Introduce la provincia.");
      return false;
    }

    if (!form.localidad.trim()) {
      alert("Introduce la localidad.");
      return false;
    }

    if (!form.direccion.trim()) {
      alert("Introduce la dirección.");
      return false;
    }

    if (serviciosSeleccionados.length === 0) {
      alert("Selecciona al menos un servicio.");
      return false;
    }

    if (!form.problema.trim()) {
      alert("Describe el problema.");
      return false;
    }

    return true;
  };

  const enviarPorEmail = () => {
    if (!validarFormulario()) return;

    const subject = encodeURIComponent("Nueva solicitud de servicio");
    const body = encodeURIComponent(mensaje);

    window.location.href = `mailto:${EMAIL_DESTINO}?subject=${subject}&body=${body}`;
  };

  const enviarPorWhatsApp = () => {
    if (!validarFormulario()) return;

    const texto = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${TELEFONO_EMPRESA}?text=${texto}`, "_blank");
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Solicitar servicio</h1>
        <p style={styles.subtitle}>
          Selecciona uno o varios servicios y envíanos la solicitud por correo o WhatsApp.
        </p>

        <div style={styles.noticeBox}>
          <h2 style={styles.noticeTitle}>¿Se trata de una urgencia?</h2>
          <p style={styles.noticeText}>
            Si necesitas atención inmediata, llámanos directamente.
          </p>
          <a href="tel:667572011" style={styles.phone}>
            667 572 011
          </a>
        </div>

        <div style={styles.formBox}>
          <div style={styles.form}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre y apellidos"
              style={styles.input}
              value={form.nombre}
              onChange={handleChange}
            />

            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              style={styles.input}
              value={form.telefono}
              onChange={handleChange}
            />

            <input
              type="text"
              name="provincia"
              placeholder="Provincia"
              style={styles.input}
              value={form.provincia}
              onChange={handleChange}
            />

            <input
              type="text"
              name="localidad"
              placeholder="Localidad"
              style={styles.input}
              value={form.localidad}
              onChange={handleChange}
            />

            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              style={styles.input}
              value={form.direccion}
              onChange={handleChange}
            />

            <select
              name="urgencia"
              style={styles.input}
              value={form.urgencia}
              onChange={handleChange}
            >
              <option>No urgente</option>
              <option>Urgente</option>
              <option>Muy urgente</option>
            </select>

            <div style={styles.servicesBox}>
              <h3 style={styles.servicesTitle}>Selecciona los servicios</h3>
              <div style={styles.servicesGrid}>
                {serviciosDisponibles.map((servicio) => {
                  const seleccionado = serviciosSeleccionados.includes(servicio);

                  return (
                    <button
                      key={servicio}
                      type="button"
                      onClick={() => toggleServicio(servicio)}
                      style={{
                        ...styles.serviceButton,
                        ...(seleccionado ? styles.serviceButtonActive : {}),
                      }}
                    >
                      {servicio}
                    </button>
                  );
                })}
              </div>
            </div>

            <textarea
              name="problema"
              placeholder="Describe el problema"
              style={styles.textarea}
              value={form.problema}
              onChange={handleChange}
            />

            <div style={styles.summaryBox}>
              <h3 style={styles.summaryTitle}>Resumen</h3>
              <p style={styles.summaryText}>
                <strong>Servicios:</strong>{" "}
                {serviciosSeleccionados.length > 0
                  ? serviciosSeleccionados.join(", ")
                  : "Ninguno seleccionado"}
              </p>
              <p style={styles.summaryText}>
                <strong>Urgencia:</strong> {form.urgencia}
              </p>
            </div>

            <div style={styles.actions}>
              <button type="button" style={styles.emailButton} onClick={enviarPorEmail}>
                Enviar por correo
              </button>

              <button
                type="button"
                style={styles.whatsappButton}
                onClick={enviarPorWhatsApp}
              >
                Enviar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "40px 0",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 20px",
  },
  title: {
    textAlign: "center",
    fontSize: "42px",
    marginBottom: "12px",
    color: "#111",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
    lineHeight: 1.6,
  },
  noticeBox: {
    backgroundColor: "#111",
    color: "white",
    borderRadius: "16px",
    padding: "28px",
    textAlign: "center",
    marginBottom: "30px",
  },
  noticeTitle: {
    fontSize: "24px",
    margin: "0 0 10px 0",
  },
  noticeText: {
    color: "#d1d1d1",
    margin: "0 0 14px 0",
    lineHeight: 1.6,
  },
  phone: {
    color: "#c1121f",
    fontSize: "28px",
    fontWeight: 800,
    textDecoration: "none",
  },
  formBox: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },
  textarea: {
    padding: "14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    minHeight: "130px",
    outline: "none",
    resize: "vertical",
  },
  servicesBox: {
    marginTop: "8px",
    marginBottom: "8px",
  },
  servicesTitle: {
    fontSize: "20px",
    marginBottom: "14px",
    color: "#111",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
  },
  serviceButton: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "15px",
    transition: "all 0.2s ease",
  },
  serviceButtonActive: {
    backgroundColor: "#111",
    color: "white",
    border: "1px solid #111",
  },
  summaryBox: {
    backgroundColor: "#f8f8f8",
    borderRadius: "12px",
    padding: "18px",
    border: "1px solid #e7e7e7",
  },
  summaryTitle: {
    margin: "0 0 10px 0",
    fontSize: "18px",
    color: "#111",
  },
  summaryText: {
    margin: "6px 0",
    color: "#444",
    lineHeight: 1.5,
  },
  actions: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  emailButton: {
    flex: 1,
    minWidth: "220px",
    padding: "15px",
    backgroundColor: "#c1121f",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "16px",
  },
  whatsappButton: {
    flex: 1,
    minWidth: "220px",
    padding: "15px",
    backgroundColor: "#1f9d55",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "16px",
  },
};

export default Solicitud;
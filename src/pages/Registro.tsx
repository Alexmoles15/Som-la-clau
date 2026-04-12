import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiUrl } from "../api/api";
import { useLanguage } from "../i18n/LanguageContext";

function Registro() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [municipio, setMunicipio] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.trim().length < 8) {
      setError(t.registro.errors.passwordMinLength);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(getApiUrl("/auth/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellidos: apellidos.trim(),
          email: email.trim(),
          password,
          telefono: telefono.trim(),
          direccion: direccion.trim(),
          municipio: municipio.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data?.message || t.registro.errors.createAccountFailed
        );
      }

      const usuario = {
        id: data?.id,
        nombre: data?.nombre ?? "",
        apellidos: data?.apellidos ?? "",
        email: data?.email ?? "",
        telefono: data?.telefono ?? "",
        direccion: data?.direccion ?? "",
        municipio: data?.municipio ?? "",
        rol: data?.rol ?? "USER",
      };

      localStorage.setItem("usuario", JSON.stringify(usuario));
      navigate("/perfil");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t.registro.errors.createAccountFailed
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>{t.registro.pageTitle}</h1>
        <p style={styles.subtitle}>{t.registro.pageSubtitle}</p>

        <form style={styles.form} onSubmit={handleRegistro}>
          <div style={styles.field}>
            <label style={styles.label}>{t.registro.nombre}</label>
            <input
              type="text"
              placeholder={t.registro.placeholders.nombre}
              style={styles.input}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>{t.registro.apellidos}</label>
            <input
              type="text"
              placeholder={t.registro.placeholders.apellidos}
              style={styles.input}
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>{t.registro.email}</label>
            <input
              type="email"
              placeholder={t.registro.placeholders.email}
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>{t.registro.password}</label>
            <input
              type="password"
              placeholder={t.registro.placeholders.password}
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>{t.registro.telefono}</label>
            <input
              type="text"
              placeholder={t.registro.placeholders.telefono}
              style={styles.input}
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>{t.registro.direccion}</label>
            <input
              type="text"
              placeholder={t.registro.placeholders.direccion}
              style={styles.input}
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>{t.registro.municipio}</label>
            <input
              type="text"
              placeholder={t.registro.placeholders.municipio}
              style={styles.input}
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? t.registro.buttons.creating : t.registro.buttons.create}
          </button>
        </form>

        <p style={styles.footer}>
          {t.registro.footerText}{" "}
          <Link to="/login" style={styles.link}>
            {t.registro.footerLink}
          </Link>
        </p>
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 40%, #fecaca 100%)",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "24px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "36px",
    boxShadow: "0 25px 50px rgba(193, 18, 31, 0.15)",
    border: "1px solid rgba(255,255,255,0.6)",
  },

  title: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#111",
    marginBottom: "6px",
    textAlign: "center",
  },

  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "24px",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#444",
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
  },

  button: {
    marginTop: "8px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #c1121f 0%, #9b0d18 100%)",
    color: "white",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(193, 18, 31, 0.3)",
  },

  footer: {
    marginTop: "18px",
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
  },

  link: {
    color: "#c1121f",
    fontWeight: 700,
    textDecoration: "none",
  },

  error: {
    color: "#b91c1c",
    fontSize: "14px",
    margin: 0,
  },
};

export default Registro;
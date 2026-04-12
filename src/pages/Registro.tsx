import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiUrl } from "../api/api";
import { useLanguage } from "../i18n/LanguageContext";
import css from "../styles/Registro.module.css";

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
    <main className={css.page}>
      <div className={css.card}>
        <h1 className={css.title}>{t.registro.pageTitle}</h1>
        <p className={css.subtitle}>{t.registro.pageSubtitle}</p>

        <form className={css.form} onSubmit={handleRegistro}>
          <div className={css.field}>
            <label className={css.label}>{t.registro.nombre}</label>
            <input
              type="text"
              placeholder={t.registro.placeholders.nombre}
              className={css.input}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className={css.field}>
            <label className={css.label}>{t.registro.apellidos}</label>
            <input
              type="text"
              placeholder={t.registro.placeholders.apellidos}
              className={css.input}
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
          </div>

          <div className={css.field}>
            <label className={css.label}>{t.registro.email}</label>
            <input
              type="email"
              placeholder={t.registro.placeholders.email}
              className={css.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={css.field}>
            <label className={css.label}>{t.registro.password}</label>
            <input
              type="password"
              placeholder={t.registro.placeholders.password}
              className={css.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <div className={css.field}>
            <label className={css.label}>{t.registro.telefono}</label>
            <input
              type="text"
              placeholder={t.registro.placeholders.telefono}
              className={css.input}
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          <div className={css.field}>
            <label className={css.label}>{t.registro.direccion}</label>
            <input
              type="text"
              placeholder={t.registro.placeholders.direccion}
              className={css.input}
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          <div className={css.field}>
            <label className={css.label}>{t.registro.municipio}</label>
            <input
              type="text"
              placeholder={t.registro.placeholders.municipio}
              className={css.input}
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
            />
          </div>

          {error && <p className={css.error}>{error}</p>}

          <button type="submit" className={css.button} disabled={loading}>
            {loading ? t.registro.buttons.creating : t.registro.buttons.create}
          </button>
        </form>

        <p className={css.footer}>
          {t.registro.footerText}{" "}
          <Link to="/login" className={css.link}>
            {t.registro.footerLink}
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Registro;
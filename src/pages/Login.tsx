import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getApiUrl } from "../api/api";
import styles from "../styles/Login.module.css";
import { useLanguage } from "../i18n/LanguageContext";

type Usuario = {
  id?: number;
  nombre?: string;
  apellidos?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  municipio?: string;
  rol?: string;
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const [modoRegistro, setModoRegistro] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [municipio, setMunicipio] = useState("");

  const from = location.state?.from || "/";

  const limpiarFormulario = () => {
    setEmail("");
    setPassword("");
    setNombre("");
    setApellidos("");
    setTelefono("");
    setDireccion("");
    setMunicipio("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(getApiUrl("/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(t.login.errors.invalidCredentials);
      }

      const usuario: Usuario = await response.json();
      localStorage.setItem("usuario", JSON.stringify(usuario));
      navigate(from, { replace: true });
    } catch {
      setError(t.login.errors.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.trim().length < 8) {
      setError(t.login.errors.passwordMinLength);
      setLoading(false);
      return;
    }

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

      if (!response.ok) {
        throw new Error(t.login.errors.createAccountFailed);
      }

      const usuario: Usuario = await response.json();
      localStorage.setItem("usuario", JSON.stringify(usuario));
      limpiarFormulario();
      navigate(from, { replace: true });
    } catch {
      setError(t.login.errors.createAccountFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <section className={styles.leftPanel}>
          <div className={styles.brandBadge}>{t.login.brandBadge}</div>

          <h1 className={styles.heroTitle}>
            {modoRegistro ? t.login.hero.registerTitle : t.login.hero.loginTitle}
          </h1>

          <p className={styles.heroText}>
            {modoRegistro
              ? t.login.hero.registerText
              : t.login.hero.loginText}
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>✓</div>
              <span>{t.login.features.fastSecure}</span>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>✓</div>
              <span>{t.login.features.simpleRequests}</span>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>✓</div>
              <span>{t.login.features.clearProfessional}</span>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.tabs}>
            <button
              type="button"
              onClick={() => {
                setModoRegistro(false);
                setError("");
                limpiarFormulario();
              }}
              className={`${styles.tabButton} ${
                !modoRegistro ? styles.tabButtonActive : ""
              }`}
            >
              {t.login.tabs.login}
            </button>

            <button
              type="button"
              onClick={() => {
                setModoRegistro(true);
                setError("");
                limpiarFormulario();
              }}
              className={`${styles.tabButton} ${
                modoRegistro ? styles.tabButtonActive : ""
              }`}
            >
              {t.login.tabs.register}
            </button>
          </div>

          <h2 className={styles.title}>
            {modoRegistro ? t.login.registerTitle : t.login.loginTitle}
          </h2>

          <p className={styles.subtitle}>
            {modoRegistro
              ? t.login.registerSubtitle
              : t.login.loginSubtitle}
          </p>

          {!modoRegistro ? (
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t.login.email}</label>
                <input
                  type="email"
                  placeholder={t.login.placeholders.loginEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t.login.password}</label>
                <input
                  type="password"
                  placeholder={t.login.placeholders.loginPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? t.login.buttons.loggingIn : t.login.buttons.login}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegistro} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.login.nombre}</label>
                  <input
                    type="text"
                    placeholder={t.login.placeholders.nombre}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className={styles.input}
                    autoComplete="given-name"
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.login.apellidos}</label>
                  <input
                    type="text"
                    placeholder={t.login.placeholders.apellidos}
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    className={styles.input}
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t.login.email}</label>
                <input
                  type="email"
                  placeholder={t.login.placeholders.registerEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t.login.password}</label>
                <input
                  type="password"
                  placeholder={t.login.placeholders.registerPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.login.telefono}</label>
                  <input
                    type="text"
                    placeholder={t.login.placeholders.telefono}
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className={styles.input}
                    autoComplete="tel"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.login.municipio}</label>
                  <input
                    type="text"
                    placeholder={t.login.placeholders.municipio}
                    value={municipio}
                    onChange={(e) => setMunicipio(e.target.value)}
                    className={styles.input}
                    autoComplete="address-level2"
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>{t.login.direccion}</label>
                <input
                  type="text"
                  placeholder={t.login.placeholders.direccion}
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className={styles.input}
                  autoComplete="street-address"
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={styles.button} disabled={loading}>
                {loading
                  ? t.login.buttons.creatingAccount
                  : t.login.buttons.createAccount}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

export default Login;
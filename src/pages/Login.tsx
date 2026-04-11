import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getApiUrl } from "../api/api";
import styles from "../styles/Login.module.css";

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
        throw new Error("Credenciales incorrectas");
      }

      const usuario: Usuario = await response.json();
      localStorage.setItem("usuario", JSON.stringify(usuario));
      navigate(from, { replace: true });
    } catch {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.trim().length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(getApiUrl("/usuarios/registro"), {
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
        throw new Error("No se pudo crear la cuenta");
      }

      const usuario: Usuario = await response.json();
      localStorage.setItem("usuario", JSON.stringify(usuario));
      limpiarFormulario();
      navigate(from, { replace: true });
    } catch {
      setError("No se pudo crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <section className={styles.leftPanel}>
          <div className={styles.brandBadge}>Mi Portal</div>

          <h1 className={styles.heroTitle}>
            {modoRegistro ? "Crea tu cuenta" : "Bienvenido de nuevo"}
          </h1>

          <p className={styles.heroText}>
            {modoRegistro
              ? "Regístrate para continuar con tu solicitud de forma rápida, segura y sencilla."
              : "Accede a tu cuenta para gestionar tus datos, solicitudes y trámites."}
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>✓</div>
              <span>Acceso rápido y seguro</span>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>✓</div>
              <span>Gestión simple de solicitudes</span>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>✓</div>
              <span>Diseño claro y profesional</span>
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
              Iniciar sesión
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
              Crear cuenta
            </button>
          </div>

          <h2 className={styles.title}>
            {modoRegistro ? "Crear usuario" : "Iniciar sesión"}
          </h2>

          <p className={styles.subtitle}>
            {modoRegistro
              ? "Completa tus datos para crear una cuenta."
              : "Introduce tus credenciales para acceder."}
          </p>

          {!modoRegistro ? (
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Correo electrónico</label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Contraseña</label>
                <input
                  type="password"
                  placeholder="Introduce tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegistro} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Nombre</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className={styles.input}
                    autoComplete="given-name"
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Apellidos</label>
                  <input
                    type="text"
                    placeholder="Tus apellidos"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    className={styles.input}
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Correo electrónico</label>
                <input
                  type="email"
                  placeholder="Tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Contraseña</label>
                <input
                  type="password"
                  placeholder="Crea una contraseña"
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
                  <label className={styles.label}>Teléfono</label>
                  <input
                    type="text"
                    placeholder="Tu teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className={styles.input}
                    autoComplete="tel"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Municipio</label>
                  <input
                    type="text"
                    placeholder="Tu municipio"
                    value={municipio}
                    onChange={(e) => setMunicipio(e.target.value)}
                    className={styles.input}
                    autoComplete="address-level2"
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Dirección</label>
                <input
                  type="text"
                  placeholder="Tu dirección"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className={styles.input}
                  autoComplete="street-address"
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

export default Login;
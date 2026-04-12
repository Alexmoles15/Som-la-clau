import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Perfil.module.css";
import { getApiUrl } from "../api/api";
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

function normalizarUsuario(raw: any): Usuario | null {
  if (!raw || typeof raw !== "object") return null;

  return {
    id: raw.id,
    nombre: raw.nombre ?? raw.name ?? "",
    apellidos: raw.apellidos ?? raw.apellido ?? raw.surname ?? "",
    email: raw.email ?? raw.correo ?? "",
    telefono:
      raw.telefono ??
      raw.numero ??
      raw.phone ??
      raw.telefonoMovil ??
      raw.telefonoUsuario ??
      "",
    direccion:
      raw.direccion ??
      raw.address ??
      raw.calle ??
      raw.domicilio ??
      "",
    municipio:
      raw.municipio ??
      raw.localidad ??
      raw.poblacion ??
      raw.city ??
      raw.pueblo ??
      "",
    rol: raw.rol ?? raw.role ?? "",
  };
}

function Perfil() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    direccion: "",
    municipio: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    password: "",
    confirmarPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingPerfil, setLoadingPerfil] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarPerfil = async () => {
      const usuarioGuardado = localStorage.getItem("usuario");

      if (!usuarioGuardado) {
        navigate("/login");
        return;
      }

      try {
        const parsed = JSON.parse(usuarioGuardado);
        const normalizadoLocal = normalizarUsuario(parsed);

        if (!normalizadoLocal?.id) {
          navigate("/login");
          return;
        }

        setUsuario(normalizadoLocal);
        setForm({
          nombre: normalizadoLocal.nombre || "",
          apellidos: normalizadoLocal.apellidos || "",
          email: normalizadoLocal.email || "",
          telefono: normalizadoLocal.telefono || "",
          direccion: normalizadoLocal.direccion || "",
          municipio: normalizadoLocal.municipio || "",
        });

        try {
          const response = await fetch(
            getApiUrl(`/usuarios/${normalizadoLocal.id}`)
          );

          if (!response.ok) {
            throw new Error(t.perfil.errors.loadProfile);
          }

          const usuarioBackend = await response.json();
          const normalizadoBackend = normalizarUsuario(usuarioBackend);

          if (!normalizadoBackend) {
            throw new Error(t.perfil.errors.invalidResponse);
          }

          setUsuario(normalizadoBackend);
          localStorage.setItem("usuario", JSON.stringify(normalizadoBackend));

          setForm({
            nombre: normalizadoBackend.nombre || "",
            apellidos: normalizadoBackend.apellidos || "",
            email: normalizadoBackend.email || "",
            telefono: normalizadoBackend.telefono || "",
            direccion: normalizadoBackend.direccion || "",
            municipio: normalizadoBackend.municipio || "",
          });
        } catch {
          setMensaje(t.perfil.messages.localData);
        }
      } catch {
        navigate("/login");
      } finally {
        setLoadingPerfil(false);
      }
    };

    cargarPerfil();
  }, [navigate, t.perfil.errors.invalidResponse, t.perfil.errors.loadProfile, t.perfil.messages.localData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario?.id) {
      setError(t.perfil.errors.userNotIdentified);
      setMensaje("");
      return;
    }

    if (
      passwordForm.password &&
      passwordForm.password !== passwordForm.confirmarPassword
    ) {
      setError(t.perfil.errors.passwordMismatch);
      setMensaje("");
      return;
    }

    if (passwordForm.password && passwordForm.password.length < 8) {
      setError(t.perfil.errors.passwordMinLength);
      setMensaje("");
      return;
    }

    setLoading(true);
    setMensaje("");
    setError("");

    try {
      const payload: Record<string, string> = {
        nombre: form.nombre.trim(),
        apellidos: form.apellidos.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        direccion: form.direccion.trim(),
        municipio: form.municipio.trim(),
      };

      if (passwordForm.password.trim()) {
        payload.password = passwordForm.password.trim();
      }

      const response = await fetch(getApiUrl(`/usuarios/${usuario.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(t.perfil.errors.updateFailed);
      }

      const usuarioActualizado = await response.json();
      const normalizado = normalizarUsuario(usuarioActualizado);

      if (!normalizado) {
        throw new Error(t.perfil.errors.invalidResponse);
      }

      localStorage.setItem("usuario", JSON.stringify(normalizado));
      setUsuario(normalizado);

      setForm({
        nombre: normalizado.nombre || "",
        apellidos: normalizado.apellidos || "",
        email: normalizado.email || "",
        telefono: normalizado.telefono || "",
        direccion: normalizado.direccion || "",
        municipio: normalizado.municipio || "",
      });

      setPasswordForm({
        password: "",
        confirmarPassword: "",
      });

      setMensaje(t.perfil.messages.updatedSuccessfully);
    } catch {
      setError(t.perfil.errors.saveChangesFailed);
      setMensaje("");
    } finally {
      setLoading(false);
    }
  };

  if (loadingPerfil) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <section className={styles.card}>
            <p className={styles.loadingText}>{t.perfil.loading}</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.headerCard}>
          <div className={styles.avatar}>
            {form.nombre?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h1 className={styles.title}>{t.perfil.title}</h1>
            <p className={styles.subtitle}>{t.perfil.subtitle}</p>
            {usuario?.rol && (
              <span className={styles.roleBadge}>{usuario.rol}</span>
            )}
          </div>
        </section>

        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>
              {t.perfil.personalDataTitle}
            </h2>

            <div className={styles.form}>
              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.perfil.nombre}</label>
                  <input
                    name="nombre"
                    placeholder={t.perfil.placeholders.nombre}
                    value={form.nombre}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="given-name"
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.perfil.apellidos}</label>
                  <input
                    name="apellidos"
                    placeholder={t.perfil.placeholders.apellidos}
                    value={form.apellidos}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.perfil.email}</label>
                  <input
                    name="email"
                    type="email"
                    placeholder={t.perfil.placeholders.email}
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.perfil.telefono}</label>
                  <input
                    name="telefono"
                    placeholder={t.perfil.placeholders.telefono}
                    value={form.telefono}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.perfil.direccion}</label>
                  <input
                    name="direccion"
                    placeholder={t.perfil.placeholders.direccion}
                    value={form.direccion}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="street-address"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.perfil.municipio}</label>
                  <input
                    name="municipio"
                    placeholder={t.perfil.placeholders.municipio}
                    value={form.municipio}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="address-level2"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>{t.perfil.securityTitle}</h2>
            <p className={styles.sectionSubtitle}>
              {t.perfil.securitySubtitle}
            </p>

            <div className={styles.form}>
              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    {t.perfil.newPassword}
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder={t.perfil.placeholders.newPassword}
                    value={passwordForm.password}
                    onChange={handlePasswordChange}
                    className={styles.input}
                    autoComplete="new-password"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    {t.perfil.confirmPassword}
                  </label>
                  <input
                    name="confirmarPassword"
                    type="password"
                    placeholder={t.perfil.placeholders.confirmPassword}
                    value={passwordForm.confirmarPassword}
                    onChange={handlePasswordChange}
                    className={styles.input}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>
          </section>

          {(mensaje || error) && (
            <section className={styles.feedbackWrap}>
              {mensaje && <p className={styles.success}>{mensaje}</p>}
              {error && <p className={styles.error}>{error}</p>}
            </section>
          )}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? t.perfil.buttons.saving : t.perfil.buttons.saveChanges}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Perfil;
import React from "react";

function Registro() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Crear cuenta</h1>
        <p style={styles.subtitle}>
          Regístrate para empezar a usar la plataforma
        </p>

        <form style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Nombre</label>
            <input type="text" placeholder="Tu nombre" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Apellidos</label>
            <input type="text" placeholder="Tus apellidos" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input type="email" placeholder="ejemplo@email.com" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <input type="password" placeholder="Crea una contraseña" style={styles.input} />
          </div>

          <button type="submit" style={styles.button}>
            Crear cuenta
          </button>
        </form>

        <p style={styles.footer}>
          ¿Ya tienes cuenta? <span style={styles.link}>Inicia sesión</span>
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
    cursor: "pointer",
  },
};

export default Registro;
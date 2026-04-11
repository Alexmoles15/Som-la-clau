import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";

function Navbar() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("usuario") || "null");
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        <img src={logo} alt={t.brand} style={styles.logo} />
        <div>
          <div style={styles.title}>{t.brand}</div>
          <div style={styles.phone}>667 572 011</div>
        </div>
      </Link>

      <div style={styles.right}>
        <LanguageSelector />

        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            {t.navbar.inicio}
          </Link>

          <Link to="/servicios" style={styles.link}>
            {t.navbar.servicios}
          </Link>

          <Link to="/contacto" style={styles.link}>
            {t.navbar.contacto}
          </Link>

          {!isLoggedIn && (
            <Link
              to="/login"
              state={{ from: location.pathname }}
              style={styles.link}
            >
              Iniciar sesión
            </Link>
          )}

          {isLoggedIn && (
            <div
              style={styles.userBox}
              onClick={() => navigate("/perfil")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate("/perfil");
                }
              }}
            >
              <span style={styles.avatar}>
                {user?.nombre?.charAt(0)?.toUpperCase() || "U"}
              </span>

              <span style={styles.userName}>{user?.nombre || "Usuario"}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                style={styles.logout}
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 30px",
    backgroundColor: "#111",
    color: "white",
    gap: "20px",
    flexWrap: "wrap",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    color: "white",
  },

  logo: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    objectFit: "cover",
    backgroundColor: "white",
    padding: "6px",
  },

  title: {
    fontWeight: 700,
    fontSize: "18px",
  },

  phone: {
    color: "#c1121f",
    fontWeight: 700,
    fontSize: "14px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },

  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#c1121f",
    padding: "6px 12px",
    borderRadius: "999px",
    cursor: "pointer",
  },

  avatar: {
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    backgroundColor: "white",
    color: "#c1121f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "12px",
  },

  userName: {
    fontSize: "14px",
    fontWeight: 700,
    color: "white",
  },

  logout: {
    backgroundColor: "white",
    color: "#c1121f",
    border: "none",
    padding: "4px 10px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 700,
  },
};

export default Navbar;
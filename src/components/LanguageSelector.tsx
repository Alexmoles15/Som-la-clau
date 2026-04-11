import { useLanguage } from "../i18n/LanguageContext";

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const options = [
    { code: "ca", label: "CA" },
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
  ] as const;

  return (
    <div style={styles.wrapper}>
      {options.map((option) => (
        <button
          key={option.code}
          onClick={() => setLanguage(option.code)}
          style={{
            ...styles.button,
            ...(language === option.code ? styles.active : {}),
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: "flex",
    gap: "8px",
  },
  button: {
    backgroundColor: "#111",
    color: "white",
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 700,
  },
  active: {
    backgroundColor: "#c1121f",
    border: "1px solid #c1121f",
  },
};

export default LanguageSelector;
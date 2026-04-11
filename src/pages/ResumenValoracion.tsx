import React from "react";

type Servicio = {
  id: number;
  activo: boolean;
  descripcion: string;
  nombre: string;
  precioBase: number | null;
  urgente: boolean;
};

type UsuarioLogueado = {
  id?: number;
  nombre?: string;
  apellidos?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  municipio?: string;
  rol?: string;
};

type ItemResumen = {
  servicio: Servicio;
  cantidad: number;
  precioBase: number;
  totalServicio: number;
};

type Props = {
  resumenSeleccionados: ItemResumen[];
  totalAproximado: number;
  mensajeExtra: string;
  setMensajeExtra: React.Dispatch<React.SetStateAction<string>>;
  usuario: UsuarioLogueado | null;
  onDisminuir: (servicioId: number) => void;
  onAumentar: (servicio: Servicio) => void;
  onEnviarPorCorreo: () => void;
  onEnviarPorWhatsApp: () => void;
  resumenRef: React.RefObject<HTMLElement | null>;
};

function ResumenValoracion({
  resumenSeleccionados,
  totalAproximado,
  mensajeExtra,
  setMensajeExtra,
  usuario,
  onDisminuir,
  onAumentar,
  onEnviarPorCorreo,
  onEnviarPorWhatsApp,
  resumenRef,
}: Props) {
  if (resumenSeleccionados.length === 0) return null;

  return (
    <section
      key={`${resumenSeleccionados.length}-${totalAproximado}`}
      ref={resumenRef}
      style={styles.summarySection}
    >
      <div style={styles.summaryBox}>
        <div style={styles.selectedList}>
          {resumenSeleccionados.map(
            ({ servicio, cantidad, precioBase, totalServicio }) => (
              <div key={servicio.id} style={styles.selectedItem}>
                <div>
                  <span style={styles.selectedName}>{servicio.nombre}</span>
                  <div style={styles.selectedSubline}>
                    Cantidad: {cantidad}
                    {servicio.nombre.trim().toLowerCase() ===
                      "cambio de cerraduras" &&
                      " · 1ª puerta al precio base, siguientes a 45€"}
                    {precioBase <= 0 && " · precio pendiente de configurar"}
                  </div>
                </div>

                <div style={styles.quantityControls}>
                  <button
                    type="button"
                    style={styles.qtyButton}
                    onClick={() => onDisminuir(servicio.id)}
                  >
                    −
                  </button>
                  <span style={styles.qtyValue}>{cantidad}</span>
                  <button
                    type="button"
                    style={styles.qtyButton}
                    onClick={() => onAumentar(servicio)}
                  >
                    +
                  </button>
                </div>

                <span style={styles.selectedPrice}>{totalServicio} €</span>
              </div>
            )
          )}
        </div>

        <div style={styles.totalBox}>
          <span style={styles.totalLabel}>Total aproximado:</span>
          <span style={styles.totalValue}>{totalAproximado} €</span>
        </div>

        <div style={styles.warningBox}>
          Este precio es orientativo y no es definitivo. Falta sumar distancia,
          desplazamiento, urgencia y la valoración final del trabajo.
        </div>

        <textarea
          placeholder="Añade información extra si quieres (horario, dirección aproximada, problema concreto...)"
          style={styles.textarea}
          value={mensajeExtra}
          onChange={(e) => setMensajeExtra(e.target.value)}
        />

        <div style={styles.userBox}>
          <p style={styles.userText}>
            <strong>Correo del usuario:</strong> {usuario?.email || "No disponible"}
          </p>
          <p style={styles.userText}>
            <strong>Teléfono del usuario:</strong> {usuario?.telefono || "No disponible"}
          </p>
          <p style={styles.userText}>
            <strong>Municipio:</strong> {usuario?.municipio || "No disponible"}
          </p>
        </div>

        <div style={styles.actions}>
          <button type="button" style={styles.emailButton} onClick={onEnviarPorCorreo}>
            Enviar valoración por correo
          </button>

          <button
            type="button"
            style={styles.whatsappButton}
            onClick={onEnviarPorWhatsApp}
          >
            Enviar valoración por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  summarySection: {
    marginBottom: "40px",
  },
  summaryBox: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.1)",
    maxWidth: "820px",
    margin: "0 auto",
  },
  selectedList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "18px",
  },
  selectedItem: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto",
    alignItems: "center",
    padding: "12px 14px",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    gap: "12px",
  },
  selectedName: {
    fontWeight: 600,
    color: "#111",
    display: "block",
  },
  selectedSubline: {
    fontSize: "13px",
    color: "#666",
    marginTop: "4px",
  },
  selectedPrice: {
    fontWeight: 700,
    color: "#c1121f",
    whiteSpace: "nowrap",
    minWidth: "60px",
    textAlign: "right",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  qtyButton: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#111",
    color: "white",
    fontSize: "18px",
    fontWeight: 700,
    cursor: "pointer",
  },
  qtyValue: {
    minWidth: "24px",
    textAlign: "center",
    fontWeight: 700,
    color: "#111",
  },
  totalBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderTop: "1px solid #e5e5e5",
    borderBottom: "1px solid #e5e5e5",
    marginBottom: "16px",
    gap: "12px",
  },
  totalLabel: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#111",
  },
  totalValue: {
    fontSize: "24px",
    fontWeight: 800,
    color: "#c1121f",
    whiteSpace: "nowrap",
  },
  warningBox: {
    backgroundColor: "#fff3cd",
    color: "#7a5a00",
    border: "1px solid #ffe69c",
    borderRadius: "12px",
    padding: "14px",
    lineHeight: 1.6,
    marginBottom: "16px",
    fontWeight: 600,
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "16px",
    resize: "vertical",
    marginBottom: "16px",
    outline: "none",
    boxSizing: "border-box",
  },
  userBox: {
    backgroundColor: "#f8f8f8",
    borderRadius: "12px",
    padding: "14px",
    marginBottom: "16px",
  },
  userText: {
    margin: "6px 0",
    color: "#333",
    lineHeight: 1.5,
  },
  actions: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
  },
  emailButton: {
    flex: 1,
    minWidth: "240px",
    padding: "15px",
    backgroundColor: "#111",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "16px",
  },
  whatsappButton: {
    flex: 1,
    minWidth: "240px",
    padding: "15px",
    backgroundColor: "#25D366",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "16px",
  },
};

export default ResumenValoracion;
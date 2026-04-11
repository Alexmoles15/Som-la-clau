import React from "react";

type Servicio = {
  id: number;
  activo: boolean;
  descripcion: string;
  nombre: string;
  precioBase: number | null;
  urgente: boolean;
  imagenUrl?: string | null;
  orden?: number | null;
};

function formatearPrecio(precioBase: number | null, urgente: boolean) {
  if (
    urgente &&
    (precioBase === null || precioBase === undefined || precioBase <= 0)
  ) {
    return "Urgente";
  }

  if (precioBase === null || precioBase === undefined) {
    return "Consultar";
  }

  return `Desde ${precioBase}€`;
}

type Props = {
  servicio: Servicio;
  seleccionado: boolean;
  cantidad: number;
  esAdmin: boolean;
  estaEditando: boolean;
  formAdmin: {
    nombre: string;
    descripcion: string;
    precioBase: string;
    urgente: boolean;
    activo: boolean;
    imagenUrl: string;
  };
  onToggle: () => void;
  onAumentar: () => void;
  onDisminuir: () => void;
  onEmpezarEdicion: () => void;
  onCancelarEdicion: () => void;
  onGuardar: () => void;
  onChangeFormAdmin: (
    changes: Partial<{
      nombre: string;
      descripcion: string;
      precioBase: string;
      urgente: boolean;
      activo: boolean;
      imagenUrl: string;
    }>
  ) => void;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: () => void;
};

function ServicioCard({
  servicio,
  seleccionado,
  cantidad,
  esAdmin,
  estaEditando,
  formAdmin,
  onToggle,
  onAumentar,
  onDisminuir,
  onEmpezarEdicion,
  onCancelarEdicion,
  onGuardar,
  onChangeFormAdmin,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
}: Props) {
  const imagenFallback =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

  return (
    <div
      draggable={draggable && !estaEditando}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        ...styles.card,
        ...(seleccionado ? styles.cardSelected : {}),
        ...(esAdmin ? styles.adminDraggableCard : {}),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 20px 45px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = seleccionado
          ? "translateY(-4px)"
          : "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
      }}
    >
      <div
        style={{
          ...styles.image,
          backgroundImage: `url(${servicio.imagenUrl || imagenFallback})`,
        }}
      >
        <div style={styles.overlay}></div>
        <h3 style={styles.imageTitle}>{servicio.nombre}</h3>
      </div>

      <div style={styles.content}>
        <p style={styles.desc}>{servicio.descripcion}</p>

        <div style={styles.priceBlock}>
          <p style={styles.price}>
            {formatearPrecio(servicio.precioBase, servicio.urgente)}
          </p>

          <p style={styles.specialNote}>
            {servicio.nombre.trim().toLowerCase() === "cambio de cerraduras"
              ? "1ª puerta al precio base, siguientes a 45€"
              : "\u00A0"}
          </p>
        </div>

        {esAdmin && !estaEditando && (
          <p style={styles.dragHint}>Admin: arrastra para cambiar el orden</p>
        )}

        {!seleccionado ? (
          <button type="button" style={styles.selectButton} onClick={onToggle}>
            Agregar a la valoración
          </button>
        ) : (
          <div style={styles.cardControls}>
            <div style={styles.cardQuantityBox}>
              <button
                type="button"
                style={styles.qtyButton}
                onClick={onDisminuir}
              >
                −
              </button>
              <span style={styles.qtyValue}>{cantidad}</span>
              <button
                type="button"
                style={styles.qtyButton}
                onClick={onAumentar}
              >
                +
              </button>
            </div>

            <button
              type="button"
              style={{ ...styles.selectButton, ...styles.removeButton }}
              onClick={onToggle}
            >
              Quitar de la valoración
            </button>
          </div>
        )}

        {esAdmin && !estaEditando && (
          <button
            type="button"
            style={styles.adminButton}
            onClick={onEmpezarEdicion}
          >
            Editar servicio
          </button>
        )}

        {esAdmin && estaEditando && (
          <div style={styles.adminEditBox}>
            <input
              value={formAdmin.nombre}
              onChange={(e) => onChangeFormAdmin({ nombre: e.target.value })}
              style={styles.adminInput}
              placeholder="Nombre"
            />

            <textarea
              value={formAdmin.descripcion}
              onChange={(e) =>
                onChangeFormAdmin({ descripcion: e.target.value })
              }
              style={styles.adminTextarea}
              placeholder="Descripción"
            />

            <input
              value={formAdmin.precioBase}
              onChange={(e) =>
                onChangeFormAdmin({ precioBase: e.target.value })
              }
              style={styles.adminInput}
              placeholder="Precio base"
              type="number"
            />

            <input
              value={formAdmin.imagenUrl}
              onChange={(e) =>
                onChangeFormAdmin({ imagenUrl: e.target.value })
              }
              style={styles.adminInput}
              placeholder="URL de la imagen"
              type="text"
            />

            <label style={styles.adminCheck}>
              <input
                type="checkbox"
                checked={formAdmin.urgente}
                onChange={(e) =>
                  onChangeFormAdmin({ urgente: e.target.checked })
                }
              />
              Urgente
            </label>

            <label style={styles.adminCheck}>
              <input
                type="checkbox"
                checked={formAdmin.activo}
                onChange={(e) =>
                  onChangeFormAdmin({ activo: e.target.checked })
                }
              />
              Activo
            </label>

            <div style={styles.adminButtonsRow}>
              <button
                type="button"
                style={styles.adminButton}
                onClick={onGuardar}
              >
                Guardar
              </button>

              <button
                type="button"
                style={styles.adminCancelButton}
                onClick={onCancelarEdicion}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    transition: "all 0.25s ease",
    cursor: "pointer",
  },
  cardSelected: {
    outline: "3px solid #c1121f",
    transform: "translateY(-4px)",
  },
  adminDraggableCard: {
    userSelect: "none",
  },
  image: {
    height: "260px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    padding: "22px",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.1))",
  },
  imageTitle: {
    position: "relative",
    color: "white",
    fontSize: "25px",
    fontWeight: 700,
    zIndex: 1,
  },
  content: {
    padding: "26px",
    display: "flex",
    flexDirection: "column",
    minHeight: "210px",
  },
  desc: {
    color: "#555",
    marginBottom: "15px",
    fontSize: "16px",
    lineHeight: 1.5,
  },
  priceBlock: {
    marginBottom: "18px",
    minHeight: "48px",
  },
  price: {
    fontWeight: "bold",
    color: "#c1121f",
    marginBottom: "8px",
    fontSize: "20px",
  },
  specialNote: {
    fontSize: "14px",
    color: "#666",
    minHeight: "18px",
    margin: 0,
  },
  dragHint: {
    fontSize: "12px",
    color: "#666",
    marginTop: "4px",
    marginBottom: "10px",
  },
  selectButton: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#111",
    color: "white",
    padding: "14px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    marginTop: "auto",
  },
  removeButton: {
    backgroundColor: "#c1121f",
  },
  cardControls: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "auto",
  },
  cardQuantityBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
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
  adminEditBox: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  adminInput: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  },
  adminTextarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    width: "100%",
    minHeight: "90px",
    resize: "vertical",
    boxSizing: "border-box",
  },
  adminCheck: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#222",
  },
  adminButtonsRow: {
    display: "flex",
    gap: "10px",
  },
  adminButton: {
    backgroundColor: "#111",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 700,
    marginTop: "14px",
  },
  adminCancelButton: {
    backgroundColor: "#aaa",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 700,
    marginTop: "14px",
  },
};

export default ServicioCard;
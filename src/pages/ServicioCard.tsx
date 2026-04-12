import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import css from "../styles/ServicioCard.module.css";

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

function formatearPrecio(
  precioBase: number | null,
  urgente: boolean,
  t: any
) {
  if (
    urgente &&
    (precioBase === null || precioBase === undefined || precioBase <= 0)
  ) {
    return t.servicioCard.urgentOnly;
  }

  if (precioBase === null || precioBase === undefined) {
    return t.servicioCard.consult;
  }

  return `${t.servicioCard.from} ${precioBase}€`;
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
  const { t } = useLanguage();

  const imagenFallback =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

  return (
    <div
      draggable={draggable && !estaEditando}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`${css.card} ${seleccionado ? css.cardSelected : ""} ${
        esAdmin ? css.adminDraggableCard : ""
      }`}
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
        className={css.image}
        style={{
          backgroundImage: `url(${servicio.imagenUrl || imagenFallback})`,
        }}
      >
        <div className={css.overlay}></div>
        <h3 className={css.imageTitle}>{servicio.nombre}</h3>
      </div>

      <div className={css.content}>
        <p className={css.desc}>{servicio.descripcion}</p>

        <div className={css.priceBlock}>
          <p className={css.price}>
            {formatearPrecio(servicio.precioBase, servicio.urgente, t)}
          </p>

          <p className={css.specialNote}>
            {servicio.nombre.trim().toLowerCase() === "cambio de cerraduras"
              ? t.servicioCard.lockChangeNote
              : "\u00A0"}
          </p>
        </div>

        {esAdmin && !estaEditando && (
          <p className={css.dragHint}>{t.servicioCard.adminDragHint}</p>
        )}

        {!seleccionado ? (
          <button type="button" className={css.selectButton} onClick={onToggle}>
            {t.servicioCard.addToQuote}
          </button>
        ) : (
          <div className={css.cardControls}>
            <div className={css.cardQuantityBox}>
              <button
                type="button"
                className={css.qtyButton}
                onClick={onDisminuir}
              >
                −
              </button>
              <span className={css.qtyValue}>{cantidad}</span>
              <button
                type="button"
                className={css.qtyButton}
                onClick={onAumentar}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={`${css.selectButton} ${css.removeButton}`}
              onClick={onToggle}
            >
              {t.servicioCard.removeFromQuote}
            </button>
          </div>
        )}

        {esAdmin && !estaEditando && (
          <button
            type="button"
            className={css.adminButton}
            onClick={onEmpezarEdicion}
          >
            {t.servicioCard.editService}
          </button>
        )}

        {esAdmin && estaEditando && (
          <div className={css.adminEditBox}>
            <input
              value={formAdmin.nombre}
              onChange={(e) => onChangeFormAdmin({ nombre: e.target.value })}
              className={css.adminInput}
              placeholder={t.servicioCard.placeholders.nombre}
            />

            <textarea
              value={formAdmin.descripcion}
              onChange={(e) =>
                onChangeFormAdmin({ descripcion: e.target.value })
              }
              className={css.adminTextarea}
              placeholder={t.servicioCard.placeholders.descripcion}
            />

            <input
              value={formAdmin.precioBase}
              onChange={(e) =>
                onChangeFormAdmin({ precioBase: e.target.value })
              }
              className={css.adminInput}
              placeholder={t.servicioCard.placeholders.precioBase}
              type="number"
            />

            <input
              value={formAdmin.imagenUrl}
              onChange={(e) =>
                onChangeFormAdmin({ imagenUrl: e.target.value })
              }
              className={css.adminInput}
              placeholder={t.servicioCard.placeholders.imagenUrl}
              type="text"
            />

            <label className={css.adminCheck}>
              <input
                type="checkbox"
                checked={formAdmin.urgente}
                onChange={(e) =>
                  onChangeFormAdmin({ urgente: e.target.checked })
                }
              />
              {t.servicioCard.urgentCheckbox}
            </label>

            <label className={css.adminCheck}>
              <input
                type="checkbox"
                checked={formAdmin.activo}
                onChange={(e) =>
                  onChangeFormAdmin({ activo: e.target.checked })
                }
              />
              {t.servicioCard.activeCheckbox}
            </label>

            <div className={css.adminButtonsRow}>
              <button
                type="button"
                className={css.adminButton}
                onClick={onGuardar}
              >
                {t.servicioCard.save}
              </button>

              <button
                type="button"
                className={css.adminCancelButton}
                onClick={onCancelarEdicion}
              >
                {t.servicioCard.cancel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicioCard;
import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import css from "../styles/ResumenValoracion.module.css";

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
  const { t } = useLanguage();

  if (resumenSeleccionados.length === 0) return null;

  return (
    <section
      key={`${resumenSeleccionados.length}-${totalAproximado}`}
      ref={resumenRef}
      className={css.summarySection}
    >
      <div className={css.summaryBox}>
        <div className={css.selectedList}>
          {resumenSeleccionados.map(
            ({ servicio, cantidad, precioBase, totalServicio }) => (
              <div key={servicio.id} className={css.selectedItem}>
                <div>
                  <span className={css.selectedName}>{servicio.nombre}</span>
                  <div className={css.selectedSubline}>
                    {t.resumenValoracion.quantityLabel}: {cantidad}
                    {servicio.nombre.trim().toLowerCase() ===
                      "cambio de cerraduras" &&
                      ` · ${t.resumenValoracion.lockChangeNote}`}
                    {precioBase <= 0 &&
                      ` · ${t.resumenValoracion.pricePending}`}
                  </div>
                </div>

                <div className={css.quantityControls}>
                  <button
                    type="button"
                    className={css.qtyButton}
                    onClick={() => onDisminuir(servicio.id)}
                  >
                    −
                  </button>
                  <span className={css.qtyValue}>{cantidad}</span>
                  <button
                    type="button"
                    className={css.qtyButton}
                    onClick={() => onAumentar(servicio)}
                  >
                    +
                  </button>
                </div>

                <span className={css.selectedPrice}>{totalServicio} €</span>
              </div>
            )
          )}
        </div>

        <div className={css.totalBox}>
          <span className={css.totalLabel}>
            {t.resumenValoracion.totalLabel}
          </span>
          <span className={css.totalValue}>{totalAproximado} €</span>
        </div>

        <div className={css.warningBox}>{t.resumenValoracion.warningBox}</div>

        <textarea
          placeholder={t.resumenValoracion.extraMessagePlaceholder}
          className={css.textarea}
          value={mensajeExtra}
          onChange={(e) => setMensajeExtra(e.target.value)}
        />

        <div className={css.userBox}>
          <p className={css.userText}>
            <strong>{t.resumenValoracion.userEmail}:</strong>{" "}
            {usuario?.email || t.resumenValoracion.notAvailable}
          </p>
          <p className={css.userText}>
            <strong>{t.resumenValoracion.userPhone}:</strong>{" "}
            {usuario?.telefono || t.resumenValoracion.notAvailable}
          </p>
          <p className={css.userText}>
            <strong>{t.resumenValoracion.userCity}:</strong>{" "}
            {usuario?.municipio || t.resumenValoracion.notAvailable}
          </p>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.emailButton}
            onClick={onEnviarPorCorreo}
          >
            {t.resumenValoracion.emailButton}
          </button>

          <button
            type="button"
            className={css.whatsappButton}
            onClick={onEnviarPorWhatsApp}
          >
            {t.resumenValoracion.whatsappButton}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ResumenValoracion;
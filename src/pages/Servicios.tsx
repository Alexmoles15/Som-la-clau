import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import fondoLlaves from "../assets/fondo-llaves.png";
import pattern from "../styles/patternPage.module.css";
import css from "../styles/Servicios.module.css";
import { getApiUrl } from "../api/api";
import { useLanguage } from "../i18n/LanguageContext";

import type { Servicio, ServicioSeleccionado } from "../types/servicio";
import type { UsuarioLogueado } from "../types/usuario";
import {
  calcularTotalServicio,
  getPrecioBase,
  normalizarListaServicios,
  normalizarSeleccionados,
  normalizarUsuario,
  obtenerServicioPorId,
} from "../utils/servicios";
import ResumenValoracion from "./ResumenValoracion";
import ServicioCard from "./ServicioCard";

const WHATSAPP_DESTINO = "34667572011";

type FeedbackModalState = {
  open: boolean;
  type: "success" | "error" | "info";
  title: string;
  message: string;
};

function Servicios() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const modalTexts = {
    successTitle: t.servicios?.modal?.successTitle ?? "Operació completada",
    errorTitle: t.servicios?.modal?.errorTitle ?? "S'ha produït un error",
    infoTitle: t.servicios?.modal?.infoTitle ?? "Informació",
    close: t.servicios?.modal?.close ?? "Tancar",
    emailSuccess:
      t.servicios?.modal?.emailSuccess ??
      "La valoració s'ha enviat correctament per correu.",
    serviceCreated:
      t.servicios?.modal?.serviceCreated ??
      "El servei s'ha creat correctament.",
    serviceUpdated:
      t.servicios?.modal?.serviceUpdated ??
      "El servei s'ha actualitzat correctament.",
  };

  const [usuario, setUsuario] = useState<UsuarioLogueado | null>(() => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) return null;

    try {
      const parsed = JSON.parse(usuarioGuardado);
      return normalizarUsuario(parsed);
    } catch {
      return null;
    }
  });

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [seleccionados, setSeleccionados] = useState<ServicioSeleccionado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mensajeExtra, setMensajeExtra] = useState("");
  const [draggedServicioId, setDraggedServicioId] = useState<number | null>(
    null
  );

  const [editandoServicioId, setEditandoServicioId] = useState<number | null>(
    null
  );
  const [formAdmin, setFormAdmin] = useState({
    nombre: "",
    descripcion: "",
    precioBase: "",
    urgente: false,
    activo: true,
    imagenUrl: "",
  });

  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    descripcion: "",
    precioBase: "",
    urgente: false,
    activo: true,
    imagenUrl: "",
  });

  const [feedbackModal, setFeedbackModal] = useState<FeedbackModalState>({
    open: false,
    type: "info",
    title: "",
    message: "",
  });

  const resumenRef = useRef<HTMLElement | null>(null);

  const abrirModal = (
    type: "success" | "error" | "info",
    title: string,
    message: string
  ) => {
    setFeedbackModal({
      open: true,
      type,
      title,
      message,
    });
  };

  const cerrarModal = () => {
    setFeedbackModal((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const esAdmin = useMemo(() => {
    const rol = usuario?.rol?.toString().toUpperCase().trim() || "";
    return rol === "ADMIN" || rol === "ROLE_ADMIN" || rol === "ADMINISTRADOR";
  }, [usuario]);

  useEffect(() => {
    const seleccionadosGuardados = sessionStorage.getItem(
      "servicios_seleccionados"
    );
    const mensajeGuardado = sessionStorage.getItem("servicios_mensaje_extra");

    if (seleccionadosGuardados) {
      try {
        const parsed = JSON.parse(seleccionadosGuardados);
        setSeleccionados(normalizarSeleccionados(parsed));
      } catch {
        setSeleccionados([]);
      }
    }

    if (mensajeGuardado) {
      setMensajeExtra(mensajeGuardado);
    }
  }, []);

  useEffect(() => {
    const syncUsuario = () => {
      const usuarioGuardado = localStorage.getItem("usuario");

      if (usuarioGuardado) {
        try {
          const parsed = JSON.parse(usuarioGuardado);
          setUsuario(normalizarUsuario(parsed));
        } catch {
          setUsuario(null);
        }
      } else {
        setUsuario(null);
      }
    };

    window.addEventListener("storage", syncUsuario);
    window.addEventListener("focus", syncUsuario);

    return () => {
      window.removeEventListener("storage", syncUsuario);
      window.removeEventListener("focus", syncUsuario);
    };
  }, []);

  useEffect(() => {
    const cargarServicios = async () => {
      setLoading(true);
      setError("");

      try {
        const url = esAdmin
          ? getApiUrl("/servicios")
          : getApiUrl("/servicios/activos");

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(t.servicios.errors.loadServices);
        }

        const data = await response.json();
        setServicios(normalizarListaServicios(data));
      } catch {
        setError(t.servicios.errors.loadServicesNow);
      } finally {
        setLoading(false);
      }
    };

    cargarServicios();
  }, [
    esAdmin,
    t.servicios.errors.loadServices,
    t.servicios.errors.loadServicesNow,
  ]);

  useEffect(() => {
    sessionStorage.setItem(
      "servicios_seleccionados",
      JSON.stringify(seleccionados)
    );
  }, [seleccionados]);

  useEffect(() => {
    sessionStorage.setItem("servicios_mensaje_extra", mensajeExtra);
  }, [mensajeExtra]);

  useEffect(() => {
    if (servicios.length === 0) return;

    setSeleccionados((prev) =>
      prev.filter((item) =>
        servicios.some(
          (servicio) => Number(servicio.id) === Number(item.servicioId)
        )
      )
    );
  }, [servicios]);

  const estaSeleccionado = (servicioId: number) =>
    seleccionados.some((item) => item.servicioId === servicioId);

  const obtenerCantidad = (servicioId: number) => {
    const item = seleccionados.find((s) => s.servicioId === servicioId);
    return item ? item.cantidad : 0;
  };

  const pedirLoginSiHaceFalta = () => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      sessionStorage.setItem(
        "servicios_seleccionados",
        JSON.stringify(seleccionados)
      );
      sessionStorage.setItem("servicios_mensaje_extra", mensajeExtra);

      navigate("/login", {
        state: { from: "/servicios" },
      });
      return true;
    }

    return false;
  };

  const toggleServicio = (servicio: Servicio) => {
    const existe = seleccionados.some((s) => s.servicioId === servicio.id);

    if (!existe && pedirLoginSiHaceFalta()) return;

    if (existe) {
      setSeleccionados((prev) =>
        prev.filter((s) => s.servicioId !== servicio.id)
      );
      return;
    }

    setSeleccionados((prev) => [
      ...prev,
      { servicioId: servicio.id, cantidad: 1 },
    ]);

    setTimeout(() => {
      resumenRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  const aumentarCantidad = (servicio: Servicio) => {
    const existe = seleccionados.some((s) => s.servicioId === servicio.id);

    if (!existe && pedirLoginSiHaceFalta()) return;

    if (!existe) {
      setSeleccionados((prev) => [
        ...prev,
        { servicioId: servicio.id, cantidad: 1 },
      ]);
      setTimeout(() => {
        resumenRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
      return;
    }

    setSeleccionados((prev) =>
      prev.map((item) =>
        item.servicioId === servicio.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const disminuirCantidad = (servicioId: number) => {
    setSeleccionados((prev) =>
      prev
        .map((item) =>
          item.servicioId === servicioId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const resumenSeleccionados = useMemo(() => {
    return seleccionados
      .map((item) => {
        const servicio = obtenerServicioPorId(servicios, item.servicioId);
        if (!servicio) return null;

        const cantidad = Number(item.cantidad) || 0;
        const precioBase = getPrecioBase(servicio);
        const totalServicio = calcularTotalServicio(servicio, cantidad);

        return {
          servicio,
          cantidad,
          precioBase,
          totalServicio,
        };
      })
      .filter(
        (
          item
        ): item is {
          servicio: Servicio;
          cantidad: number;
          precioBase: number;
          totalServicio: number;
        } => item !== null
      );
  }, [seleccionados, servicios]);

  const totalAproximado = resumenSeleccionados.reduce(
    (total, item) => total + item.totalServicio,
    0
  );

  const mensajeValoracion = useMemo(() => {
    const serviciosTexto =
      resumenSeleccionados.length > 0
        ? resumenSeleccionados
            .map(({ servicio, cantidad, precioBase, totalServicio }) => {
              if (
                servicio.nombre.trim().toLowerCase() === "cambio de cerraduras"
              ) {
                return `- ${servicio.nombre}: ${cantidad} ${t.servicios.quoteMessage.doorsSuffix} = ${totalServicio}€ (${t.servicios.quoteMessage.firstDoorAt} ${precioBase}€, ${t.servicios.quoteMessage.nextDoorsAt} 45€)`;
              }

              return `- ${servicio.nombre}: ${cantidad} x ${precioBase}€ = ${totalServicio}€`;
            })
            .join("\n")
        : "";

    return `${t.servicios.quoteMessage.greeting}

${t.servicios.quoteMessage.clientData}:
${t.servicios.quoteMessage.name}: ${
      usuario?.nombre || t.servicios.quoteMessage.notAvailable
    } ${usuario?.apellidos || ""}
${t.servicios.quoteMessage.email}: ${
      usuario?.email || t.servicios.quoteMessage.notAvailable
    }
${t.servicios.quoteMessage.phone}: ${
      usuario?.telefono || t.servicios.quoteMessage.notAvailable
    }
${t.servicios.quoteMessage.city}: ${
      usuario?.municipio || t.servicios.quoteMessage.notAvailable
    }
${t.servicios.quoteMessage.address}: ${
      usuario?.direccion || t.servicios.quoteMessage.notAvailable
    }

${t.servicios.quoteMessage.selectedServices}:
${serviciosTexto}

${t.servicios.quoteMessage.totalApprox}: ${totalAproximado}€

${t.servicios.quoteMessage.important}:
${t.servicios.quoteMessage.importantText}

${t.servicios.quoteMessage.additionalInfo}:
${mensajeExtra || t.servicios.quoteMessage.noObservations}`;
  }, [
    resumenSeleccionados,
    usuario,
    mensajeExtra,
    totalAproximado,
    t.servicios.quoteMessage,
  ]);

  const guardarOrdenServicios = async (listaServicios: Servicio[]) => {
    try {
      const payload = listaServicios.map((servicio, index) => ({
        id: servicio.id,
        orden: index + 1,
      }));

      const response = await fetch(getApiUrl("/servicios/reordenar"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const texto = await response.text();
        throw new Error(texto || t.servicios.errors.reorderFailed);
      }

      const data = await response.json();
      setServicios(normalizarListaServicios(data));
    } catch (error) {
      console.error(error);
      abrirModal(
        "error",
        modalTexts.errorTitle,
        error instanceof Error ? error.message : t.servicios.errors.reorderFailed
      );
    }
  };

  const enviarPorCorreo = async () => {
    if (!usuario?.email) {
      navigate("/login", {
        state: { from: "/servicios" },
      });
      return;
    }

    if (resumenSeleccionados.length === 0) {
      abrirModal(
        "info",
        modalTexts.infoTitle,
        t.servicios.alerts.selectAtLeastOneService
      );
      return;
    }

    try {
      const response = await fetch(getApiUrl("/email/presupuesto"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asunto: t.servicios.emailSubject,
          mensaje: mensajeValoracion,
          emailCliente: usuario.email,
        }),
      });

      const texto = await response.text();

      if (!response.ok) {
        throw new Error(texto || t.servicios.errors.emailSendFailed);
      }

      abrirModal(
        "success",
        modalTexts.successTitle,
        texto || modalTexts.emailSuccess
      );
    } catch (error) {
      console.error(error);
      abrirModal(
        "error",
        modalTexts.errorTitle,
        error instanceof Error
          ? error.message
          : t.servicios.errors.emailSendFailed
      );
    }
  };

  const enviarPorWhatsApp = () => {
    if (!usuario?.email) {
      navigate("/login", {
        state: { from: "/servicios" },
      });
      return;
    }

    if (resumenSeleccionados.length === 0) {
      abrirModal(
        "info",
        modalTexts.infoTitle,
        t.servicios.alerts.selectAtLeastOneService
      );
      return;
    }

    const texto = encodeURIComponent(mensajeValoracion);
    window.open(`https://wa.me/${WHATSAPP_DESTINO}?text=${texto}`, "_blank");
  };

  const empezarEdicion = (servicio: Servicio) => {
    setEditandoServicioId(servicio.id);
    setFormAdmin({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precioBase:
        servicio.precioBase === null || servicio.precioBase === undefined
          ? ""
          : String(servicio.precioBase),
      urgente: servicio.urgente,
      activo: servicio.activo,
      imagenUrl: servicio.imagenUrl ?? "",
    });
  };

  const guardarServicio = async (id: number) => {
    if (!formAdmin.nombre.trim()) {
      abrirModal(
        "info",
        modalTexts.infoTitle,
        t.servicios.alerts.nameRequired
      );
      return;
    }

    if (
      formAdmin.precioBase !== "" &&
      Number.isNaN(Number(formAdmin.precioBase))
    ) {
      abrirModal(
        "info",
        modalTexts.infoTitle,
        t.servicios.alerts.invalidBasePrice
      );
      return;
    }

    const servicioActual = servicios.find((s) => s.id === id);

    const payload = {
      nombre: formAdmin.nombre.trim(),
      descripcion: formAdmin.descripcion.trim(),
      precioBase:
        formAdmin.precioBase === "" ? null : Number(formAdmin.precioBase),
      urgente: formAdmin.urgente,
      activo: formAdmin.activo,
      imagenUrl: formAdmin.imagenUrl.trim() || null,
      orden: servicioActual?.orden ?? null,
    };

    try {
      const response = await fetch(getApiUrl(`/servicios/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const texto = await response.text();

      if (!response.ok) {
        throw new Error(texto || t.servicios.errors.updateServiceFailed);
      }

      const actualizadoRaw = texto ? JSON.parse(texto) : payload;
      const actualizado = normalizarListaServicios([actualizadoRaw])[0];

      if (!actualizado) {
        throw new Error(t.servicios.errors.invalidUpdatedService);
      }

      setServicios((prev) => prev.map((s) => (s.id === id ? actualizado : s)));
      setEditandoServicioId(null);

      abrirModal("success", modalTexts.successTitle, modalTexts.serviceUpdated);
    } catch (error) {
      console.error(error);
      abrirModal(
        "error",
        modalTexts.errorTitle,
        error instanceof Error
          ? error.message
          : t.servicios.errors.updateServiceFailed
      );
    }
  };

  const crearServicio = async () => {
    if (!nuevoServicio.nombre.trim()) {
      abrirModal(
        "info",
        modalTexts.infoTitle,
        t.servicios.alerts.nameRequired
      );
      return;
    }

    if (
      nuevoServicio.precioBase !== "" &&
      Number.isNaN(Number(nuevoServicio.precioBase))
    ) {
      abrirModal(
        "info",
        modalTexts.infoTitle,
        t.servicios.alerts.invalidBasePrice
      );
      return;
    }

    const payload = {
      nombre: nuevoServicio.nombre.trim(),
      descripcion: nuevoServicio.descripcion.trim(),
      precioBase:
        nuevoServicio.precioBase === ""
          ? null
          : Number(nuevoServicio.precioBase),
      urgente: nuevoServicio.urgente,
      activo: nuevoServicio.activo,
      imagenUrl: nuevoServicio.imagenUrl.trim() || null,
    };

    try {
      const response = await fetch(getApiUrl("/servicios"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const texto = await response.text();

      if (!response.ok) {
        throw new Error(texto || t.servicios.errors.createServiceFailed);
      }

      const creadoRaw = texto ? JSON.parse(texto) : payload;
      const creado = normalizarListaServicios([creadoRaw])[0];

      if (!creado) {
        throw new Error(t.servicios.errors.invalidCreatedService);
      }

      setServicios((prev) => [...prev, creado]);

      setNuevoServicio({
        nombre: "",
        descripcion: "",
        precioBase: "",
        urgente: false,
        activo: true,
        imagenUrl: "",
      });

      abrirModal("success", modalTexts.successTitle, modalTexts.serviceCreated);
    } catch (error) {
      console.error(error);
      abrirModal(
        "error",
        modalTexts.errorTitle,
        error instanceof Error
          ? error.message
          : t.servicios.errors.createServiceFailed
      );
    }
  };

  const moverServicio = (targetServicioId: number) => {
    if (draggedServicioId === null || draggedServicioId === targetServicioId) {
      return;
    }

    const listaActual = [...servicios];
    const fromIndex = listaActual.findIndex((s) => s.id === draggedServicioId);
    const toIndex = listaActual.findIndex((s) => s.id === targetServicioId);

    if (fromIndex === -1 || toIndex === -1) return;

    const [movido] = listaActual.splice(fromIndex, 1);
    listaActual.splice(toIndex, 0, movido);

    setServicios(listaActual);
    setDraggedServicioId(null);
    guardarOrdenServicios(listaActual);
  };

  return (
    <main className={pattern.page}>
      <div
        className={pattern.pattern}
        style={{ backgroundImage: `url(${fondoLlaves})` }}
      />
      <div className={pattern.softLayer} />
      <div className={pattern.content}>
        <div className={css.container}>
          <section className={css.header}>
            <h1 className={css.title}>{t.servicios.title}</h1>
            <p className={css.subtitle}>{t.servicios.subtitle}</p>
            <p className={css.callText}>
              {t.servicios.callText}{" "}
              <a href="tel:667572011" className={css.phoneLink}>
                667 572 011
              </a>
            </p>
          </section>

          {loading && <p className={css.message}>{t.servicios.loading}</p>}
          {error && <p className={css.error}>{error}</p>}

          {!loading && !error && (
            <>
              <ResumenValoracion
                resumenSeleccionados={resumenSeleccionados}
                totalAproximado={totalAproximado}
                mensajeExtra={mensajeExtra}
                setMensajeExtra={setMensajeExtra}
                usuario={usuario}
                onDisminuir={disminuirCantidad}
                onAumentar={aumentarCantidad}
                onEnviarPorCorreo={enviarPorCorreo}
                onEnviarPorWhatsApp={enviarPorWhatsApp}
                resumenRef={resumenRef}
              />

              <section className={css.grid}>
                {esAdmin && (
                  <div className={`${css.card} ${css.adminCreateCard}`}>
                    <div className={css.content}>
                      <h3 className={css.adminCreateTitle}>
                        {t.servicios.admin.createNewService}
                      </h3>

                      <input
                        className={css.adminInput}
                        placeholder={t.servicios.admin.placeholders.nombre}
                        value={nuevoServicio.nombre}
                        onChange={(e) =>
                          setNuevoServicio({
                            ...nuevoServicio,
                            nombre: e.target.value,
                          })
                        }
                      />

                      <textarea
                        className={css.adminTextarea}
                        placeholder={
                          t.servicios.admin.placeholders.descripcion
                        }
                        value={nuevoServicio.descripcion}
                        onChange={(e) =>
                          setNuevoServicio({
                            ...nuevoServicio,
                            descripcion: e.target.value,
                          })
                        }
                      />

                      <input
                        className={css.adminInput}
                        placeholder={t.servicios.admin.placeholders.precioBase}
                        type="number"
                        value={nuevoServicio.precioBase}
                        onChange={(e) =>
                          setNuevoServicio({
                            ...nuevoServicio,
                            precioBase: e.target.value,
                          })
                        }
                      />

                      <input
                        className={css.adminInput}
                        placeholder={t.servicios.admin.placeholders.imagenUrl}
                        value={nuevoServicio.imagenUrl}
                        onChange={(e) =>
                          setNuevoServicio({
                            ...nuevoServicio,
                            imagenUrl: e.target.value,
                          })
                        }
                      />

                      <label className={css.adminCheck}>
                        <input
                          type="checkbox"
                          checked={nuevoServicio.urgente}
                          onChange={(e) =>
                            setNuevoServicio({
                              ...nuevoServicio,
                              urgente: e.target.checked,
                            })
                          }
                        />
                        {t.servicios.admin.urgent}
                      </label>

                      <label className={css.adminCheck}>
                        <input
                          type="checkbox"
                          checked={nuevoServicio.activo}
                          onChange={(e) =>
                            setNuevoServicio({
                              ...nuevoServicio,
                              activo: e.target.checked,
                            })
                          }
                        />
                        {t.servicios.admin.active}
                      </label>

                      <button
                        type="button"
                        className={css.adminPrimaryButton}
                        onClick={crearServicio}
                      >
                        {t.servicios.admin.createButton}
                      </button>
                    </div>
                  </div>
                )}

                {servicios.map((servicio) => (
                  <ServicioCard
                    key={servicio.id}
                    servicio={servicio}
                    seleccionado={estaSeleccionado(servicio.id)}
                    cantidad={obtenerCantidad(servicio.id)}
                    esAdmin={esAdmin}
                    estaEditando={editandoServicioId === servicio.id}
                    formAdmin={formAdmin}
                    onToggle={() => toggleServicio(servicio)}
                    onAumentar={() => aumentarCantidad(servicio)}
                    onDisminuir={() => disminuirCantidad(servicio.id)}
                    onEmpezarEdicion={() => empezarEdicion(servicio)}
                    onCancelarEdicion={() => setEditandoServicioId(null)}
                    onGuardar={() => guardarServicio(servicio.id)}
                    onChangeFormAdmin={(changes) =>
                      setFormAdmin((prev) => ({ ...prev, ...changes }))
                    }
                    draggable={esAdmin}
                    onDragStart={() => setDraggedServicioId(servicio.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => moverServicio(servicio.id)}
                  />
                ))}
              </section>
            </>
          )}
        </div>
      </div>

      {feedbackModal.open && (
        <div className={css.modalOverlay} onClick={cerrarModal}>
          <div
            className={`${css.modal} ${
              feedbackModal.type === "success"
                ? css.modalSuccess
                : feedbackModal.type === "error"
                ? css.modalError
                : css.modalInfo
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={css.modalHeader}>
              <h3 className={css.modalTitle}>{feedbackModal.title}</h3>
            </div>

            <p className={css.modalMessage}>{feedbackModal.message}</p>

            <div className={css.modalActions}>
              <button
                type="button"
                className={css.modalButton}
                onClick={cerrarModal}
              >
                {modalTexts.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Servicios;
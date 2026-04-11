import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import fondoLlaves from "../assets/fondo-llaves.png";
import pattern from "../styles/patternPage.module.css";
import css from "../styles/Servicios.module.css";
import { getApiUrl } from "../api/api";

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

function Servicios() {
  const navigate = useNavigate();

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [seleccionados, setSeleccionados] = useState<ServicioSeleccionado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mensajeExtra, setMensajeExtra] = useState("");
  const [usuario, setUsuario] = useState<UsuarioLogueado | null>(null);
  const [draggedServicioId, setDraggedServicioId] = useState<number | null>(null);

  const [editandoServicioId, setEditandoServicioId] = useState<number | null>(null);
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

  const resumenRef = useRef<HTMLElement | null>(null);

  const esAdmin = useMemo(() => {
    const rol = usuario?.rol?.toString().toUpperCase().trim() || "";
    return rol === "ADMIN" || rol === "ROLE_ADMIN" || rol === "ADMINISTRADOR";
  }, [usuario]);

  useEffect(() => {
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

    const seleccionadosGuardados = sessionStorage.getItem("servicios_seleccionados");
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
          throw new Error("No se pudieron cargar los servicios");
        }

        const data = await response.json();
        setServicios(normalizarListaServicios(data));
      } catch {
        setError("No se pudieron cargar los servicios en este momento.");
      } finally {
        setLoading(false);
      }
    };

    cargarServicios();
  }, [esAdmin]);

  useEffect(() => {
    sessionStorage.setItem("servicios_seleccionados", JSON.stringify(seleccionados));
  }, [seleccionados]);

  useEffect(() => {
    sessionStorage.setItem("servicios_mensaje_extra", mensajeExtra);
  }, [mensajeExtra]);

  useEffect(() => {
    if (servicios.length === 0) return;

    setSeleccionados((prev) =>
      prev.filter((item) =>
        servicios.some((servicio) => Number(servicio.id) === Number(item.servicioId))
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
      sessionStorage.setItem("servicios_seleccionados", JSON.stringify(seleccionados));
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
      setSeleccionados((prev) => prev.filter((s) => s.servicioId !== servicio.id));
      return;
    }

    setSeleccionados((prev) => [...prev, { servicioId: servicio.id, cantidad: 1 }]);

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
      setSeleccionados((prev) => [...prev, { servicioId: servicio.id, cantidad: 1 }]);
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
              if (servicio.nombre.trim().toLowerCase() === "cambio de cerraduras") {
                return `- ${servicio.nombre}: ${cantidad} puerta(s) = ${totalServicio}€ (1ª a ${precioBase}€, siguientes a 45€)`;
              }

              return `- ${servicio.nombre}: ${cantidad} x ${precioBase}€ = ${totalServicio}€`;
            })
            .join("\n")
        : "";

    return `Hola, solicito una valoración aproximada.

Datos del cliente:
Nombre: ${usuario?.nombre || "No disponible"} ${usuario?.apellidos || ""}
Correo: ${usuario?.email || "No disponible"}
Teléfono: ${usuario?.telefono || "No disponible"}
Municipio: ${usuario?.municipio || "No disponible"}
Dirección: ${usuario?.direccion || "No disponible"}

Servicios seleccionados:
${serviciosTexto}

Total aproximado: ${totalAproximado}€

Importante:
Este importe es orientativo y no es definitivo. Puede variar según la distancia, el desplazamiento, la urgencia y la valoración real del trabajo.

Información adicional:
${mensajeExtra || "Sin observaciones"}`;
  }, [resumenSeleccionados, usuario, mensajeExtra, totalAproximado]);

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
        throw new Error(texto || "No se pudo guardar el nuevo orden");
      }

      const data = await response.json();
      setServicios(normalizarListaServicios(data));
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "No se pudo guardar el nuevo orden");
    }
  };

  const enviarPorCorreo = async () => {
    if (!usuario?.email) {
      alert("Debes iniciar sesión para enviar la valoración.");
      navigate("/login", {
        state: { from: "/servicios" },
      });
      return;
    }

    if (resumenSeleccionados.length === 0) {
      alert("Selecciona al menos un servicio.");
      return;
    }

    try {
      const response = await fetch(getApiUrl("/email/presupuesto"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asunto: "Solicitud de valoración aproximada",
          mensaje: mensajeValoracion,
          emailCliente: usuario.email,
        }),
      });

      const texto = await response.text();

      if (!response.ok) {
        throw new Error(texto);
      }

      alert(texto);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar el correo.");
    }
  };

  const enviarPorWhatsApp = () => {
    if (!usuario?.email) {
      alert("Debes iniciar sesión para enviar la valoración.");
      navigate("/login", {
        state: { from: "/servicios" },
      });
      return;
    }

    if (resumenSeleccionados.length === 0) {
      alert("Selecciona al menos un servicio.");
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
      alert("El nombre es obligatorio");
      return;
    }

    if (formAdmin.precioBase !== "" && Number.isNaN(Number(formAdmin.precioBase))) {
      alert("El precio base no es válido");
      return;
    }

    const servicioActual = servicios.find((s) => s.id === id);

    const payload = {
      nombre: formAdmin.nombre.trim(),
      descripcion: formAdmin.descripcion.trim(),
      precioBase: formAdmin.precioBase === "" ? null : Number(formAdmin.precioBase),
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
        throw new Error(texto || "Error al actualizar servicio");
      }

      const actualizadoRaw = texto ? JSON.parse(texto) : payload;
      const actualizado = normalizarListaServicios([actualizadoRaw])[0];

      if (!actualizado) {
        throw new Error("Servicio actualizado inválido");
      }

      setServicios((prev) => prev.map((s) => (s.id === id ? actualizado : s)));
      setEditandoServicioId(null);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "No se pudo actualizar el servicio.");
    }
  };

  const crearServicio = async () => {
    if (!nuevoServicio.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    if (nuevoServicio.precioBase !== "" && Number.isNaN(Number(nuevoServicio.precioBase))) {
      alert("El precio base no es válido");
      return;
    }

    const payload = {
      nombre: nuevoServicio.nombre.trim(),
      descripcion: nuevoServicio.descripcion.trim(),
      precioBase: nuevoServicio.precioBase === "" ? null : Number(nuevoServicio.precioBase),
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
        throw new Error(texto || "Error al crear servicio");
      }

      const creadoRaw = texto ? JSON.parse(texto) : payload;
      const creado = normalizarListaServicios([creadoRaw])[0];

      if (!creado) {
        throw new Error("Servicio creado inválido");
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
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "No se pudo crear el servicio.");
    }
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
            <h1 className={css.title}>Els nostres serveis</h1>
            <p className={css.subtitle}>
              Selecciona los servicios que necesitas y obtén una valoración aproximada.
            </p>
            <p className={css.callText}>
              Consulta inmediata al{" "}
              <a href="tel:667572011" className={css.phoneLink}>
                667 572 011
              </a>
            </p>
          </section>

          {loading && <p className={css.message}>Cargando servicios...</p>}
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
                      <h3 className={css.adminCreateTitle}>Crear nuevo servicio</h3>

                      <input
                        className={css.adminInput}
                        placeholder="Nombre"
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
                        placeholder="Descripción"
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
                        placeholder="Precio base"
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
                        placeholder="URL de la imagen"
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
                        Urgente
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
                        Activo
                      </label>

                      <button
                        type="button"
                        className={css.adminButton}
                        onClick={crearServicio}
                      >
                        Crear servicio
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
                    onDragOver={(e) => {
                      if (!esAdmin) return;
                      e.preventDefault();
                    }}
                    onDrop={async () => {
                      if (!esAdmin || draggedServicioId === null) return;

                      const draggedId = draggedServicioId;
                      const targetId = servicio.id;

                      if (draggedId === targetId) return;

                      const listaReordenada = (() => {
                        const copia = [...servicios];
                        const fromIndex = copia.findIndex((s) => s.id === draggedId);
                        const toIndex = copia.findIndex((s) => s.id === targetId);

                        if (fromIndex === -1 || toIndex === -1) return copia;

                        const [movido] = copia.splice(fromIndex, 1);
                        copia.splice(toIndex, 0, movido);

                        return copia.map((item, index) => ({
                          ...item,
                          orden: index + 1,
                        }));
                      })();

                      setServicios(listaReordenada);
                      setDraggedServicioId(null);
                      await guardarOrdenServicios(listaReordenada);
                    }}
                  />
                ))}
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Servicios;
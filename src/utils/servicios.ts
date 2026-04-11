import type { Servicio, ServicioSeleccionado } from "../types/servicio";
import type { UsuarioLogueado } from "../types/usuario";

export function normalizarServicio(raw: any): Servicio | null {
  if (!raw || typeof raw !== "object") return null;

  const id = Number(raw.id);
  if (!Number.isFinite(id)) return null;

  let precioBase: number | null = null;

  const precioRaw =
    raw.precioBase ??
    raw.precio_base ??
    raw.precio ??
    raw.basePrice ??
    raw.importeBase;

  if (precioRaw !== null && precioRaw !== undefined && precioRaw !== "") {
    const precioNumero = Number(precioRaw);
    precioBase = Number.isFinite(precioNumero) ? precioNumero : null;
  }

  const ordenRaw = raw.orden;

  return {
    id,
    activo: Boolean(raw.activo),
    descripcion: String(raw.descripcion ?? ""),
    nombre: String(raw.nombre ?? ""),
    precioBase,
    urgente: Boolean(raw.urgente),
    imagenUrl:
      raw.imagenUrl ?? raw.imagen_url ?? raw.imagen ?? raw.urlImagen ?? null,
    orden:
      ordenRaw === null || ordenRaw === undefined || ordenRaw === ""
        ? null
        : Number(ordenRaw),
  };
}

export function normalizarListaServicios(data: any): Servicio[] {
  if (!Array.isArray(data)) return [];
  return data
    .map((item) => normalizarServicio(item))
    .filter((item): item is Servicio => item !== null);
}

export function getPrecioBase(servicio: Servicio) {
  if (servicio.precioBase === null || servicio.precioBase === undefined) {
    return 0;
  }

  const precio = Number(servicio.precioBase);
  return Number.isFinite(precio) ? precio : 0;
}

export function calcularTotalServicio(servicio: Servicio, cantidad: number) {
  if (cantidad <= 0) return 0;

  const precioBase = getPrecioBase(servicio);

  if (servicio.nombre.trim().toLowerCase() === "cambio de cerraduras") {
    if (cantidad === 1) return precioBase;
    return precioBase + (cantidad - 1) * 45;
  }

  return precioBase * cantidad;
}

export function obtenerServicioPorId(
  servicios: Servicio[],
  servicioId: number
) {
  return servicios.find((s) => Number(s.id) === Number(servicioId)) || null;
}

export function normalizarUsuario(raw: any): UsuarioLogueado | null {
  if (!raw || typeof raw !== "object") return null;

  let rol = raw.rol ?? raw.role ?? "";

  if (Array.isArray(raw.roles) && raw.roles.length > 0) {
    const primerRol = raw.roles[0];
    rol =
      typeof primerRol === "string"
        ? primerRol
        : primerRol?.nombre ?? primerRol?.name ?? rol;
  }

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
      raw.poblacion ??
      raw.ciudad ??
      raw.city ??
      raw.localidad ??
      raw.pueblo ??
      "",
    rol,
  };
}

export function normalizarSeleccionados(data: any): ServicioSeleccionado[] {
  if (!Array.isArray(data)) return [];

  return data
    .map((item) => {
      const servicioId = Number(item?.servicioId);
      const cantidad = Number(item?.cantidad);

      if (!Number.isFinite(servicioId) || !Number.isFinite(cantidad)) {
        return null;
      }

      if (cantidad <= 0) return null;

      return {
        servicioId,
        cantidad,
      };
    })
    .filter((item): item is ServicioSeleccionado => item !== null);
}

export function formatearPrecio(precioBase: number | null, urgente: boolean) {
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
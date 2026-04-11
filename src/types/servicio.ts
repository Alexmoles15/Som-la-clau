export type Servicio = {
  id: number;
  activo: boolean;
  descripcion: string;
  nombre: string;
  precioBase: number | null;
  urgente: boolean;
  imagenUrl?: string | null;
  orden?: number | null;
};

export type ServicioSeleccionado = {
  servicioId: number;
  cantidad: number;
};
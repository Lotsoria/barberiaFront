import { Time } from '@angular/common';

export interface CitasInterface {
  id?: string;
  fechaReservacion?: Date;
  horaReservacion?: Time;
  estado?: boolean;
  cliente_id?: number;
  cliente?: string;
  servicio_id?: number;
  descripcion?: string;
  precio?: number;
}

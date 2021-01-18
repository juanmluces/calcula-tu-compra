import { Product } from "./product";

export interface Lista {
  id: number,
  titulo: string,
  fecha: string,
  fk_usuario: number,
  productos?: Product[]
}

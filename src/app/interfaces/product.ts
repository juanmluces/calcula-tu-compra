export interface Product {
  id: number,
  marca: string,
  nombre: string,
  imagen: string,
  precio: number,
  descripcion: string,
  fk_categoria: number,
  cantidad?: number
}

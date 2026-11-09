// Catálogo de productos y tiendas de Merca Fácil.
// Los datos vienen de data/base_datos_supermercados.json (precios de ejemplo en COP).
// Para editar un precio, cámbialo en ese archivo. "null" significa que la tienda no tiene ese producto.

import baseDatos from './base_datos_supermercados.json'

export type TiendaId = string

export type Tienda = {
  id: TiendaId
  nombre: string
}

export type Producto = {
  id: string
  nombre: string
  unidad: string
  categoria: string
  canastaFamiliar: boolean
  // Precio por tienda: el de la marca más barata disponible, o null si no lo vende.
  precios: Record<TiendaId, number | null>
}

type MarcaJson = { id_referencia: string; marca: string; precios: Record<string, number | null> }
type ProductoJson = { id_producto: string; nombre: string; presentacion: string; marcas: MarcaJson[] }
type CategoriaJson = { id_categoria: string; nombre: string; productos: ProductoJson[] }
type BaseDatosJson = { supermercados: string[]; categorias: CategoriaJson[] }

const datos = baseDatos as BaseDatosJson

// Categorías que se marcan como "Canasta familiar" (alimentos de primera necesidad).
const CATEGORIAS_CANASTA_FAMILIAR = [
  'Granos y cereales',
  'Lácteos y derivados',
  'Carnes, pollo y pescados',
  'Frutas',
  'Verduras y hortalizas',
  'Despensa y productos básicos',
]

const NOMBRES_TIENDAS: Record<string, string> = { Exito: 'Éxito' }

export const TIENDAS: Tienda[] = datos.supermercados.map((id) => ({
  id,
  nombre: NOMBRES_TIENDAS[id] ?? id,
}))

// Toma el precio más bajo entre las marcas de cada tienda.
function precioMasBajo(marcas: MarcaJson[], tiendaId: TiendaId): number | null {
  const disponibles = marcas
    .map((marca) => marca.precios[tiendaId])
    .filter((precio): precio is number => typeof precio === 'number')
  return disponibles.length > 0 ? Math.min(...disponibles) : null
}

export const PRODUCTOS: Producto[] = datos.categorias
  .flatMap((categoria) =>
    categoria.productos.map((producto) => ({
      id: producto.id_producto,
      nombre: producto.nombre,
      unidad: producto.presentacion,
      categoria: categoria.nombre,
      canastaFamiliar: CATEGORIAS_CANASTA_FAMILIAR.includes(categoria.nombre),
      precios: Object.fromEntries(
        TIENDAS.map((tienda) => [tienda.id, precioMasBajo(producto.marcas, tienda.id)]),
      ),
    })),
  )
  // Si ninguna tienda tiene precio para el producto, no se muestra en el catálogo.
  .filter((producto) => Object.values(producto.precios).some((precio) => precio !== null))

export const PRODUCTOS_POR_ID: Record<string, Producto> = Object.fromEntries(
  PRODUCTOS.map((producto) => [producto.id, producto]),
)

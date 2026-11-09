// Catálogo de productos y tiendas de Merca Fácil.
// Precios de ejemplo en pesos colombianos (COP). Para editar un precio,
// cambia el número en la columna de la tienda correspondiente.

export type TiendaId = 'mercado-central' | 'super-barrio' | 'plaza-express'

export type Tienda = {
  id: TiendaId
  nombre: string
}

export type Producto = {
  id: string
  nombre: string
  unidad: string
  canastaFamiliar: boolean
  precios: Record<TiendaId, number>
}

// Las tres tiendas, en el mismo orden de las columnas de precios.
export const TIENDAS: Tienda[] = [
  { id: 'mercado-central', nombre: 'Mercado Central' },
  { id: 'super-barrio', nombre: 'Súper Barrio' },
  { id: 'plaza-express', nombre: 'Plaza Express' },
]

// Producto | Unidad | canastaFamiliar | Mercado Central | Súper Barrio | Plaza Express
type Fila = [string, string, boolean, number, number, number]

const FILAS: Fila[] = [
  ['Arroz blanco', '1 kg', true, 4800, 5200, 5000],
  ['Huevos', 'docena', true, 9000, 9600, 9300],
  ['Aceite de girasol', '1 L', true, 12800, 12200, 13400],
  ['Fríjol rojo', '500 g', true, 6700, 7200, 7000],
  ['Lentejas', '500 g', true, 3700, 4000, 3900],
  ['Panela', '500 g', true, 3100, 3400, 3300],
  ['Papa pastusa', '1 kg', true, 2900, 3300, 3100],
  ['Plátano verde', 'unidad', true, 1100, 1300, 1200],
  ['Leche entera', '1 L', true, 4600, 4400, 4900],
  ['Sal', '500 g', true, 1800, 1700, 2000],
  ['Azúcar', '1 kg', true, 4700, 5000, 4900],
  ['Harina de maíz', '500 g', true, 3500, 3800, 3700],
  ['Cebolla cabezona', '1 kg', true, 3400, 3700, 3600],
  ['Tomate chonto', '1 kg', true, 4000, 4300, 4100],
  ['Pechuga de pollo', '1 kg', true, 18200, 16900, 17600],
  ['Zanahoria', '1 kg', true, 2700, 3000, 2900],
  ['Pasta espagueti', '250 g', false, 2600, 2500, 2300],
  ['Yuca', '1 kg', false, 2500, 2800, 2700],
  ['Queso campesino', '500 g', false, 14500, 13800, 15200],
  ['Mantequilla', '250 g', false, 7900, 7500, 7200],
  ['Atún en lata', '160 g', false, 5900, 5600, 5200],
  ['Café molido', '250 g', false, 9800, 9400, 8900],
  ['Chocolate de mesa', '500 g', false, 10500, 9900, 9600],
  ['Galletas de paquete', 'paquete x6', false, 5200, 4900, 4500],
  ['Papas fritas de paquete', 'paquete', false, 3300, 3100, 2800],
  ['Gaseosa', '1.5 L', false, 5800, 5500, 5100],
  ['Jugo en caja', '1 L', false, 4900, 4600, 4300],
  ['Salchichas', 'paquete x8', false, 8400, 7900, 8100],
  ['Mayonesa', '400 g', false, 7200, 6800, 6500],
  ['Ajo', 'cabeza', false, 700, 800, 600],
]

// Convierte un nombre en un identificador simple, por ejemplo "Fríjol rojo" -> "frijol-rojo".
function crearId(nombre: string) {
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const PRODUCTOS: Producto[] = FILAS.map(
  ([nombre, unidad, canastaFamiliar, central, barrio, express]) => ({
    id: crearId(nombre),
    nombre,
    unidad,
    canastaFamiliar,
    precios: {
      'mercado-central': central,
      'super-barrio': barrio,
      'plaza-express': express,
    },
  }),
)

export const PRODUCTOS_POR_ID: Record<string, Producto> = Object.fromEntries(
  PRODUCTOS.map((producto) => [producto.id, producto]),
)

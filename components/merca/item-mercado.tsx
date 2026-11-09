import { Minus, Plus, Trash2 } from 'lucide-react'
import { PRODUCTOS_POR_ID } from '@/data/productos'
import type { ItemLista } from '@/lib/calculos'
import { EtiquetaCanasta } from './etiqueta-canasta'

type Props = {
  item: ItemLista
  onCambiarCantidad: (productoId: string, cambio: number) => void
  onQuitar: (productoId: string) => void
}

// Un producto de la lista con su unidad, cantidad (+ / −) y botón para quitarlo.
export function ItemMercado({ item, onCambiarCantidad, onQuitar }: Props) {
  const producto = PRODUCTOS_POR_ID[item.productoId]
  if (!producto) return null

  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-extrabold leading-tight">{producto.nombre}</p>
          <p className="text-muted-foreground">Unidad: {producto.unidad}</p>
          {producto.canastaFamiliar && <EtiquetaCanasta />}
        </div>
        <button
          type="button"
          onClick={() => onQuitar(producto.id)}
          className="flex shrink-0 items-center gap-1 rounded-xl px-2 py-2 font-bold text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="size-5" aria-hidden="true" />
          Quitar
          <span className="sr-only"> {producto.nombre}</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">Cantidad</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onCambiarCantidad(producto.id, -1)}
            disabled={item.cantidad <= 1}
            aria-label={`Quitar una unidad de ${producto.nombre}`}
            className="flex size-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/70 disabled:opacity-40"
          >
            <Minus className="size-6" aria-hidden="true" />
          </button>
          <output aria-live="polite" className="min-w-10 text-center text-2xl font-extrabold">
            {item.cantidad}
          </output>
          <button
            type="button"
            onClick={() => onCambiarCantidad(producto.id, 1)}
            aria-label={`Agregar una unidad de ${producto.nombre}`}
            className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  )
}

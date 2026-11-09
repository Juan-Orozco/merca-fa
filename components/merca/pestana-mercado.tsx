import { ArrowRight, ShoppingBasket } from 'lucide-react'
import type { ItemLista } from '@/lib/calculos'
import { BuscadorProductos } from './buscador-productos'
import { ItemMercado } from './item-mercado'
import { CampoPresupuesto } from './campo-presupuesto'

type Props = {
  items: ItemLista[]
  idsEnLista: Set<string>
  presupuesto: number | null
  onPresupuesto: (valor: number | null) => void
  onAgregar: (productoId: string) => void
  onCambiarCantidad: (productoId: string, cambio: number) => void
  onQuitar: (productoId: string) => void
  onVerResultado: () => void
}

// Pestaña 1: buscador, lista de productos y presupuesto.
export function PestanaMercado({
  items,
  idsEnLista,
  presupuesto,
  onPresupuesto,
  onAgregar,
  onCambiarCantidad,
  onQuitar,
  onVerResultado,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <CampoPresupuesto valor={presupuesto} onCambiar={onPresupuesto} />

      <section aria-labelledby="titulo-agregar" className="flex flex-col gap-2">
        <h2 id="titulo-agregar" className="text-xl font-extrabold">
          Agrega productos
        </h2>
        <BuscadorProductos idsEnLista={idsEnLista} onAgregar={onAgregar} />
      </section>

      <section aria-labelledby="titulo-lista" className="flex flex-col gap-3">
        <h2 id="titulo-lista" className="text-xl font-extrabold">
          Mi lista {items.length > 0 && <span className="text-muted-foreground">({items.length})</span>}
        </h2>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-input bg-card p-6 text-center">
            <ShoppingBasket className="size-10 text-muted-foreground" aria-hidden="true" />
            <p className="text-lg font-bold">Tu lista está vacía</p>
            <p className="text-muted-foreground">Busca un producto arriba para empezar.</p>
          </div>
        ) : (
          <>
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <ItemMercado
                  key={item.productoId}
                  item={item}
                  onCambiarCantidad={onCambiarCantidad}
                  onQuitar={onQuitar}
                />
              ))}
            </ul>
            <button
              type="button"
              onClick={onVerResultado}
              className="mt-2 flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-extrabold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver dónde me sale más barato
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </section>
    </div>
  )
}

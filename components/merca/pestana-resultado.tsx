import { PiggyBank, ShoppingCart, Trophy } from 'lucide-react'
import type { TotalTienda } from '@/lib/calculos'
import { formatearPesos } from '@/lib/formato'

type Props = {
  ranking: TotalTienda[]
  hayProductos: boolean
  cantidadProductos: number
  onIrAMercado: () => void
}

// Pestaña 2: la tienda más barata y el ranking de las demás.
export function PestanaResultado({ ranking, hayProductos, cantidadProductos, onIrAMercado }: Props) {
  if (!hayProductos) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-input bg-card p-8 text-center">
        <ShoppingCart className="size-12 text-muted-foreground" aria-hidden="true" />
        <p className="text-xl font-extrabold text-balance">
          Agrega productos a tu mercado para ver dónde te sale más economico
        </p>
        <button
          type="button"
          onClick={onIrAMercado}
          className="h-14 rounded-2xl bg-primary px-6 text-lg font-extrabold text-primary-foreground hover:opacity-90"
        >
          Ir a Mi mercado
        </button>
      </div>
    )
  }

  const [ganadora, ...demas] = ranking
  const masCara = ranking[ranking.length - 1]
  const ahorro = masCara.total - ganadora.total

  return (
    <div className="flex flex-col gap-6">
      <section
        aria-labelledby="titulo-ganadora"
        className="flex flex-col gap-4 rounded-3xl bg-card p-5 shadow-md ring-2 ring-primary"
      >
        <div className="flex items-center gap-2 text-primary">
          <Trophy className="size-6" aria-hidden="true" />
          <h2 id="titulo-ganadora" className="text-lg font-extrabold">
            Aquí te sale más barato
          </h2>
        </div>
        <div>
          <p className="text-3xl font-extrabold leading-tight">{ganadora.tienda.nombre}</p>
          <p className="text-muted-foreground">
            Total de tu mercado ({cantidadProductos} {cantidadProductos === 1 ? 'producto' : 'productos'})
          </p>
          <p className="mt-1 text-5xl font-extrabold tracking-tight text-primary">
            {formatearPesos(ganadora.total)}
          </p>
        </div>
        <p className="flex items-center gap-3 rounded-2xl bg-secondary p-4 text-lg font-bold text-secondary-foreground">
          <PiggyBank className="size-8 shrink-0" aria-hidden="true" />
          {ahorro > 0 ? (
            <span>
              Ahorras {formatearPesos(ahorro)} frente a {masCara.tienda.nombre}
            </span>
          ) : (
            <span>Tu mercado cuesta lo mismo en todas las tiendas</span>
          )}
        </p>
      </section>

      <section aria-labelledby="titulo-ranking" className="flex flex-col gap-3">
        <h2 id="titulo-ranking" className="text-xl font-extrabold">
          Las demás tiendas
        </h2>
        <ol className="flex flex-col gap-3">
          {demas.map((fila, indice) => (
            <li
              key={fila.tienda.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-muted text-lg font-extrabold">
                  {indice + 2}
                </span>
                <div>
                  <p className="text-lg font-extrabold leading-tight">{fila.tienda.nombre}</p>
                  <p className="text-muted-foreground">
                    {fila.total > ganadora.total
                      ? `${formatearPesos(fila.total - ganadora.total)} más`
                      : 'Mismo precio'}
                  </p>
                </div>
              </div>
              <p className="text-xl font-extrabold">{formatearPesos(fila.total)}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

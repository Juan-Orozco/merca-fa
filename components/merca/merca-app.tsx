'use client'

import { useMemo, useState } from 'react'
import { calcularRanking, sugerirRecetas, type ItemLista } from '@/lib/calculos'
import { Encabezado } from './encabezado'
import { NavegacionPestanas, type Pestana } from './navegacion-pestanas'
import { EstadoPresupuesto } from './estado-presupuesto'
import { PestanaMercado } from './pestana-mercado'
import { PestanaResultado } from './pestana-resultado'
import { PestanaRecetas } from './pestana-recetas'

// Componente principal: guarda la lista y el presupuesto, y recalcula todo al instante.
export function MercaApp() {
  const [pestana, setPestana] = useState<Pestana>('mercado')
  const [items, setItems] = useState<ItemLista[]>([])
  const [presupuesto, setPresupuesto] = useState<number | null>(null)
  // Ingredientes que el usuario agregó desde una receta (para mostrar el botón "−").
  const [agregadosDesdeReceta, setAgregadosDesdeReceta] = useState<Set<string>>(new Set())

  const idsEnLista = useMemo(() => new Set(items.map((item) => item.productoId)), [items])
  const ranking = useMemo(() => calcularRanking(items), [items])
  const recetas = useMemo(() => sugerirRecetas(idsEnLista), [idsEnLista])
  const tiendaMasBarata = ranking[0]

  function agregarProducto(productoId: string) {
    setItems((actuales) =>
      actuales.some((item) => item.productoId === productoId)
        ? actuales
        : [...actuales, { productoId, cantidad: 1 }],
    )
  }

  function cambiarCantidad(productoId: string, cambio: number) {
    setItems((actuales) =>
      actuales.map((item) =>
        item.productoId === productoId
          ? { ...item, cantidad: Math.max(1, item.cantidad + cambio) }
          : item,
      ),
    )
  }

  function quitarProducto(productoId: string) {
    setItems((actuales) => actuales.filter((item) => item.productoId !== productoId))
    setAgregadosDesdeReceta((actuales) => {
      const nuevos = new Set(actuales)
      nuevos.delete(productoId)
      return nuevos
    })
  }

  function agregarDesdeReceta(productoId: string) {
    agregarProducto(productoId)
    setAgregadosDesdeReceta((actuales) => new Set(actuales).add(productoId))
  }

  const hayProductos = items.length > 0

  return (
    <div className="min-h-dvh pb-28 md:pb-10">
      <Encabezado />
      <NavegacionPestanas
        pestanaActiva={pestana}
        onCambiar={setPestana}
        cantidadProductos={items.length}
        cantidadRecetas={recetas.length}
      />

      <main className="mx-auto w-full max-w-2xl px-4 pt-5">
        {pestana !== 'recetas' && (
          <EstadoPresupuesto
            hayProductos={hayProductos}
            presupuesto={presupuesto}
            totalMasBarato={tiendaMasBarata.total}
            nombreTienda={tiendaMasBarata.tienda.nombre}
          />
        )}

        {pestana === 'mercado' && (
          <PestanaMercado
            items={items}
            idsEnLista={idsEnLista}
            presupuesto={presupuesto}
            onPresupuesto={setPresupuesto}
            onAgregar={agregarProducto}
            onCambiarCantidad={cambiarCantidad}
            onQuitar={quitarProducto}
            onVerResultado={() => setPestana('resultado')}
          />
        )}

        {pestana === 'resultado' && (
          <PestanaResultado
            ranking={ranking}
            hayProductos={hayProductos}
            cantidadProductos={items.reduce((suma, item) => suma + item.cantidad, 0)}
            onIrAMercado={() => setPestana('mercado')}
          />
        )}

        {pestana === 'recetas' && (
          <PestanaRecetas
            recetas={recetas}
            hayProductos={hayProductos}
            tiendaMasBarata={tiendaMasBarata.tienda}
            agregadosDesdeReceta={agregadosDesdeReceta}
            onAgregar={agregarDesdeReceta}
            onQuitar={quitarProducto}
            onIrAMercado={() => setPestana('mercado')}
          />
        )}
      </main>
    </div>
  )
}

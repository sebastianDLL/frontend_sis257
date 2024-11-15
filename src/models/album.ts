import type { Interprete } from "./interprete"

export interface Album {
    id: number
    nombre:string
    fechaLanzamiento: string
    interprete:Interprete
  }
  
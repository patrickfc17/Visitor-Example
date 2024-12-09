import { Visitor } from './Visitor'

export interface Host {
  accept(visitor: Visitor): any
}

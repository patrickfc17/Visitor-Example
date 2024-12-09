import { Host } from '../Contracts/Host'
import { Visitor } from '../Contracts/Visitor'
import { calloc } from '../lib/memory'
import { FileSystem, Privilegio } from './FileSystem'

export class File extends FileSystem implements Host {
  private tamanhoEmBytes: number
  private inicioPagina: number
  private fimPagina: number

  constructor(
    nome: string,
    private _conteudo: string,
    privilegio: Privilegio = 'all'
  ) {
    super(nome, privilegio)

    this.tamanhoEmBytes = this._conteudo.length

    const { start, end } = calloc(1, this.tamanhoEmBytes)
    this.inicioPagina = start
    this.fimPagina = end
  }

  accept(visitor: Visitor) {
    visitor.visitFile(this)
  }

  get tamanho() {
    return `${(this.tamanhoEmBytes / (1024)).toFixed(2)} KB`
  }
}

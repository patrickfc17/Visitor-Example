import { Host } from '../Contracts/Host'
import { Visitor } from '../Contracts/Visitor'
import { File } from './File'
import { FileSystem, Privilegio } from './FileSystem'

export class Directory extends FileSystem implements Host {
  constructor(
    nome: string,
    private _files: File[],
    privilegio: Privilegio = 'all'
  ) {
    super(nome, privilegio)
  }

  accept(visitor: Visitor) {
    visitor.visitDir(this)
  }

  get files() {
    return this._files.filter(file => !file.oculto)
  }

  get tamanho() {
    return this._files
      .map(file => parseFloat(file.tamanho))
      .reduce((acc, cur) => (acc += cur))
      .toFixed(2)
  }
}

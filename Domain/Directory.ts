import { Host } from '../Contracts/Host'
import { Visitor } from '../Contracts/Visitor'
import { File } from './File'
import { FileSystem } from './FileSystem'
import { Privilegios, TiposPrivilegio } from './types/privilegios'

export class Directory<
    TPrivilegio extends TiposPrivilegio = 'all',
    TUsersAccepted extends string = never,
    TUsersMaxLength extends number = any,
  >
  extends FileSystem<TPrivilegio, TUsersAccepted, TUsersMaxLength>
  implements Host
{
  private _files: File<TPrivilegio, TUsersAccepted, TUsersMaxLength>[]

  constructor(
    nome: string,
    files: File<TPrivilegio, TUsersAccepted, TUsersMaxLength>[],
    privilegio: Privilegios<TPrivilegio, TUsersAccepted, TUsersMaxLength>,
  ) {
    super(nome, privilegio)

    this._files = files
  }

  accept(visitor: Visitor) {
    visitor.visitDir(this)
  }

  get files() {
    return this._files.filter(file => !file.getOculto())
  }

  get tamanho() {
    return this._files
      .map(file => parseFloat(file.tamanho))
      .reduce((acc, cur) => (acc += cur))
      .toFixed(2)
  }
}

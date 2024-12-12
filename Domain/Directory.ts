import { Host } from '../Contracts/Host'
import { DirInfo, Visitor } from '../Contracts/Visitor'
import { File } from './File'
import { FileSystem } from './FileSystem'
import { Privilegios, TiposPrivilegio } from './types/privilegios'

export class Directory<
    TPrivilegio extends TiposPrivilegio = 'all',
    TUsersAccepted extends string = never,
    TUsersMaxLength extends number = any
  >
  extends FileSystem<TPrivilegio, TUsersAccepted, TUsersMaxLength>
  implements Host
{
  private _files: File<TPrivilegio, TUsersAccepted, TUsersMaxLength>[]

  constructor(
    nome: string,
    files: File<TPrivilegio, TUsersAccepted, TUsersMaxLength>[],
    privilegios: Privilegios<TPrivilegio, TUsersAccepted, TUsersMaxLength>
  ) {
    super(nome, privilegios)

    this._files = files
  }

  accept(visitor: Visitor): DirInfo {
    return visitor.visitDir(this)
  }

  get files() {
    return this._files.filter(file => !file.getOculto())
  }

  get tamanho() {
    return parseFloat(
      this._files
        .map(file => file.tamanho)
        .reduce((acc, cur) => (acc += cur))
        .toFixed(2)
    )
  }
}

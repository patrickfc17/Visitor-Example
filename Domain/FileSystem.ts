import { Getter } from 'tslombok'
import type {
  Privilegio,
  Privilegios,
  TiposPrivilegio,
} from './types/privilegios'

export abstract class FileSystem<
  TPrivilegio extends TiposPrivilegio = Privilegio<'all'>,
  TUsersAccepted extends string = never,
  TUsersMaxLength extends number = never
> {
  @Getter
  private oculto: boolean

  @Getter
  private nome: string

  @Getter
  private privilegios: Privilegios<TPrivilegio, TUsersAccepted, TUsersMaxLength>

  constructor(
    nome: string,
    privilegios: Privilegios<TPrivilegio, TUsersAccepted, TUsersMaxLength>
  ) {
    this.nome = nome
    this.privilegios = privilegios
    this.oculto = this.nome.startsWith('.') ? true : false
  }

  renomear(nome: string): void {
    this.nome = nome
    this.oculto = this.nome.startsWith('.') ? true : false
  }

  abstract get tamanho(): number
}

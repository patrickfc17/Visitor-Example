import { Getter } from 'tslombok'
import { Host } from '../Contracts/Host'
import { FileSystemInfo, Visitor } from '../Contracts/Visitor'
import { calloc } from '../lib/memory'
import { FileSystem } from './FileSystem'
import { Privilegios, TiposPrivilegio } from './types/privilegios'

export class File<
    TPrivilegio extends TiposPrivilegio = any,
    TUsersAccepted extends string = never,
    TUsersMaxLength extends number = any
  >
  extends FileSystem<TPrivilegio, TUsersAccepted, TUsersMaxLength>
  implements Host
{
  private tamanhoEmBytes: number

  @Getter
  private readonly inicioPagina: number

  @Getter
  private readonly fimPagina: number

  @Getter
  private conteudo: string

  constructor(
    nome: string,
    conteudo: string,
    privilegios: Privilegios<TPrivilegio, TUsersAccepted, TUsersMaxLength>
  ) {
    super(nome, privilegios)

    this.conteudo = conteudo
    this.tamanhoEmBytes = this.conteudo.length

    const { start, end } = calloc(1, this.tamanhoEmBytes)
    this.inicioPagina = start
    this.fimPagina = end
  }

  accept(visitor: Visitor): FileSystemInfo | null {
    return visitor.visitFile(this)
  }

  get tamanho() {
    return parseFloat((this.tamanhoEmBytes / 1024).toFixed(2))
  }
}

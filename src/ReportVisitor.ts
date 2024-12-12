import { DirInfo, FileSystemInfo, Visitor } from '../Contracts/Visitor'
import { Directory } from '../Domain/Directory'
import { File } from '../Domain/File'
import {
  Privilegios,
  PrivilegiosUserList,
  TiposPrivilegio,
} from '../Domain/types/privilegios'

export class ReportVisitor implements Visitor {
  private static _instance: ReportVisitor | null

  private constructor() {}

  static instance(): ReportVisitor {
    if (!ReportVisitor._instance) ReportVisitor._instance = new ReportVisitor()

    return ReportVisitor._instance
  }

  visitFile(
    file: File<TiposPrivilegio, string, number>
  ): FileSystemInfo | null {
    if (file.getOculto()) return null

    return {
      name: file.getNome(),
      sizeInKB: file.tamanho,
    }
  }

  visitDir(directory: Directory<TiposPrivilegio, string, number>): DirInfo {
    const privilegios: Privilegios<TiposPrivilegio, string, number> =
      directory.getPrivilegios()
    let privilegiosList: PrivilegiosUserList<string, number>

    if (typeof privilegios === 'object') privilegiosList = privilegios
    else privilegiosList = [privilegios]

    return {
      name: directory.getNome(),
      sizeInKB: directory.tamanho,
      permissions: privilegiosList,
      files: directory.files
        .map(file => file.accept(this))
        .filter(file => !!file),
    }
  }
}

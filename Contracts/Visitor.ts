import { Directory } from '../Domain/Directory'
import { File } from '../Domain/File'
import { PrivilegiosUserList, TiposPrivilegio } from '../Domain/types/privilegios'

export type FileSystemInfo = {
  name: string
  sizeInKB: number
}

export type DirInfo = FileSystemInfo & {
  permissions: PrivilegiosUserList<string, number>
  files: FileSystemInfo[]
}

export interface Visitor {
  visitFile(file: File<TiposPrivilegio, string, number>): FileSystemInfo | null

  visitDir(directory: Directory<TiposPrivilegio, string, number>): DirInfo
}

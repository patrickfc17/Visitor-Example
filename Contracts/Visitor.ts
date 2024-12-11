import { Directory } from '../Domain/Directory'
import { File } from '../Domain/File'
import { TiposPrivilegio } from '../Domain/FileSystem'

export interface Visitor {
  visitFile(file: File<TiposPrivilegio, string, number>): void

  visitDir(directory: Directory<TiposPrivilegio, string, number>): void
}

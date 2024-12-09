import { Directory } from '../Domain/Directory'
import { File } from '../Domain/File'

export interface Visitor {
  visitFile(file: File): void

  visitDir(directory: Directory): void
}

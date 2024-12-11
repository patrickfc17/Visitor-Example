import { Visitor } from '../Contracts/Visitor'
import { Directory } from '../Domain/Directory'
import { File } from '../Domain/File'

export class ReportVisitor implements Visitor {
  private static _instance: ReportVisitor | null

  private constructor() {}

  static instance(): ReportVisitor {
    if (!ReportVisitor._instance) ReportVisitor._instance = new ReportVisitor()

    return ReportVisitor._instance
  }

  visitFile(file: File): void {
    if (file.getOculto()) return

    console.log(`\t- ${file.getNome()} ${file.tamanho}`)
  }

  visitDir(directory: Directory): void {
    console.log(`-- ${directory.getNome()} ${directory.tamanho} KB`)

    directory.files.forEach(file => file.accept(this))
  }
}

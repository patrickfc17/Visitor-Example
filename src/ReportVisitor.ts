import { Visitor } from '../Contracts/Visitor'
import { Directory } from '../Domain/Directory'
import { File } from '../Domain/File'

export class ReportVisitor implements Visitor {
  private static instance: ReportVisitor | null

  private constructor() {}

  static getInstance(): ReportVisitor {
    if (!ReportVisitor.instance)
      ReportVisitor.instance = new ReportVisitor()

    return ReportVisitor.instance
  }

  visitFile(file: File): void {
    if (file.oculto) return

    console.log(`\t- ${file.nome} ${file.tamanho}`)
  }

  visitDir(directory: Directory): void {
    console.log(`-- ${directory.nome} ${directory.tamanho} KB`)

    directory.files.forEach(file => file.accept(this))
  }
}

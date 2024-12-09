import { randomUUIDv7 } from 'bun'
import { Directory } from './Domain/Directory'
import { File } from './Domain/File'
import { ReportVisitor } from './src/ReportVisitor'

const dirs = [
  new Directory('/', [new File('.', ''), new File('..', '')]),
  new Directory('/home', [new File('.zshrc', '')]),
  new Directory('/Documents', [
    new File('atestado.pdf', randomUUIDv7()),
    new File('identidade.docx', randomUUIDv7()),
  ]),
  new Directory('/IFNMG', [
    new File('cronograma.pdf', randomUUIDv7()),
  ]),
  new Directory('/Arquitetura-de-Software', [
    new File('atividade-02-09-2024.pdf', randomUUIDv7()),
  ]),
]

dirs.forEach(dir => dir.accept(ReportVisitor.getInstance()))

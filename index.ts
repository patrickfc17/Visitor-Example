import { randomUUIDv7 } from 'bun'
import { Directory } from './Domain/Directory'
import { File } from './Domain/File'
import { Privilegio, privilegiosEnum } from './Domain/types/privilegios'
import { ReportVisitor } from './src/ReportVisitor'

const users = ['patrickfc17', 'geozinha', 'caetano777'] as const

const dirs = [
  new Directory<Privilegio<'root'>>(
    '/',
    [
      new File('.', '', privilegiosEnum.root),
      new File('..', '', privilegiosEnum.root),
    ],
    privilegiosEnum.root
  ),
  new Directory(
    '/home',
    [new File('.zshrc', '', privilegiosEnum.all)],
    privilegiosEnum.all
  ),
  new Directory(
    '/Documents',
    [
      new File('atestado.pdf', randomUUIDv7(), privilegiosEnum.all),
      
      
    ],
    privilegiosEnum.all
  ),
  new Directory(
    '/IFNMG',
    [new File('cronograma.pdf', randomUUIDv7(), privilegiosEnum.all)],
    privilegiosEnum.all
  ),
  new Directory<Privilegio<'user'>, (typeof users)[number], 3>(
    '/Arquitetura-de-Software',
    [
      new File<Privilegio<'user'>, (typeof users)[number]>(
        'atividade-02-09-2024.pdf',
        randomUUIDv7(),
        users
      ),
    ],
    users
  ),
]

dirs.forEach(dir => dir.accept(ReportVisitor.instance()))

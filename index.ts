import { randomUUIDv7 } from 'bun'
import { Directory } from './Domain/Directory'
import { File } from './Domain/File'
import { Privilegio, privilegiosEnum } from './Domain/types/privilegios'
import { ReportVisitor } from './src/ReportVisitor'
import { GithubAPI, GithubUser } from './src/api/github'

let users: Awaited<Promise<GithubUser[]>> | string[] =
  await new GithubAPI().getUsers()

users = users.map(user => user.login)

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
      new File('identidade.docx', randomUUIDv7(), privilegiosEnum.all),
    ],
    privilegiosEnum.all
  ),
  new Directory(
    '/IFNMG',
    [new File('cronograma.pdf', randomUUIDv7(), privilegiosEnum.all)],
    privilegiosEnum.all
  ),
  new Directory<Privilegio<'user'>, string>(
    '/Arquitetura-de-Software',
    [
      new File<Privilegio<'user'>, string>(
        'atividade-02-09-2024.pdf',
        randomUUIDv7(),
        users
      ),
    ],
    users
  ),
]

dirs.forEach(dir => dir.accept(ReportVisitor.instance()))

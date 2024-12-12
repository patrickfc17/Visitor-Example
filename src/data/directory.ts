import { randomUUIDv7 } from 'bun'
import { Directory } from '../../Domain/Directory'
import { File } from '../../Domain/File'
import {
  Privilegio,
  privilegiosEnum,
  TiposPrivilegio,
} from '../../Domain/types/privilegios'
import { GithubAPI, GithubUser } from '../api/Github'

export const getDirectories = async (): Promise<
  Directory<TiposPrivilegio, string, number>[]
> => {
  let users: Awaited<Promise<GithubUser[]>> | string[] =
    await new GithubAPI().getUsers()

  users = users.map(user => user.login)

  return [
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
  ] satisfies Directory<TiposPrivilegio, string, number>[]
}

const privilegios = {
  all: '*',
  root: 'root',
  user: 'user:',
} as const

type Privilegio = keyof typeof privilegios

abstract class FileSystem {
  private _oculto = false

  constructor(private _nome: string, private _privilegio: Privilegio = 'all') {
    this._oculto = this._nome.startsWith('.') ? true : false
  }

  get nome() {
    return this._nome
  }

  get oculto() {
    return this._oculto
  }

  get privilegio() {
    return this._privilegio
  }

  renomear(nome: string): void {
    this._nome = nome
  }
}

export { FileSystem, privilegios }
export type { Privilegio }

const privilegiosEnum = {
  all: 'all',
  root: 'root',
  user: 'user',
} as const

type TiposPrivilegio = keyof typeof privilegiosEnum

type Privilegio<T extends TiposPrivilegio> = keyof Pick<
  typeof privilegiosEnum,
  T
>

type Privilegios<
  T extends TiposPrivilegio,
  U extends string = never,
  L extends number = any,
> =
  T extends Privilegio<'user'>
    ? (U[] & { length: L }) | (readonly U[] & { length: L })
    : T

export { privilegiosEnum }
export type { Privilegio, Privilegios, TiposPrivilegio }

export type Page = {
  start: number
  end: number
}

export const calloc = (qtd: number, size: number): Page => {
  const start = Math.floor(Math.random() * (10000 - 1) + 1)
  return { start, end: start + size * qtd }
}

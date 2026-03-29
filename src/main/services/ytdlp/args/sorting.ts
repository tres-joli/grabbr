export function formatSortArgs(preferences: FormatSortMap) {
  const args: string[] = []

  for (const [field, val] of Object.entries(preferences)) {
    if (val === undefined) continue

    if (typeof val === 'boolean') {
      args.push(val ? field : `!${field}`)
      continue
    }

    args.push(`${field}:${val}`)
  }

  return ['--format-sort', args.join(',')]
}

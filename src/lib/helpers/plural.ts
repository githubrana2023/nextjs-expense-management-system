export const pluralize = (count: number, singular: string, plural?: string): string => {
    const word = count === 0 ? `No ${singular.toLocaleLowerCase()} yet! ` : count === 1 ? singular : plural ?? `${singular}s`
    return count > 0 ?`${count} ${word}`: word
}
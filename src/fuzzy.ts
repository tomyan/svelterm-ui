/**
 * Fuzzy matching for the picker: subsequence match with a simple score —
 * consecutive runs and word starts rank higher, earlier matches win ties.
 */

export interface FuzzyResult<T> {
    item: T
    score: number
    /** Indices into the label that matched (for highlighting). */
    positions: number[]
}

/** Score a query against a label; null when it's not a subsequence. */
export function fuzzyMatch(query: string, label: string): { score: number; positions: number[] } | null {
    if (query === '') return { score: 0, positions: [] }
    const q = query.toLowerCase()
    const l = label.toLowerCase()
    const positions: number[] = []
    let score = 0
    let li = 0
    for (let qi = 0; qi < q.length; qi++) {
        const found = l.indexOf(q[qi], li)
        if (found === -1) return null
        const consecutive = positions.length > 0 && found === positions[positions.length - 1] + 1
        const wordStart = found === 0 || l[found - 1] === ' ' || l[found - 1] === '-' || l[found - 1] === '_'
        score += 1 + (consecutive ? 2 : 0) + (wordStart ? 3 : 0) - found * 0.01
        positions.push(found)
        li = found + 1
    }
    return { score, positions }
}

/** Filter and rank items by fuzzy match on their label. */
export function fuzzyFilter<T>(query: string, items: T[], labelOf: (item: T) => string): FuzzyResult<T>[] {
    const results: FuzzyResult<T>[] = []
    for (const item of items) {
        const match = fuzzyMatch(query, labelOf(item))
        if (match) results.push({ item, score: match.score, positions: match.positions })
    }
    return results.sort((a, b) => b.score - a.score)
}

/** Move a selection index by delta, wrapping around the ends. */
export function moveSelection(count: number, index: number, delta: number): number {
    if (count <= 0) return -1
    return ((index + delta) % count + count) % count
}

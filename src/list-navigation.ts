import { moveSelection } from './fuzzy.js'

/**
 * Headless keyboard navigation for selectable lists — shared by List,
 * FuzzyPicker, and Tabs. Returns the new index for movement keys,
 * 'activate' for Enter, or null when the key isn't handled (or the
 * list is empty). Movement follows the orientation only, so a picker's
 * text caret keeps the other axis (e.g. ArrowLeft in a vertical list).
 */
export function navigateList(
    key: string, length: number, current: number,
    orientation: 'vertical' | 'horizontal' = 'vertical',
): number | 'activate' | null {
    if (length === 0) return null
    const next = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'
    const prev = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
    switch (key) {
        case next: return moveSelection(length, current, 1)
        case prev: return moveSelection(length, current, -1)
        case 'Home': return 0
        case 'End': return length - 1
        case 'Enter': return 'activate'
        default: return null
    }
}

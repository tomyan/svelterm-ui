import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { navigateList } from '../src/list-navigation.js'

const src = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../src')

function styleOf(component: string): string {
    const source = readFileSync(path.join(src, component), 'utf8')
    const match = source.match(/<style>([\s\S]*?)<\/style>/)
    assert.ok(match, `${component} has a <style> block`)
    return match![1]
}

// Slice 3 of DESIGN-tokens.md: shared selection tokens + headless nav.
describe('List and FuzzyPicker consume selection tokens', () => {

    for (const component of ['List.svelte', 'FuzzyPicker.svelte']) {
        it(`${component} selected row reads the selection pair`, () => {
            // Given
            const css = styleOf(component)

            // Then
            assert.match(css,
                /background:\s*var\(--svt-selection-background,\s*light-dark\(#d5e5f5,\s*#26415c\)\)/)
        })

        it(`${component} empty state reads --svt-muted`, () => {
            const css = styleOf(component)
            assert.match(css,
                /color:\s*var\(--svt-muted,\s*light-dark\(#888888,\s*#666666\)\)/)
        })

        it(`${component} has no hardcoded themable values`, () => {
            const css = styleOf(component)
            const stripped = css.replace(/var\(--svt-[a-z-]+,[^)]*\)+/g, 'var()')
            assert.doesNotMatch(stripped,
                /cyan|light-dark|#[0-9a-fA-F]{3,8}/)
        })
    }

    it('FuzzyPicker frame reads border tokens', () => {
        const css = styleOf('FuzzyPicker.svelte')
        assert.match(css, /border:\s*var\(--svt-border-family,\s*rounded\)/)
        assert.match(css,
            /border-color:\s*var\(--svt-border,\s*light-dark\(#999999,\s*#555555\)\)/)
    })
})

describe('navigateList — headless keyboard navigation', () => {

    it('arrows move with wraparound', () => {
        // Given / When / Then
        assert.equal(navigateList('ArrowDown', 3, 0), 1)
        assert.equal(navigateList('ArrowDown', 3, 2), 0)
        assert.equal(navigateList('ArrowUp', 3, 0), 2)
    })

    it('Home and End jump to the extremes', () => {
        assert.equal(navigateList('Home', 5, 3), 0)
        assert.equal(navigateList('End', 5, 1), 4)
    })

    it('Enter activates and other keys are ignored', () => {
        assert.equal(navigateList('Enter', 3, 1), 'activate')
        assert.equal(navigateList('x', 3, 1), null)
    })

    it('an empty list never navigates', () => {
        assert.equal(navigateList('ArrowDown', 0, 0), null)
        assert.equal(navigateList('Enter', 0, 0), null)
    })
})

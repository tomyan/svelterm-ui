import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const src = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../src')

function read(component: string): string {
    return readFileSync(path.join(src, component), 'utf8')
}

function styleOf(component: string): string {
    const match = read(component).match(/<style>([\s\S]*?)<\/style>/)
    assert.ok(match, `${component} has a <style> block`)
    return match![1]
}

// Slice 4 of DESIGN-tokens.md: Tabs themes from tokens and gains
// arrow-key navigation via the shared headless helper.
describe('Tabs consumes design tokens', () => {

    it('active tab reads --svt-accent, inactive reads --svt-muted', () => {
        // Given
        const css = styleOf('Tabs.svelte')

        // Then
        assert.match(css, /color:\s*var\(--svt-accent,\s*cyan\)/)
        assert.match(css, /color:\s*var\(--svt-muted,\s*light-dark\(#666666,\s*#999999\)\)/)
    })

    it('focus highlight reads --svt-focus with yellow default', () => {
        const css = styleOf('Tabs.svelte')
        assert.match(css, /color:\s*var\(--svt-focus,\s*yellow\)/)
    })

    it('panel frame reads border tokens', () => {
        const css = styleOf('Tabs.svelte')
        assert.match(css, /border:\s*var\(--svt-border-family,\s*single\)/)
        assert.match(css,
            /border-color:\s*var\(--svt-border,\s*light-dark\(#bbbbbb,\s*#444444\)\)/)
    })

    it('no themable value remains hardcoded outside a var() fallback', () => {
        const css = styleOf('Tabs.svelte')
        const stripped = css.replace(/var\(--svt-[a-z-]+,[^)]*\)+/g, 'var()')
        assert.doesNotMatch(stripped, /cyan|yellow|light-dark|#[0-9a-fA-F]{3,8}/)
    })

    it('the tab bar navigates horizontally via navigateList', () => {
        // Given: the component wires keydown through the shared helper
        const source = read('Tabs.svelte')

        // Then
        assert.match(source, /navigateList\(/)
        assert.match(source, /'horizontal'/)
    })
})

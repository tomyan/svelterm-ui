import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const src = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../src')

function styleOf(component: string): string {
    const source = readFileSync(path.join(src, component), 'utf8')
    const match = source.match(/<style>([\s\S]*?)<\/style>/)
    assert.ok(match, `${component} has a <style> block`)
    return match![1]
}

// Slice 5 of DESIGN-tokens.md: the colour-picker family themes its
// frame and labels from tokens (in both display modes — tokens are
// plain CSS vars); swatch/gradient colours are content and stay.
describe('colour components consume design tokens', () => {

    it('ColorPicker active mode button reads --svt-accent', () => {
        // Given
        const css = styleOf('ColorPicker.svelte')

        // Then
        assert.match(css, /background:\s*var\(--svt-accent,\s*#48cae4\)/)
        assert.match(css, /border-color:\s*var\(--svt-accent,\s*#48cae4\)/)
    })

    it('ColorPicker and ColorInput frames read --svt-border', () => {
        assert.match(styleOf('ColorPicker.svelte'),
            /border:\s*1px solid var\(--svt-border,\s*#555\)/)
        assert.match(styleOf('ColorInput.svelte'),
            /border:\s*1px solid var\(--svt-border,\s*#555\)/)
    })

    it('ColorPalette label reads --svt-muted', () => {
        assert.match(styleOf('ColorPalette.svelte'),
            /color:\s*var\(--svt-muted,\s*#888\)/)
    })
})

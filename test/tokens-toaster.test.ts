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

// Slice 2 of DESIGN-tokens.md: Toaster's kinds theme via status tokens.
describe('Toaster consumes design tokens', () => {

    it('info kind reads --svt-accent', () => {
        // Given
        const css = styleOf('Toaster.svelte')

        // Then
        assert.match(css, /border-color:\s*var\(--svt-accent,\s*cyan\)/)
    })

    it('success and error kinds read status tokens', () => {
        const css = styleOf('Toaster.svelte')
        assert.match(css, /var\(--svt-success,\s*green\)/)
        assert.match(css, /var\(--svt-destructive,\s*red\)/)
    })

    it('surface and frame read background and border-family tokens', () => {
        const css = styleOf('Toaster.svelte')
        assert.match(css,
            /background:\s*var\(--svt-background,\s*light-dark\(#f5f5f0,\s*#1a1d23\)\)/)
        assert.match(css, /border:\s*var\(--svt-border-family,\s*rounded\)/)
    })

    it('no themable value remains hardcoded outside a var() fallback', () => {
        const css = styleOf('Toaster.svelte')
        const withoutVarFallbacks = css.replace(/var\(--svt-[a-z-]+,[^)]*\)+/g, 'var()')
        assert.doesNotMatch(withoutVarFallbacks,
            /cyan|green|red|light-dark|#[0-9a-fA-F]{3,8}/)
    })
})

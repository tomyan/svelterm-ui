import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const src = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../src')

/** The component's raw <style> block — the token contract lives there. */
function styleOf(component: string): string {
    const source = readFileSync(path.join(src, component), 'utf8')
    const match = source.match(/<style>([\s\S]*?)<\/style>/)
    assert.ok(match, `${component} has a <style> block`)
    return match![1]
}

// Slice 1 of DESIGN-tokens.md: Dialog consumes the semantic token set
// via var(--svt-*, <default>) so it themes from :root while keeping
// its current zero-config appearance as the fallback.
describe('Dialog consumes design tokens', () => {

    it('accent colour reads --svt-accent with cyan default', () => {
        // Given
        const css = styleOf('Dialog.svelte')

        // Then: border and title use the accent token
        assert.match(css, /border-color:\s*var\(--svt-accent,\s*cyan\)/)
        assert.match(css, /color:\s*var\(--svt-accent,\s*cyan\)/)
    })

    it('surface reads --svt-background with the light-dark default', () => {
        const css = styleOf('Dialog.svelte')
        assert.match(css,
            /background:\s*var\(--svt-background,\s*light-dark\(#f5f5f0,\s*#1a1d23\)\)/)
    })

    it('border family reads --svt-border-family with double default', () => {
        const css = styleOf('Dialog.svelte')
        assert.match(css, /border:\s*var\(--svt-border-family,\s*double\)/)
    })

    it('no themable value remains hardcoded outside a var() fallback', () => {
        // Given
        const css = styleOf('Dialog.svelte')

        // Then: strip var() fallbacks; no colour keywords/hex/light-dark left
        const withoutVarFallbacks = css.replace(/var\(--svt-[a-z-]+,[^)]*\)+/g, 'var()')
        assert.doesNotMatch(withoutVarFallbacks, /cyan|light-dark|#[0-9a-fA-F]{3,8}/)
    })
})

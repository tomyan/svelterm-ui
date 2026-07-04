import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// @ts-ignore — fork compiler, types not needed for a smoke test
import { compile } from 'svelte/compiler'

const src = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../src')

describe('components compile for the terminal renderer', () => {
    for (const file of readdirSync(src).filter(f => f.endsWith('.svelte'))) {
        it(`${file} compiles with customRenderer`, () => {
            const source = readFileSync(path.join(src, file), 'utf8')
            const result = compile(source, {
                generate: 'client',
                css: 'external',
                filename: file,
                experimental: { customRenderer: '@svelterm/core' },
            } as any)
            assert.ok(result.js.code.length > 0)
        })
    }
})

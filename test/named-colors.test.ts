/**
 * Named CSS colours organised by palette group.
 */
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { NAMED_COLORS, GROUPS, getGroup, type NamedColor } from '../src/named-colors.js'

describe('named colors data', () => {

    it('contains all 148 CSS named colours', () => {
        // 147 unique + grey/gray variants = 148 names
        assert.ok(NAMED_COLORS.length >= 147, `expected >= 147, got ${NAMED_COLORS.length}`)
    })

    it('each entry has name, hex, and group', () => {
        for (const color of NAMED_COLORS) {
            assert.ok(color.name, 'name required')
            assert.match(color.hex, /^#[0-9a-f]{6}$/, `${color.name} hex invalid: ${color.hex}`)
            assert.ok(color.group, `${color.name} missing group`)
        }
    })

    it('no duplicate names', () => {
        const names = NAMED_COLORS.map(c => c.name)
        const unique = new Set(names)
        assert.equal(unique.size, names.length, 'duplicate names found')
    })

    it('every colour belongs to a known group', () => {
        for (const color of NAMED_COLORS) {
            assert.ok((GROUPS as readonly string[]).includes(color.group), `${color.name} has unknown group: ${color.group}`)
        }
    })
})

describe('GROUPS', () => {

    it('has expected palette groups', () => {
        const groups = GROUPS as readonly string[]
        for (const expected of ['reds', 'oranges', 'yellows', 'greens', 'cyans', 'blues', 'purples', 'pinks', 'browns', 'whites', 'grays']) {
            assert.ok(groups.includes(expected), `missing group: ${expected}`)
        }
    })

    it('groups are ordered logically (hue wheel)', () => {
        const redIdx = GROUPS.indexOf('reds')
        const blueIdx = GROUPS.indexOf('blues')
        assert.ok(redIdx < blueIdx, 'reds should come before blues')
    })
})

describe('getGroup', () => {

    it('returns colours for a specific group', () => {
        const reds = getGroup('reds')
        assert.ok(reds.length > 0)
        for (const c of reds) assert.equal(c.group, 'reds')
    })

    it('reds includes red, crimson, darkred', () => {
        const names = getGroup('reds').map(c => c.name)
        assert.ok(names.includes('red'))
        assert.ok(names.includes('crimson'))
        assert.ok(names.includes('darkred'))
    })

    it('blues includes blue, navy, dodgerblue', () => {
        const names = getGroup('blues').map(c => c.name)
        assert.ok(names.includes('blue'))
        assert.ok(names.includes('navy'))
        assert.ok(names.includes('dodgerblue'))
    })

    it('grays includes gray, silver, dimgray', () => {
        const names = getGroup('grays').map(c => c.name)
        assert.ok(names.includes('gray'))
        assert.ok(names.includes('silver'))
        assert.ok(names.includes('dimgray'))
    })

    it('returns empty array for unknown group', () => {
        assert.equal(getGroup('nonexistent').length, 0)
    })
})

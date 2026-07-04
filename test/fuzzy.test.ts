import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { fuzzyMatch, fuzzyFilter, moveSelection } from '../src/fuzzy.js'

describe('fuzzyMatch', () => {

    it('matches subsequences case-insensitively', () => {
        assert.ok(fuzzyMatch('fzp', 'FuzzyPicker'))
        assert.equal(fuzzyMatch('xyz', 'FuzzyPicker'), null)
    })

    it('empty query matches everything with zero score', () => {
        assert.deepEqual(fuzzyMatch('', 'anything'), { score: 0, positions: [] })
    })

    it('returns the matched positions for highlighting', () => {
        const match = fuzzyMatch('fp', 'fuzzy picker')
        assert.deepEqual(match?.positions, [0, 6])
    })

    it('ranks consecutive and word-start matches higher', () => {
        const wordStarts = fuzzyMatch('fp', 'fuzzy picker')!
        const scattered = fuzzyMatch('fp', 'baffle up')!
        assert.ok(wordStarts.score > scattered.score)
    })
})

describe('fuzzyFilter', () => {

    it('filters and sorts by score', () => {
        const results = fuzzyFilter('dc', ['docs', 'dialog component', 'nothing'], s => s)
        assert.equal(results.length, 2)
        assert.equal(results[0].item, 'dialog component') // two word starts
    })
})

describe('moveSelection', () => {

    it('wraps in both directions', () => {
        assert.equal(moveSelection(3, 0, 1), 1)
        assert.equal(moveSelection(3, 2, 1), 0)
        assert.equal(moveSelection(3, 0, -1), 2)
    })

    it('returns -1 for empty lists', () => {
        assert.equal(moveSelection(0, 0, 1), -1)
    })
})

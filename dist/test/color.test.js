/**
 * Color conversion utility tests.
 *
 * Reference values verified against browser computed styles
 * and the Color.js library.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseColor, rgbToHsl, hslToRgb, rgbToOklch, oklchToRgb, rgbToOklab, oklabToRgb, formatHex, formatRgb, formatHsl, formatOklch, contrastColor, findNamedColor, } from '../src/color.js';
// --- Parsing ---
describe('parseColor', () => {
    it('parses hex', () => {
        const c = parseColor('#48cae4');
        assert.equal(c.r, 72);
        assert.equal(c.g, 202);
        assert.equal(c.b, 228);
        assert.equal(c.a, 1);
    });
    it('parses hex with alpha', () => {
        const c = parseColor('#ff000080');
        assert.equal(c.r, 255);
        assert.equal(c.g, 0);
        assert.equal(c.b, 0);
        assert.ok(Math.abs(c.a - 0.502) < 0.01);
    });
    it('parses short hex', () => {
        const c = parseColor('#f00');
        assert.equal(c.r, 255);
        assert.equal(c.g, 0);
        assert.equal(c.b, 0);
    });
    it('parses rgb()', () => {
        const c = parseColor('rgb(72 202 228)');
        assert.equal(c.r, 72);
        assert.equal(c.g, 202);
        assert.equal(c.b, 228);
    });
    it('parses rgb() with alpha', () => {
        const c = parseColor('rgb(255 0 0 / 0.5)');
        assert.equal(c.r, 255);
        assert.equal(c.a, 0.5);
    });
    it('parses hsl()', () => {
        const c = parseColor('hsl(0 100% 50%)');
        assert.equal(c.r, 255);
        assert.equal(c.g, 0);
        assert.equal(c.b, 0);
    });
    it('parses oklch()', () => {
        const c = parseColor('oklch(0.7 0.15 180)');
        assert.ok(c.r >= 0 && c.r <= 255);
        assert.ok(c.g >= 0 && c.g <= 255);
        assert.ok(c.b >= 0 && c.b <= 255);
    });
    it('parses named colour', () => {
        const c = parseColor('coral');
        assert.equal(c.r, 255);
        assert.equal(c.g, 127);
        assert.equal(c.b, 80);
    });
    it('parses transparent', () => {
        const c = parseColor('transparent');
        assert.equal(c.a, 0);
    });
});
// --- RGB ↔ HSL ---
describe('rgbToHsl', () => {
    it('pure red', () => {
        const { h, s, l } = rgbToHsl(255, 0, 0);
        assert.equal(h, 0);
        assert.ok(Math.abs(s - 1) < 0.01);
        assert.ok(Math.abs(l - 0.5) < 0.01);
    });
    it('pure green', () => {
        const { h, s, l } = rgbToHsl(0, 255, 0);
        assert.equal(h, 120);
        assert.ok(Math.abs(s - 1) < 0.01);
    });
    it('pure blue', () => {
        const { h, s, l } = rgbToHsl(0, 0, 255);
        assert.equal(h, 240);
    });
    it('white', () => {
        const { h, s, l } = rgbToHsl(255, 255, 255);
        assert.equal(s, 0);
        assert.equal(l, 1);
    });
    it('black', () => {
        const { h, s, l } = rgbToHsl(0, 0, 0);
        assert.equal(l, 0);
    });
    it('mid grey', () => {
        const { s, l } = rgbToHsl(128, 128, 128);
        assert.equal(s, 0);
        assert.ok(Math.abs(l - 0.502) < 0.01);
    });
});
describe('hslToRgb', () => {
    it('pure red round-trips', () => {
        const c = hslToRgb(0, 1, 0.5);
        assert.equal(c.r, 255);
        assert.equal(c.g, 0);
        assert.equal(c.b, 0);
    });
    it('cyan', () => {
        const c = hslToRgb(180, 1, 0.5);
        assert.equal(c.r, 0);
        assert.equal(c.g, 255);
        assert.equal(c.b, 255);
    });
    it('white', () => {
        const c = hslToRgb(0, 0, 1);
        assert.equal(c.r, 255);
        assert.equal(c.g, 255);
        assert.equal(c.b, 255);
    });
});
// --- RGB ↔ OKLCH ---
describe('rgbToOklch', () => {
    it('black has zero lightness', () => {
        const { l, c, h } = rgbToOklch(0, 0, 0);
        assert.ok(Math.abs(l) < 0.01);
        assert.ok(Math.abs(c) < 0.01);
    });
    it('white has full lightness and zero chroma', () => {
        const { l, c } = rgbToOklch(255, 255, 255);
        assert.ok(Math.abs(l - 1) < 0.01);
        assert.ok(Math.abs(c) < 0.01);
    });
    it('red has hue near 29 degrees', () => {
        const { h } = rgbToOklch(255, 0, 0);
        assert.ok(Math.abs(h - 29) < 2, `red hue should be ~29, got ${h}`);
    });
    it('round-trips through oklchToRgb', () => {
        const { l, c, h } = rgbToOklch(72, 202, 228);
        const rgb = oklchToRgb(l, c, h);
        assert.ok(Math.abs(rgb.r - 72) <= 1);
        assert.ok(Math.abs(rgb.g - 202) <= 1);
        assert.ok(Math.abs(rgb.b - 228) <= 1);
    });
});
describe('oklchToRgb', () => {
    it('black', () => {
        const c = oklchToRgb(0, 0, 0);
        assert.equal(c.r, 0);
        assert.equal(c.g, 0);
        assert.equal(c.b, 0);
    });
    it('white', () => {
        const c = oklchToRgb(1, 0, 0);
        assert.equal(c.r, 255);
        assert.equal(c.g, 255);
        assert.equal(c.b, 255);
    });
    it('clamps out-of-gamut values', () => {
        // High chroma at extreme hue may exceed sRGB
        const c = oklchToRgb(0.5, 0.4, 30);
        assert.ok(c.r >= 0 && c.r <= 255);
        assert.ok(c.g >= 0 && c.g <= 255);
        assert.ok(c.b >= 0 && c.b <= 255);
    });
});
// --- RGB ↔ OKLAB ---
describe('rgbToOklab / oklabToRgb', () => {
    it('round-trips', () => {
        const { l, a, b } = rgbToOklab(100, 150, 200);
        const rgb = oklabToRgb(l, a, b);
        assert.ok(Math.abs(rgb.r - 100) <= 1);
        assert.ok(Math.abs(rgb.g - 150) <= 1);
        assert.ok(Math.abs(rgb.b - 200) <= 1);
    });
});
// --- Formatting ---
describe('formatHex', () => {
    it('formats opaque colour', () => {
        assert.equal(formatHex({ r: 72, g: 202, b: 228, a: 1 }), '#48cae4');
    });
    it('includes alpha when < 1', () => {
        assert.equal(formatHex({ r: 255, g: 0, b: 0, a: 0.5 }), '#ff000080');
    });
});
describe('formatRgb', () => {
    it('formats without alpha', () => {
        assert.equal(formatRgb({ r: 72, g: 202, b: 228, a: 1 }), 'rgb(72 202 228)');
    });
    it('includes alpha when < 1', () => {
        assert.equal(formatRgb({ r: 72, g: 202, b: 228, a: 0.5 }), 'rgb(72 202 228 / 0.5)');
    });
});
describe('formatHsl', () => {
    it('formats red', () => {
        const s = formatHsl({ r: 255, g: 0, b: 0, a: 1 });
        assert.match(s, /^hsl\(0 100% 50%\)$/);
    });
});
describe('formatOklch', () => {
    it('formats a colour', () => {
        const s = formatOklch({ r: 72, g: 202, b: 228, a: 1 });
        assert.match(s, /^oklch\([\d.]+ [\d.]+ [\d.]+\)$/);
    });
    it('includes alpha when < 1', () => {
        const s = formatOklch({ r: 72, g: 202, b: 228, a: 0.5 });
        assert.match(s, /\/ 0\.5\)$/);
    });
});
// --- Contrast ---
describe('contrastColor', () => {
    it('returns white for dark backgrounds', () => {
        assert.equal(contrastColor({ r: 0, g: 0, b: 0, a: 1 }), '#ffffff');
    });
    it('returns black for light backgrounds', () => {
        assert.equal(contrastColor({ r: 255, g: 255, b: 255, a: 1 }), '#000000');
    });
    it('returns white for mid-dark', () => {
        assert.equal(contrastColor({ r: 50, g: 50, b: 50, a: 1 }), '#ffffff');
    });
    it('returns black for mid-light', () => {
        assert.equal(contrastColor({ r: 200, g: 200, b: 200, a: 1 }), '#000000');
    });
});
// --- Named colour lookup ---
describe('findNamedColor', () => {
    it('finds exact match', () => {
        assert.equal(findNamedColor({ r: 255, g: 127, b: 80, a: 1 }), 'coral');
    });
    it('returns null for non-named colour', () => {
        assert.equal(findNamedColor({ r: 72, g: 202, b: 228, a: 1 }), null);
    });
    it('finds red', () => {
        assert.equal(findNamedColor({ r: 255, g: 0, b: 0, a: 1 }), 'red');
    });
});
//# sourceMappingURL=color.test.js.map
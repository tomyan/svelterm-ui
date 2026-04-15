/**
 * Colour space conversion utilities.
 *
 * Supports RGB, HSL, OKLCH, OKLAB with parsing, formatting,
 * and bidirectional conversion.
 */

export interface Color {
    r: number  // 0-255
    g: number  // 0-255
    b: number  // 0-255
    a: number  // 0-1
}

// --- Parsing ---

const NAMED_COLORS: Record<string, string> = {
    aliceblue: '#f0f8ff', antiquewhite: '#faebd7', aqua: '#00ffff', aquamarine: '#7fffd4',
    azure: '#f0ffff', beige: '#f5f5dc', bisque: '#ffe4c4', black: '#000000',
    blanchedalmond: '#ffebcd', blue: '#0000ff', blueviolet: '#8a2be2', brown: '#a52a2a',
    burlywood: '#deb887', cadetblue: '#5f9ea0', chartreuse: '#7fff00', chocolate: '#d2691e',
    coral: '#ff7f50', cornflowerblue: '#6495ed', cornsilk: '#fff8dc', crimson: '#dc143c',
    cyan: '#00ffff', darkblue: '#00008b', darkcyan: '#008b8b', darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9', darkgreen: '#006400', darkgrey: '#a9a9a9', darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b', darkolivegreen: '#556b2f', darkorange: '#ff8c00',
    darkorchid: '#9932cc', darkred: '#8b0000', darksalmon: '#e9967a', darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b', darkslategray: '#2f4f4f', darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1', darkviolet: '#9400d3', deeppink: '#ff1493',
    deepskyblue: '#00bfff', dimgray: '#696969', dimgrey: '#696969', dodgerblue: '#1e90ff',
    firebrick: '#b22222', floralwhite: '#fffaf0', forestgreen: '#228b22', fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc', ghostwhite: '#f8f8ff', gold: '#ffd700', goldenrod: '#daa520',
    gray: '#808080', green: '#008000', greenyellow: '#adff2f', grey: '#808080',
    honeydew: '#f0fff0', hotpink: '#ff69b4', indianred: '#cd5c5c', indigo: '#4b0082',
    ivory: '#fffff0', khaki: '#f0e68c', lavender: '#e6e6fa', lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00', lemonchiffon: '#fffacd', lightblue: '#add8e6',
    lightcoral: '#f08080', lightcyan: '#e0ffff', lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3', lightgreen: '#90ee90', lightgrey: '#d3d3d3', lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a', lightseagreen: '#20b2aa', lightskyblue: '#87cefa',
    lightslategray: '#778899', lightslategrey: '#778899', lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0', lime: '#00ff00', limegreen: '#32cd32', linen: '#faf0e6',
    magenta: '#ff00ff', maroon: '#800000', mediumaquamarine: '#66cdaa', mediumblue: '#0000cd',
    mediumorchid: '#ba55d3', mediumpurple: '#9370db', mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee', mediumspringgreen: '#00fa9a', mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585', midnightblue: '#191970', mintcream: '#f5fffa',
    mistyrose: '#ffe4e1', moccasin: '#ffe4b5', navajowhite: '#ffdead', navy: '#000080',
    oldlace: '#fdf5e6', olive: '#808000', olivedrab: '#6b8e23', orange: '#ffa500',
    orangered: '#ff4500', orchid: '#da70d6', palegoldenrod: '#eee8aa', palegreen: '#98fb98',
    paleturquoise: '#afeeee', palevioletred: '#db7093', papayawhip: '#ffefd5',
    peachpuff: '#ffdab9', peru: '#cd853f', pink: '#ffc0cb', plum: '#dda0dd',
    powderblue: '#b0e0e6', purple: '#800080', rebeccapurple: '#663399', red: '#ff0000',
    rosybrown: '#bc8f8f', royalblue: '#4169e1', saddlebrown: '#8b4513', salmon: '#fa8072',
    sandybrown: '#f4a460', seagreen: '#2e8b57', seashell: '#fff5ee', sienna: '#a0522d',
    silver: '#c0c0c0', skyblue: '#87ceeb', slateblue: '#6a5acd', slategray: '#708090',
    slategrey: '#708090', snow: '#fffafa', springgreen: '#00ff7f', steelblue: '#4682b4',
    tan: '#d2b48c', teal: '#008080', thistle: '#d8bfd8', tomato: '#ff6347',
    turquoise: '#40e0d0', violet: '#ee82ee', wheat: '#f5deb3', white: '#ffffff',
    whitesmoke: '#f5f5f5', yellow: '#ffff00', yellowgreen: '#9acd32',
}

// Reverse lookup: hex → name
const HEX_TO_NAME: Record<string, string> = {}
for (const [name, hex] of Object.entries(NAMED_COLORS)) {
    if (!(hex in HEX_TO_NAME)) HEX_TO_NAME[hex] = name
}

export function parseColor(input: string): Color {
    const s = input.trim().toLowerCase()

    if (s === 'transparent') return { r: 0, g: 0, b: 0, a: 0 }

    if (s.startsWith('#')) return parseHex(s)

    const funcMatch = s.match(/^(\w+)\((.+)\)$/)
    if (funcMatch) {
        const [, name, args] = funcMatch
        return parseFunc(name, args)
    }

    if (s in NAMED_COLORS) return parseHex(NAMED_COLORS[s])

    return { r: 0, g: 0, b: 0, a: 1 }
}

function parseHex(hex: string): Color {
    let h = hex.startsWith('#') ? hex.slice(1) : hex
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2]
    if (h.length === 4) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2]+h[3]+h[3]
    return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: h.length >= 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
    }
}

function parseFunc(name: string, args: string): Color {
    const isLegacy = args.includes(',')
    const slashIdx = args.indexOf('/')
    const channelStr = slashIdx >= 0 ? args.substring(0, slashIdx) : args
    const alpha = slashIdx >= 0 ? parseFloat(args.substring(slashIdx + 1).trim()) : 1
    const parts = isLegacy ? channelStr.split(',').map(s => s.trim()) : channelStr.trim().split(/\s+/)

    let rgb: { r: number; g: number; b: number } | null = null

    switch (name) {
        case 'rgb': case 'rgba': {
            const r = pv(parts[0], 255), g = pv(parts[1], 255), b = pv(parts[2], 255)
            if (r != null && g != null && b != null) rgb = { r: clamp(r, 0, 255), g: clamp(g, 0, 255), b: clamp(b, 0, 255) }
            break
        }
        case 'hsl': case 'hsla': {
            const h = parseAngle(parts[0]), s = pp(parts[1]), l = pp(parts[2])
            if (h != null && s != null && l != null) rgb = hslToRgb(h, s, l)
            break
        }
        case 'oklch': {
            const L = pv(parts[0], 1), C = parseFloat(parts[1]), H = parseAngle(parts[2])
            if (L != null && !isNaN(C) && H != null) rgb = oklchToRgb(L, C, H)
            break
        }
        case 'oklab': {
            const L = pv(parts[0], 1), a = parseFloat(parts[1]), b = parseFloat(parts[2])
            if (L != null && !isNaN(a) && !isNaN(b)) rgb = oklabToRgb(L, a, b)
            break
        }
    }

    if (!rgb) return { r: 0, g: 0, b: 0, a: 1 }
    return { ...rgb, a: clamp(alpha, 0, 1) }
}

function pv(s: string | undefined, max: number): number | null {
    if (!s) return null
    s = s.trim()
    if (s.endsWith('%')) return parseFloat(s) / 100 * max
    const v = parseFloat(s)
    return isNaN(v) ? null : v
}

function pp(s: string | undefined): number | null {
    if (!s) return null
    s = s.trim()
    if (s.endsWith('%')) return parseFloat(s) / 100
    const v = parseFloat(s)
    return isNaN(v) ? null : v
}

function parseAngle(s: string | undefined): number | null {
    if (!s) return null
    s = s.trim()
    if (s.endsWith('grad')) return parseFloat(s) * 0.9
    if (s.endsWith('rad')) return parseFloat(s) * 180 / Math.PI
    if (s.endsWith('turn')) return parseFloat(s) * 360
    if (s.endsWith('deg')) return parseFloat(s)
    const v = parseFloat(s)
    return isNaN(v) ? null : v
}

// --- RGB ↔ HSL ---

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    const l = (max + min) / 2
    if (max === min) return { h: 0, s: 0, l }
    const d = max - min
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    let h = 0
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60
    else if (max === g) h = ((b - r) / d + 2) * 60
    else h = ((r - g) / d + 4) * 60
    return { h: Math.round(h), s, l }
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h = ((h % 360) + 360) % 360
    if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v } }
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0
    if (h < 60) { r = c; g = x }
    else if (h < 120) { r = x; g = c }
    else if (h < 180) { g = c; b = x }
    else if (h < 240) { g = x; b = c }
    else if (h < 300) { r = x; b = c }
    else { r = c; b = x }
    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
    }
}

// --- RGB ↔ OKLAB ---

export function rgbToOklab(r: number, g: number, b: number): { l: number; a: number; b: number } {
    // sRGB → linear sRGB
    const lr = srgbToLinear(r / 255)
    const lg = srgbToLinear(g / 255)
    const lb = srgbToLinear(b / 255)

    // Linear sRGB → LMS
    const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
    const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
    const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)

    return {
        l: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    }
}

export function oklabToRgb(L: number, a: number, b: number): { r: number; g: number; b: number } {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b

    const l = l_ * l_ * l_
    const m = m_ * m_ * m_
    const s = s_ * s_ * s_

    const lr =  4.0767416621 * l - 3.3077363322 * m + 0.2309101289 * s
    const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193761 * s
    const lb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

    return {
        r: Math.round(clamp(linearToSrgb(lr), 0, 1) * 255),
        g: Math.round(clamp(linearToSrgb(lg), 0, 1) * 255),
        b: Math.round(clamp(linearToSrgb(lb), 0, 1) * 255),
    }
}

// --- RGB ↔ OKLCH ---

export function rgbToOklch(r: number, g: number, b: number): { l: number; c: number; h: number } {
    const lab = rgbToOklab(r, g, b)
    const c = Math.sqrt(lab.a * lab.a + lab.b * lab.b)
    let h = Math.atan2(lab.b, lab.a) * 180 / Math.PI
    if (h < 0) h += 360
    return { l: lab.l, c, h }
}

export function oklchToRgb(l: number, c: number, h: number): { r: number; g: number; b: number } {
    const a = c * Math.cos(h * Math.PI / 180)
    const b = c * Math.sin(h * Math.PI / 180)
    return oklabToRgb(l, a, b)
}

// --- Gamma ---

function srgbToLinear(v: number): number {
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

function linearToSrgb(v: number): number {
    return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055
}

function clamp(v: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, v))
}

// --- Formatting ---

export function formatHex(c: Color): string {
    const hex = '#' + toHex(c.r) + toHex(c.g) + toHex(c.b)
    if (c.a < 1) return hex + toHex(Math.round(c.a * 255))
    return hex
}

export function formatRgb(c: Color): string {
    if (c.a < 1) return `rgb(${c.r} ${c.g} ${c.b} / ${round(c.a)})`
    return `rgb(${c.r} ${c.g} ${c.b})`
}

export function formatHsl(c: Color): string {
    const { h, s, l } = rgbToHsl(c.r, c.g, c.b)
    const sh = `hsl(${h} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
    if (c.a < 1) return sh + ` / ${round(c.a)})`
    return sh + ')'
}

export function formatOklch(c: Color): string {
    const { l, c: ch, h } = rgbToOklch(c.r, c.g, c.b)
    const s = `oklch(${round(l)} ${round(ch)} ${round(h)}`
    if (c.a < 1) return s + ` / ${round(c.a)})`
    return s + ')'
}

function toHex(n: number): string {
    return Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')
}

function round(n: number, dp = 3): number {
    return Math.round(n * 10 ** dp) / 10 ** dp
}

// --- Contrast ---

export function contrastColor(bg: Color): '#000000' | '#ffffff' {
    // Relative luminance (WCAG formula)
    const luminance = 0.2126 * srgbToLinear(bg.r / 255)
        + 0.7152 * srgbToLinear(bg.g / 255)
        + 0.0722 * srgbToLinear(bg.b / 255)
    return luminance > 0.179 ? '#000000' : '#ffffff'
}

// --- Named colour lookup ---

export function findNamedColor(c: Color): string | null {
    const hex = '#' + toHex(c.r) + toHex(c.g) + toHex(c.b)
    return HEX_TO_NAME[hex] ?? null
}

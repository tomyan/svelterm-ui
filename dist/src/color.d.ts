/**
 * Colour space conversion utilities.
 *
 * Supports RGB, HSL, OKLCH, OKLAB with parsing, formatting,
 * and bidirectional conversion.
 */
export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}
export declare function parseColor(input: string): Color;
export declare function rgbToHsl(r: number, g: number, b: number): {
    h: number;
    s: number;
    l: number;
};
export declare function hslToRgb(h: number, s: number, l: number): {
    r: number;
    g: number;
    b: number;
};
export declare function rgbToOklab(r: number, g: number, b: number): {
    l: number;
    a: number;
    b: number;
};
export declare function oklabToRgb(L: number, a: number, b: number): {
    r: number;
    g: number;
    b: number;
};
export declare function rgbToOklch(r: number, g: number, b: number): {
    l: number;
    c: number;
    h: number;
};
export declare function oklchToRgb(l: number, c: number, h: number): {
    r: number;
    g: number;
    b: number;
};
export declare function formatHex(c: Color): string;
export declare function formatRgb(c: Color): string;
export declare function formatHsl(c: Color): string;
export declare function formatOklch(c: Color): string;
export declare function contrastColor(bg: Color): '#000000' | '#ffffff';
export declare function findNamedColor(c: Color): string | null;

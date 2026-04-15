<script lang="ts">
    import { parseColor, formatHex, formatRgb, formatHsl, formatOklch, findNamedColor } from './color.js'

    let {
        color = '#000000',
        format = 'hex' as 'hex' | 'rgb' | 'hsl' | 'oklch' | 'name',
    }: {
        color?: string
        format?: 'hex' | 'rgb' | 'hsl' | 'oklch' | 'name'
    } = $props()

    let formatted = $derived(formatColor(color, format))

    function formatColor(c: string, f: string): string {
        const parsed = parseColor(c)
        switch (f) {
            case 'hex': return formatHex(parsed)
            case 'rgb': return formatRgb(parsed)
            case 'hsl': return formatHsl(parsed)
            case 'oklch': return formatOklch(parsed)
            case 'name': return findNamedColor(parsed) ?? formatHex(parsed)
            default: return formatHex(parsed)
        }
    }
</script>

<div class="color-input">
    <span class="preview" style="background-color: {color};"></span>
    <span class="value">{formatted}</span>
</div>

<style>
    .color-input {
        display: flex;
        flex-direction: row;
        align-items: center;

        @media (display-mode: browser) { gap: 0.5rem; }
        @media (display-mode: terminal) { gap: 1cell; }
    }

    .preview {
        @media (display-mode: browser) {
            width: 1.5em;
            height: 1.5em;
            border-radius: 3px;
            border: 1px solid #555;
        }

        @media (display-mode: terminal) {
            width: 2cell;
            height: 1cell;
        }
    }

    .value {
        font-family: monospace;

        @media (display-mode: browser) { font-size: 0.85rem; }
    }
</style>

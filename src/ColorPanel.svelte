<script lang="ts">
    import { hslToRgb, oklchToRgb } from './color.js'

    let {
        mode = 'hsl' as 'hsl' | 'oklch',
        hue = 0,
        x = 0.5,
        y = 0.5,
        width = 20,
        height = 10,
        onchange = undefined as ((x: number, y: number) => void) | undefined,
    }: {
        mode?: 'hsl' | 'oklch'
        hue?: number
        x?: number
        y?: number
        width?: number
        height?: number
        onchange?: (x: number, y: number) => void
    } = $props()

    function colorAt(col: number, row: number): { r: number; g: number; b: number } {
        const tx = col / (width - 1)
        const ty = 1 - row / (height - 1)
        if (mode === 'oklch') {
            return oklchToRgb(ty, tx * 0.4, hue)
        }
        return hslToRgb(hue, tx, ty)
    }

    let cursorCol = $derived(Math.round(x * (width - 1)))
    let cursorRow = $derived(Math.round((1 - y) * (height - 1)))
</script>

<div class="panel">
    {#each { length: height } as _, row}
        <div class="row">
            {#each { length: width } as _, col}
                {@const c = colorAt(col, row)}
                {@const isCursor = col === cursorCol && row === cursorRow}
                <span
                    class="cell"
                    class:cursor={isCursor}
                    style="background-color: rgb({c.r} {c.g} {c.b});"
                    onclick={() => {
                        const nx = col / (width - 1)
                        const ny = 1 - row / (height - 1)
                        onchange?.(nx, ny)
                    }}
                >{isCursor ? '+' : ' '}</span>
            {/each}
        </div>
    {/each}
</div>

<style>
    .panel {
        display: flex;
        flex-direction: column;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .cell {
        display: flex;
        align-items: center;
        justify-content: center;

        @media (display-mode: browser) {
            width: 1em;
            height: 1em;
            cursor: crosshair;
        }

        @media (display-mode: terminal) {
            width: 1cell;
            height: 1cell;
        }
    }

    .cursor {
        font-weight: bold;
        color: white;
        text-shadow: 0 0 2px black;
    }
</style>

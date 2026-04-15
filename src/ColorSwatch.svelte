<script lang="ts">
    import { contrastColor, parseColor } from './color.js'

    let {
        color = '#000000',
        label = '',
        size = 2,
        selected = false,
        onclick = undefined as ((color: string) => void) | undefined,
    }: {
        color?: string
        label?: string
        size?: number
        selected?: boolean
        onclick?: (color: string) => void
    } = $props()

    let contrast = $derived(contrastColor(parseColor(color)))
</script>

{#if onclick}
    <button
        class="swatch"
        class:selected
        style="background-color: {color}; color: {contrast};"
        onclick={() => onclick?.(color)}
    >
        {#if label}<span class="label">{label}</span>{/if}
    </button>
{:else}
    <div
        class="swatch"
        class:selected
        style="background-color: {color}; color: {contrast};"
    >
        {#if label}<span class="label">{label}</span>{/if}
    </div>
{/if}

<style>
    .swatch {
        display: flex;
        align-items: center;
        justify-content: center;

        @media (display-mode: browser) {
            min-width: 2em;
            min-height: 2em;
            border: 1px solid transparent;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.75rem;
            padding: 0.25rem;
        }

        @media (display-mode: terminal) {
            min-width: 2cell;
            min-height: 1cell;
            border: single;
            border-color: currentColor;
        }
    }

    button.swatch {
        background: none;
        font: inherit;
    }

    button.swatch:hover {
        @media (display-mode: browser) {
            border-color: currentColor;
            transform: scale(1.1);
        }
    }

    .selected {
        @media (display-mode: browser) {
            border-color: currentColor;
            box-shadow: 0 0 0 2px currentColor;
        }

        @media (display-mode: terminal) {
            border: double;
        }
    }

    .label {
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

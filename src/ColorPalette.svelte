<script lang="ts">
    import ColorSwatch from './ColorSwatch.svelte'
    import { NAMED_COLORS, GROUPS, getGroup, type NamedColor } from './named-colors.js'

    let {
        group = undefined as string | undefined,
        selected = '',
        compact = false,
        onselect = undefined as ((name: string, hex: string) => void) | undefined,
    }: {
        group?: string
        selected?: string
        compact?: boolean
        onselect?: (name: string, hex: string) => void
    } = $props()

    let colors = $derived(group ? getGroup(group) : NAMED_COLORS)
    let groups = $derived(group ? [group] : [...GROUPS])
</script>

<div class="palette">
    {#each groups as g}
        <div class="group">
            {#if !group}
                <span class="group-label">{g}</span>
            {/if}
            <div class="grid">
                {#each getGroup(g) as color (color.name)}
                    <ColorSwatch
                        color={color.hex}
                        label={compact ? '' : color.name}
                        selected={selected === color.name}
                        onclick={() => onselect?.(color.name, color.hex)}
                    />
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .palette {
        display: flex;
        flex-direction: column;

        @media (display-mode: browser) { gap: 1rem; }
        @media (display-mode: terminal) { gap: 1cell; }
    }

    .group {
        display: flex;
        flex-direction: column;

        @media (display-mode: browser) { gap: 0.25rem; }
    }

    .group-label {
        font-weight: bold;
        text-transform: capitalize;

        @media (display-mode: browser) {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--svt-muted, #888);
        }

        @media (display-mode: terminal) {
            opacity: dim;
        }
    }

    .grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        @media (display-mode: browser) { gap: 4px; }
        @media (display-mode: terminal) { gap: 0; }
    }
</style>

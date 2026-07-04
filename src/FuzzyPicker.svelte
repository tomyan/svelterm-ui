<script lang="ts">
    import { fuzzyFilter, moveSelection } from './fuzzy.js'

    let {
        items = [] as string[],
        placeholder = 'type to filter…',
        height = 8,
        onpick = undefined as ((item: string) => void) | undefined,
    }: {
        items?: string[]
        placeholder?: string
        height?: number
        onpick?: (item: string) => void
    } = $props()

    let query = $state('')
    let selected = $state(0)

    let results = $derived(fuzzyFilter(query, items, (item) => item))

    function oninput(event: any) {
        query = event.data?.value ?? event.target?.value ?? ''
        selected = 0
    }

    function onkeydown(event: any) {
        const key = event.data?.key ?? event.key
        if (key === 'ArrowDown') selected = moveSelection(results.length, selected, 1)
        else if (key === 'ArrowUp') selected = moveSelection(results.length, selected, -1)
        else if (key === 'Enter' && results[selected]) onpick?.(results[selected].item)
    }
</script>

<div class="picker" {onkeydown}>
    <input value={query} {placeholder} {oninput} />
    <div class="results" style="height: {height}cell; overflow: auto;">
        {#each results as result, index}
            <button
                class="result"
                class:selected={index === selected}
                onclick={() => onpick?.(result.item)}
            >{result.item}</button>
        {/each}
        {#if results.length === 0}
            <span class="empty">no matches</span>
        {/if}
    </div>
</div>

<style>
    .picker {
        display: flex;
        flex-direction: column;
        border: rounded;
        border-color: light-dark(#999999, #555555);
        padding: 0 1cell;
    }

    input {
        border-bottom: single;
    }

    .results {
        display: flex;
        flex-direction: column;
    }

    .result {
        text-align: left;
        padding: 0 1cell;
    }

    .result.selected {
        background: light-dark(#d5e5f5, #26415c);
        font-weight: bold;
    }

    .empty {
        color: light-dark(#888888, #666666);
    }
</style>

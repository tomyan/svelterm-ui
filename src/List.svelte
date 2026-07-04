<script lang="ts">
    import { moveSelection } from './fuzzy.js'

    let {
        items = [] as string[],
        selected = $bindable(0),
        height = 0,
        onselect = undefined as ((item: string, index: number) => void) | undefined,
    }: {
        items?: string[]
        selected?: number
        height?: number
        onselect?: (item: string, index: number) => void
    } = $props()

    function onkeydown(event: any) {
        const key = event.data?.key ?? event.key
        if (key === 'ArrowDown') selected = moveSelection(items.length, selected, 1)
        else if (key === 'ArrowUp') selected = moveSelection(items.length, selected, -1)
        else if (key === 'Enter' && items[selected] !== undefined) {
            onselect?.(items[selected], selected)
        }
    }
</script>

<div
    class="list"
    style={height > 0 ? `height: ${height}cell; overflow: auto;` : ''}
    {onkeydown}
>
    {#each items as item, index}
        <button
            class="item"
            class:selected={index === selected}
            onclick={() => { selected = index; onselect?.(item, index) }}
        >{item}</button>
    {/each}
    {#if items.length === 0}
        <span class="empty">no items</span>
    {/if}
</div>

<style>
    .list {
        display: flex;
        flex-direction: column;
    }

    .item {
        text-align: left;
        padding: 0 1cell;
    }

    .item.selected {
        background: light-dark(#d5e5f5, #26415c);
        color: light-dark(#0a3055, #cfe6ff);
        font-weight: bold;
    }

    .item:focus {
        color: cyan;
    }

    .empty {
        color: light-dark(#888888, #666666);
        padding: 0 1cell;
    }
</style>

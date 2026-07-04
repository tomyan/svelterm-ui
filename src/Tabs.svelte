<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        tabs = [] as string[],
        active = $bindable(0),
        children,
    }: {
        tabs?: string[]
        active?: number
        /** Panel content for the active tab: receives (label, index). */
        children?: Snippet<[string, number]>
    } = $props()
</script>

<div class="tabs">
    <div class="bar">
        {#each tabs as tab, index}
            <button
                class="tab"
                class:active={index === active}
                onclick={() => active = index}
            >{tab}</button>
        {/each}
    </div>
    <div class="panel">
        {#if tabs[active] !== undefined}
            {@render children?.(tabs[active], active)}
        {/if}
    </div>
</div>

<style>
    .tabs {
        display: flex;
        flex-direction: column;
    }

    .bar {
        display: flex;
        gap: 1cell;
    }

    .tab {
        padding: 0 1cell;
        color: light-dark(#666666, #999999);
    }

    .tab.active {
        color: cyan;
        font-weight: bold;
        text-decoration: underline;
    }

    .tab:focus {
        color: yellow;
    }

    .panel {
        border: single;
        border-color: light-dark(#bbbbbb, #444444);
        padding: 0 1cell;
    }
</style>

<script lang="ts">
    import type { Snippet } from 'svelte'
    import { navigateList } from './list-navigation.js'

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

    function onkeydown(event: any) {
        const key = event.data?.key ?? event.key
        const action = navigateList(key, tabs.length, active, 'horizontal')
        if (typeof action === 'number') active = action
    }
</script>

<div class="tabs">
    <div class="bar" {onkeydown}>
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
        color: var(--svt-muted, light-dark(#666666, #999999));
    }

    .tab.active {
        color: var(--svt-accent, cyan);
        font-weight: bold;
        text-decoration: underline;
    }

    .tab:focus {
        color: var(--svt-focus, yellow);
    }

    .panel {
        border: var(--svt-border-family, single);
        border-color: var(--svt-border, light-dark(#bbbbbb, #444444));
        padding: 0 1cell;
    }
</style>

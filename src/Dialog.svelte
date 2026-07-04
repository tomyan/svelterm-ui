<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        open = false,
        title = '',
        width = 40,
        onclose = undefined as (() => void) | undefined,
        children,
    }: {
        open?: boolean
        title?: string
        width?: number
        onclose?: () => void
        children?: Snippet
    } = $props()
</script>

{#if open}
    <dialog open onclose={() => onclose?.()} style="width: {width}cell;">
        {#if title}<div class="title">{title}</div>{/if}
        <div class="body">
            {@render children?.()}
        </div>
    </dialog>
{/if}

<style>
    dialog {
        position: absolute;
        top: 2cell;
        left: 4cell;
        z-index: 10;
        display: flex;
        flex-direction: column;
        border: double;
        border-color: cyan;
        background: light-dark(#f5f5f0, #1a1d23);
        padding: 0 1cell 1cell 1cell;
    }

    .title {
        font-weight: bold;
        color: cyan;
        text-align: center;
    }

    .body {
        display: flex;
        flex-direction: column;
        gap: 1cell;
    }
</style>

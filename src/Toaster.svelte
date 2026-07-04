<script lang="ts">
    import { toastQueue, type Toast, type ToastQueue } from './toast.js'

    let {
        queue = toastQueue as ToastQueue,
    }: {
        queue?: ToastQueue
    } = $props()

    let toasts = $state<Toast[]>([])

    $effect(() => queue.subscribe((current) => { toasts = current }))
</script>

{#if toasts.length > 0}
    <div class="toaster">
        {#each toasts as item (item.id)}
            <div class="toast {item.kind}">{item.text}</div>
        {/each}
    </div>
{/if}

<style>
    .toaster {
        position: absolute;
        top: 1cell;
        right: 2cell;
        z-index: 20;
        display: flex;
        flex-direction: column;
        gap: 1cell;
    }

    .toast {
        border: rounded;
        padding: 0 1cell;
        background: light-dark(#f5f5f0, #1a1d23);
    }

    .toast.info {
        border-color: cyan;
    }

    .toast.success {
        border-color: green;
        color: green;
    }

    .toast.error {
        border-color: red;
        color: red;
    }
</style>

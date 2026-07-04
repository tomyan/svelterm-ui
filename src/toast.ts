/**
 * Toast queue — plain TS so it works from any module. Components (the
 * Toaster) subscribe; apps call `toast('saved')` from anywhere.
 */

export interface Toast {
    id: number
    text: string
    kind: 'info' | 'success' | 'error'
}

type Listener = (toasts: Toast[]) => void

export class ToastQueue {
    private toasts: Toast[] = []
    private listeners = new Set<Listener>()
    private nextId = 1

    show(text: string, kind: Toast['kind'] = 'info', durationMs = 3000): number {
        const id = this.nextId++
        this.toasts = [...this.toasts, { id, text, kind }]
        this.emit()
        if (durationMs > 0) setTimeout(() => this.dismiss(id), durationMs)
        return id
    }

    dismiss(id: number): void {
        const before = this.toasts.length
        this.toasts = this.toasts.filter(t => t.id !== id)
        if (this.toasts.length !== before) this.emit()
    }

    subscribe(listener: Listener): () => void {
        this.listeners.add(listener)
        listener(this.toasts)
        return () => this.listeners.delete(listener)
    }

    private emit(): void {
        for (const listener of this.listeners) listener(this.toasts)
    }
}

/** Shared default queue — `toast('saved', 'success')` from anywhere. */
export const toastQueue = new ToastQueue()

export function toast(text: string, kind: Toast['kind'] = 'info', durationMs = 3000): number {
    return toastQueue.show(text, kind, durationMs)
}

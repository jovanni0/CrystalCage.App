export type TopbarContext = {
    setMode: (mode: 'back' | 'editor') => void
    setConfirm: (fn: () => void) => void
    setCancel: (fn: () => void) => void
    setTitle: (title: string) => string
}
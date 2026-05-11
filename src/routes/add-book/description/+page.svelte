<script lang="ts">
    import { getContext, onDestroy } from 'svelte'
    import { BookController } from '../../../lib/controllers/book-controller.svelte';
    import { onMount } from 'svelte'
    import { EditorView, basicSetup, minimalSetup } from 'codemirror'
    import { markdown } from '@codemirror/lang-markdown'


    const page_title = getContext<{ set: (v: string) => string }>("page_title")
    const previous = page_title.set("Description")
    onDestroy(() => page_title.set(previous))

    const controller = getContext<BookController>("book_controller")

    let editor_el: HTMLDivElement
    let view: EditorView

    onMount(() => {
        view = new EditorView({
            doc: '',
            extensions: [
                minimalSetup,
                markdown(),
                EditorView.theme({
                    '&': { height: '100%' },
                    '.cm-scroller': { overflow: 'visible' },
                    '.cm-content': { fontFamily: '"Inter", sans-serif' }
                }),
                EditorView.lineWrapping
            ],
            parent: editor_el
        })

        return () => view.destroy()
    })
</script>



<div class="wrapper">
    <span>The back of the cover blurb or your own summary.</span>

    <div class="editor" bind:this={editor_el}></div>
</div>



<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-height: 100%;
    }

    span {
        color: var(--text-secondary);
        text-align: center;
    }

    .editor {
        min-height: 50%;
        background-color: var(--input-fill);
        border-radius: 8px;
        border: 1px solid var(--lowered-border);
        isolation: isolate;
        padding: 8px;
    }

    .editor :global(.cm-editor.cm-focused) {
        outline: none;
    }
</style>
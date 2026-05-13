<script lang="ts">
    import { BookController } from '../../../lib/controllers/book-controller.svelte';
    import { getContext, onDestroy, onMount } from 'svelte'
    import { EditorView, basicSetup, minimalSetup } from 'codemirror'
    import { markdown } from '@codemirror/lang-markdown'
    import type { TopbarContext } from '$lib/types/topbar-context';
    import { goBack } from '../../../utils/go-back';


    const book_controller = getContext<BookController>("book_controller")

    const topbar = getContext<TopbarContext>("topbar")
    const old_title = topbar.setTitle("My opinion")
    topbar.setConfirm( () => {
        book_controller.my_opinion = view.state.doc.toString()
        history.back()
    })
    topbar.setCancel(goBack)

    onDestroy( () => topbar.setTitle(old_title) )


    let editor_el: HTMLDivElement
    let view: EditorView

    onMount(() => {
        view = new EditorView({
            doc: book_controller.my_opinion,
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



<div class="editor" bind:this={editor_el}></div>



<style>
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
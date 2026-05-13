<script lang="ts">
    import type { TopbarContext } from "$lib/types/topbar-context";
    import { setContext } from "svelte"
    import { BookController } from "../../lib/controllers/book-controller.svelte";
    import TopbarConfirmCancel from "$lib/components/topbar-confirm-cancel.svelte";
    import TopbarBack from "$lib/components/topbar-back.svelte";


    let { children } = $props()

    let book_controller = new BookController()
    setContext("book_controller", book_controller)
    
    /* topbar config stuff */
    let on_confirm = $state<(() => void) | undefined>(undefined)
    let on_cancel = $state<(() => void) | undefined>(undefined)
    let topbar_mode = $state<"back" | "editor">("editor")
    let topbar_title = $state("Add Book")

    setContext<TopbarContext>("topbar", {
        setMode: (mode: "back" | "editor") => topbar_mode = mode,
        setConfirm: (fn: () => void) => on_confirm = fn,
        setCancel: (fn: () => void) => on_cancel = fn,
        setTitle: (title: string) => {
            const previous = topbar_title
            topbar_title = title
            return previous
        },
    })
</script>



<div class="layout-wrapper">
    {#if topbar_mode === 'editor'}
        <TopbarConfirmCancel 
            onConfirm={on_confirm} 
            onCancel={on_cancel} 
            title={topbar_title}
        />
    {:else}
        <TopbarBack title={topbar_title} />
    {/if}
    
    <main>
        {@render children()} 
    </main>
</div>



<style>
    .layout-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 16px;
    }
</style>
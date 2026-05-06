<script lang="ts">
    import { setContext } from "svelte"
    import TopbarSimple from "$lib/components/topbar-simple.svelte";
    import BackButton from "$lib/components/topbar-buttons/back-button.svelte";
    import { BookController } from "../../controllers/book-controller.svelte";

    
    let { children } = $props()

    let title = $state("Add Book")
    setContext("page_title", { 
        set: (v: string) => {
            const previous = title
            title = v
            return previous
        }
    })

    let book_controller = new BookController()
    setContext("book_controller", book_controller)
</script>



<div class="layout-wrapper">
    <TopbarSimple 
        title={title}
    >
        {#snippet left()}
            <BackButton />
        {/snippet}
    </TopbarSimple>
    
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
<script lang="ts">
    import TopbarSearch from "$lib/components/topbar-search.svelte"
    import { setContext } from "svelte"
    import { LibraryController } from "../../lib/controllers/library-controller.svelte";
    import Button from "$lib/components/button.svelte";

    
    let { children } = $props()

    let library_controller = new LibraryController()
    setContext("library_controller", library_controller)
</script>



<div class="layout-wrapper">
    <TopbarSearch />

    {#if library_controller.is_library_empty}
        <div class="filler">
            <div class="empty-message">
                <span>Your library is empty.</span>
                <span>Add your first book to get started.</span>

                <Button 
                    text="Add book" 
                    href="/add-book"
                />
            </div>
            
        </div>

    {:else}
        <main>
            {@render children()} 
        </main>
    {/if}
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
    }

    .filler {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .empty-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--text-secondary);
        gap: 8px;
    }
</style>
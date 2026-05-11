<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import { BookController } from "../../../lib/controllers/book-controller.svelte";
    import FieldAddSeach from "$lib/components/field-add-seach.svelte";
    import { AuthorPickerController } from "../../../lib/controllers/author-picker-controller.svelte";
    import ListSelectable from "$lib/components/list-selectable-radio.svelte";
    import { UniversePickerController } from "$lib/controllers/universe-picker-controller.svelte";


    const page_title = getContext<{ set: (v: string) => string }>("page_title")
    const previous = page_title.set("Select universe")
    onDestroy(() => page_title.set(previous))

    const book_controller = getContext<BookController>("book_controller")
    const universe_picker_controller = new UniversePickerController()
    onMount( () => {
        const author_id = book_controller.author_id

        if (!author_id)
            return

        universe_picker_controller.requestUniverses(author_id)
    })

    let selected_universe_id = $state<string>(book_controller.universe_id ?? "")

    /**
     * update the universe record inside the `BookController`.
     */
    function updateUniverse()
    {
        const universe = universe_picker_controller.getUniverse(selected_universe_id)
        
        if (universe)
            book_controller.selected_universe = universe
    }

    /**
     * create a new univese record.
     */
    async function createUniverse()
    {
        const author_id = book_controller.author_id

        if (!author_id) return

        const id = await universe_picker_controller.createUniverse(author_id)
        
        if (id)
            selected_universe_id = id
    }
</script>



<div class="body">
    <div class="search-wrapper">
        <FieldAddSeach 
            bind:value={universe_picker_controller.search_query}
            placeholder="Search or add author..."
        />
        
        {#if !book_controller.author_id}
            <span class="warning">You need to first select or create an author!</span>
        {/if}
    </div>

    {#if universe_picker_controller.has_universes}
        <div class="options">
            {#each universe_picker_controller.universes as universe (universe.id)}
                <ListSelectable 
                    label={universe.name}
                    name="universe"
                    value={universe.id}
                    bind:group={selected_universe_id}
                    onchange={updateUniverse}
                />
            {/each}
        </div>
    {/if}

    {#if book_controller.author_id && universe_picker_controller.search_query !== ""}
        <button 
            class="create"
            onclick={createUniverse}
        >
            <span>Create</span>
            <span class="new-value">{universe_picker_controller.search_query.trim()}</span>
        </button>
    {/if}
</div>



<style>
    .body {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .search-wrapper {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .options {
        display: flex;
        flex-direction: column;
    }

    .create {
        display: flex;
        flex-direction: row;
        gap: 8px;
        padding: 12px 16px;
        border-radius: 12px;
        background-color: var(--raised);
        border: 1px solid var(--raised-border);
        align-self: stretch;
    }

    .new-value {
        color: var(--primary-text);
        font-weight: 600;
    }

    .warning {
        color: var(--red-primary);
        font-size: small;
        padding: 0 8px;
    }
</style>


<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import { BookController } from "../../../lib/controllers/book-controller.svelte";
    import FieldAddSeach from "$lib/components/field-add-seach.svelte";
    import { AuthorPickerController } from "../../../lib/controllers/author-picker-controller.svelte";
    import ListSelectable from "$lib/components/list-selectable-radio.svelte";


    const page_title = getContext<{ set: (v: string) => string }>("page_title")
    const previous = page_title.set("Select author")
    onDestroy(() => page_title.set(previous))


    const book_controller = getContext<BookController>("book_controller")
    const author_picker_controller = new AuthorPickerController()
    onMount( () => author_picker_controller.reques_authors() )
    
    
    let selected_author_id = $state<string>(book_controller.author_id || "")
    function updateAuthor()
    {
        const author = author_picker_controller.getAuthor(selected_author_id)
        
        if (author)
            book_controller.updateAuthor(author)
    }

    async function createAuthor()
    {
        const id = await author_picker_controller.createAuthor()
        
        if (id)
            selected_author_id = id
    }
</script>



<div class="body">
    <FieldAddSeach 
        bind:value={author_picker_controller.search_query}
        placeholder="Search or add author..."
    />

    {#if author_picker_controller.has_authors}
        <div class="options">
            {#each author_picker_controller.authors as author (author.id)}
                <ListSelectable 
                    label={`${author.last_name}, ${author.first_name}`}
                    name="author"
                    value={author.id}
                    bind:group={selected_author_id}
                    onchange={updateAuthor}
                />
            {/each}
        </div>
    {/if}

    {#if author_picker_controller.search_query !== ""}
        <div class="new-option">
            <button 
                class="create"
                onclick={createAuthor}
            >
                <span>Create</span>
                <span class="new-value">{author_picker_controller.search_query.trim()}</span>
            </button>
            
            {#if !author_picker_controller.search_query.includes(',')}
            <span class="warning">Make sure the format is <b>Last, First Name</b> separated with a colon (,) otherwise some features may break.</span>
            {/if}
        </div>
    {/if}
</div>



<style>
    .body {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .options,
    .new-option {
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
        font-size: small;
        color: var(--text-secondary);
        padding: 0 8px;
    }
</style>


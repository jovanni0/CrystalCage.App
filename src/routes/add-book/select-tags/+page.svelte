<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import { BookController } from "../../../lib/controllers/book-controller.svelte";
    import FieldAddSeach from "$lib/components/field-add-seach.svelte";
    import { TagPickerController } from "../../../lib/controllers/tag-controller.svelte";
    import ListSelectableCheckbox from "$lib/components/list-selectable-checkbox.svelte";
    import type { TopbarContext } from "$lib/types/topbar-context";


    const topbar = getContext<TopbarContext>("topbar")
    const old_title = topbar.setTitle("Select tags")
    onDestroy( () => topbar.setTitle(old_title) )

    const book_controller = getContext<BookController>("book_controller")
    const tag_picker_controller = new TagPickerController()
    onMount( () => tag_picker_controller.requestTags() )

    let selected_tag_ids = $state<string[]>(book_controller.tag_ids)

    /**
     * update the tag records inside the `BookController`.
     */
    function updateTags()
    {
        const tags = selected_tag_ids
            .map( it => tag_picker_controller.getTag(it) )
            .filter( it => it !== undefined )
        
        if (tags.length)
            book_controller.selected_tags = tags

        console.log(tags)
    }

    /**
     * create a new tag record.
     */
    async function createTag()
    {
        const id = await tag_picker_controller.createTag()
        
        if (id)
        {
            selected_tag_ids.push(id)
            updateTags()
        }
    }
</script>



<div class="body">
    <FieldAddSeach 
        bind:value={tag_picker_controller.search_query}
        placeholder="Search or add tag..."
    />

    {#if tag_picker_controller.has_tags}
        <div class="options">
            {#each tag_picker_controller.tags as tag (tag.id)}
                <ListSelectableCheckbox 
                    label={tag.name}
                    value={tag.id}
                    bind:group={selected_tag_ids}
                    onchange={updateTags}
                />
            {/each}
        </div>
    {/if}

    {#if tag_picker_controller.search_query.trim() !== ""}
        <button 
            class="create"
            onclick={createTag}
        >
            <span>Create</span>
            <span class="new-value">{tag_picker_controller.search_query.trim()}</span>
        </button>
    {/if}
</div>



<style>
    .body {
        display: flex;
        flex-direction: column;
        gap: 20px;
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
</style>


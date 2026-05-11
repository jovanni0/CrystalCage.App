<script lang="ts">
    import { getContext, onDestroy } from "svelte";
    import { BookController } from "../../../lib/controllers/book-controller.svelte";
    import FieldAddSeach from "$lib/components/field-add-seach.svelte";
    import { AuthorPickerController } from "../../../lib/controllers/author-picker-controller.svelte";
    import ListSelectable from "$lib/components/list-selectable-radio.svelte";
    import { TagController } from "../../../lib/controllers/tag-controller.svelte";
    import ListSelectableCheckbox from "$lib/components/list-selectable-checkbox.svelte";


    const page_title = getContext<{ set: (v: string) => string }>("page_title")
    const previous = page_title.set("Select tags")
    onDestroy(() => page_title.set(previous))

    const controller = getContext<BookController>("book_controller")

    const tag_controller = new TagController();

    let field_value = $state("")
    let selected_tag_ids = $state<string[]>([])
</script>



<div class="body">
    <FieldAddSeach 
        bind:value={field_value}
        placeholder="Search or add tag..."
    />

    {#if tag_controller.has_tags}
        <div class="options">
            {#each tag_controller.tags as tag (tag.id)}
                <ListSelectableCheckbox 
                    label={tag.name}
                    value={tag.id}
                    bind:group={selected_tag_ids}
                />
            {/each}
        </div>
    {/if}

    {#if field_value !== ""}
        <div class="new-option">
            <button class="create">
                <span>Create</span>
                <span class="new-value">{field_value.trim()}</span>
            </button>
            
            {#if !field_value.includes(',')}
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


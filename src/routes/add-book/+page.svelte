<script lang="ts">
    import ListEntryDate from "$lib/components/list-entry-date.svelte";
    import ListEntryNumber from "$lib/components/list-entry-number.svelte";
    import ListEntryText from "$lib/components/list-entry-text.svelte";
    import ListEntry from "$lib/components/list-entry.svelte";
    import ListSingleItemEntry from "$lib/components/list-single-item-entry.svelte";
    import { BookController } from "$lib/controllers/book-controller.svelte";
    import { getContext } from "svelte";

    const book_controller = getContext<BookController>("book_controller")
</script>



<div class="body">
    <ListSingleItemEntry 
        key="COVERS"
        placeholder="None added. Tap to modify."
        href="/add-book/manage-covers"
    />

    <div class="list">
        <span class="heading">IDENTITY</span>

        <ListEntry 
            key="Author" 
            value={book_controller.author_name}
            href="/add-book/select-author"
        />
        <ListEntry 
            key="Universe" 
            value={book_controller.universe_name}
            href="/add-book/select-universe"
        />
        <ListEntry 
            key="Series" 
            href="/add-book/select-series"
        />
        <ListEntryNumber key="Volume" />
        <ListEntry key="Title" />
        <ListEntryText key="Title" />
    </div>

    <div class="list">
        <span class="heading">DETAILS</span>

        <ListEntryDate key="Release date" />
        <ListEntryNumber key="Word Count" />
    </div>

    <ListSingleItemEntry 
        key="TAGS"
        placeholder="None set. Tap to select from a preset list or customize from scratch."
        href="/add-book/select-tags"
    />

    <ListSingleItemEntry 
        key="MY OPINION"
        placeholder="None set. Tap to add your thoughts on this book."
        href="/add-book/my-opinion"
    />

    <ListSingleItemEntry 
        key="DESCRIPTION"
        placeholder="None set. Tap to add a description (blurb) to this book."
        href="/add-book/description"
    />

    <ListSingleItemEntry 
        key="EDITIONS"
        placeholder="None added. Tap to modify."
        href="/add-book/editions"
    />
</div>


<style>
    .body {
        gap: 32px;
        display: flex;
        flex-direction: column;
    }

    .heading {
        padding: 0 8px;
        font-weight: 700;
        color: var(--text-secondary);
        letter-spacing: 0.05em;
    }

    .list {
        display: flex;
        flex-direction: column;
    }
</style>
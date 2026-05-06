<script lang="ts">
    import ListEntryDate from "$lib/components/list-entry-date.svelte";
    import ListEntryDefaultCover from "$lib/components/list-entry-default-cover.svelte";
    import ListEntryNumber from "$lib/components/list-entry-number.svelte";
    import ListEntryText from "$lib/components/list-entry-text.svelte";
    import ListSingleItemEntry from "$lib/components/list-single-item-entry.svelte";
</script>



<div class="body">
    <ListSingleItemEntry 
        key="COVERS"
        placeholder="None added. Tap to modify."
        href="/add-book/manage-covers"
    />

    <div class="list">
        <span class="heading">IDENTITY</span>

        <ListEntryText key="Author" />
        <ListEntryText key="Universe" />
        <ListEntryText key="Series" />
        <ListEntryNumber key="Volume" />
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
    />

    <ListSingleItemEntry 
        key="MY OPINION"
        placeholder="None set. Tap to add your thoughts on this book."
    />

    <ListSingleItemEntry 
        key="DESCRIPTION"
        placeholder="None set. Tap to add a description (blurb) to this book."
    />

    <ListSingleItemEntry 
        key="EDITIONS"
        placeholder="None added. Tap to modify."
    />
</div>



<style>
    .body {
        padding: 16px;
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
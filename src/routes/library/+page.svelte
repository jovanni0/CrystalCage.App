<script lang="ts">
    import { getContext } from "svelte";
    import BookCoverGallery from "$lib/components/book-cover-gallery.svelte";
    import type { LibraryController } from "$lib/controllers/library-controller.svelte";

    const lib = getContext<LibraryController>("library_controller")
</script>



<div class="lib-body">
    {#each lib.books as book (book.id)}
        <BookCoverGallery
            title={book.title}
            cover_id={book.cover_id}
        />
    {/each}
</div>



<style>
    .lib-body {
        display: grid;
        grid-template-columns: repeat(
            auto-fill,
            minmax(120px, 130px)
        );

        gap: 16px;
        padding: 16px;

        justify-content: center;
    }
</style>
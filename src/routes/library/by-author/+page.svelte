<script lang="ts">
    import { getContext } from "svelte";
    import type { LibraryController } from "$lib/controllers/library-controller.svelte";
    import CategorySeparator from "$lib/components/category-separator.svelte";
    import BookCoverGallery from "$lib/components/book-cover-gallery.svelte";

    const lib = getContext<LibraryController>("library_controller")
</script>



<div class="lib-body">
    {#each lib.books_by_author as author_goup (author_goup.name)}
        <div class="author-group">
            <CategorySeparator 
                title={author_goup.name}
            />

            <div class="covers">
                {#each author_goup.books as book (book.id)}
                    <BookCoverGallery 
                        title={book.title}
                        cover_id={book.cover_id}
                    />
                {/each}
            </div>
        </div>
    {/each}
</div>



<style>
    .lib-body {
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding: 16px;

        & > :not(:first-child) {
            border-top: 1px solid var(--dividers);
            padding-top: 8px;
        }
    }

    .author-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .covers {
        display: grid;
        grid-template-columns: repeat(
            auto-fill,
            minmax(120px, 130px)
        );
        gap: 16px;
        justify-content: center;
    }
</style>
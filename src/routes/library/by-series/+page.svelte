<script lang="ts">
    import { getContext } from "svelte";
    import type { LibraryController } from "$lib/controllers/library-controller.svelte";
    import CategorySeparator from "$lib/components/category-separator.svelte";
    import BookCoverGallery from "$lib/components/book-cover-gallery.svelte";

    const lib = getContext<LibraryController>("library_controller")

    console.log(lib.books_by_series)
</script>



<!-- <div class="lib-body">
    {#each lib.books_by_series as author_goup (author_goup.universe)}
        <div class="author-group">
            <CategorySeparator 
                title={author_goup.universe}
                subtitle={author_goup.universe}
            />

            <div class="covers">
                {#each author_goup.series as series (series.id)}
                    <BookCoverGallery 
                        title={series.title}
                        cover_id={series.cover_id}
                    />
                {/each}
            </div>
        </div>
    {/each}
</div> -->


<div class="lib-body">
    {#each lib.books_by_series as author_goup (author_goup.author_name)}
        {#each author_goup.universes as universe_group (universe_group.universe_name)}
            <div class="author-group">
                <CategorySeparator 
                    title={author_goup.author_name}
                    subtitle={universe_group.universe_name}
                />

                <div class="covers">
                    {#each universe_group.series as series (series.series_id)}
                        <BookCoverGallery 
                            title={series.series_name}
                            cover_id={series.representative_cover_id ?? undefined}
                        />
                    {/each}
                </div>
            </div>
        {/each}
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
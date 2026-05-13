<script lang="ts">
    import { BASE_URL } from "$lib/api/author";
    import ChipFormat from "$lib/components/chip-format.svelte";
    import Chip from "$lib/components/chip.svelte";
    import ListEntryDate from "$lib/components/list-entry-date.svelte";
    import ListEntryNumber from "$lib/components/list-entry-number.svelte";
    import ListEntryText from "$lib/components/list-entry-text.svelte";
    import ListEntry from "$lib/components/list-entry.svelte";
    import ListSingleItemEntry from "$lib/components/list-single-item-entry.svelte";
    import { BookController } from "$lib/controllers/book-controller.svelte";
    import type { TopbarContext } from "$lib/types/topbar-context";
    import { marked } from "marked";
    import { getContext } from "svelte";

    const book_controller = getContext<BookController>("book_controller")

    const topbar = getContext<TopbarContext>("topbar")
    topbar.setConfirm( () => 
    {
        book_controller.save()
        history.back()
    })
</script>



<div class="body">
    <ListSingleItemEntry 
        key="COVERS"
        placeholder="None added. Tap to modify."
        href="/add-book/manage-covers"
        hasContent={book_controller.has_covers}
    >
        <div class="cover-wrapper">
            <img 
                src={book_controller.default_cover_url}
                alt="default cover"
                class="cover-image"
            />

            <div class="info">
                <span 
                    class="title"
                    class:unset={book_controller.default_cover_title === undefined}
                >
                    {book_controller.default_cover_title ?? "(No title set)"}
                </span>
                <span class="message">{book_controller.default_cover_message}</span>
            </div>
        </div>
    </ListSingleItemEntry>

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
            value={book_controller.series_name}
            href="/add-book/select-series"
        />

        <ListEntryNumber 
            key="Volume" 
            bind:value={book_controller.volume_number}
        />

        <ListEntryText 
            key="Title" 
            bind:value={book_controller.volume_name}
        />
    </div>

    <div class="list">
        <span class="heading">DETAILS</span>

        <ListEntryDate 
            key="Release date" 
            bind:value={book_controller.release_date}
        />

        <ListEntryNumber 
            key="Word Count" 
            bind:value={book_controller.word_count}
        />
    </div>

    <ListSingleItemEntry 
        key="TAGS"
        placeholder="None set. Tap to select from a preset list or customize from scratch."
        href="/add-book/select-tags"
        hasContent={book_controller.selected_tags.length > 0}
    >
        <div class="tags">
            {#each book_controller.selected_tags as tag (tag.id)}
                <Chip text={tag.name} />
            {/each}
        </div>
    </ListSingleItemEntry>

    <ListSingleItemEntry 
        key="MY OPINION"
        placeholder="None set. Tap to add your thoughts on this book."
        href="/add-book/my-opinion"
        hasContent={book_controller.my_opinion !== ""}
    >
        {@html marked(book_controller.my_opinion ?? "")}
    </ListSingleItemEntry>

    <ListSingleItemEntry 
        key="DESCRIPTION"
        placeholder="None set. Tap to add a description (blurb) to this book."
        href="/add-book/description"
        hasContent={book_controller.description !== ""}
    >
        {@html marked(book_controller.description ?? "")}
    </ListSingleItemEntry>

    <ListSingleItemEntry 
        key="VERSIONS"
        placeholder="None added. Tap to modify."
        href="/add-book/versions"
        hasContent={book_controller.version_controller.has_versions}
    >
        <div class="versions-wrapper">
            <div class="chips">
                {#each book_controller.version_controller.formats as format (format)}
                    <ChipFormat format={format} />
                {/each}
            </div>

            <span>{book_controller.version_controller.format_message}</span>
        </div>
    </ListSingleItemEntry>
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

    .tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 4px;
    }

    .cover-wrapper {
        display: flex;
        flex-direction: row;
        gap: 16px;
        align-items: center;

        & .cover-image {
            width: 75px;
            height: 112.5px;
            border-radius: 8px;
            object-fit: cover;
        }

        & .info {
            display: flex;
            flex-direction: column;
            gap: 12px;

            & .title {
                font-weight: 500;
                font-size: large;
            }

            & .unset {
                font-style: italic;
                font-weight: 400;
            }


            & .message {
                color: var(--text-secondary);
            }
        }
    }

    .versions-wrapper {
        display: flex;
        flex-direction: column;
        gap: 12px;

        & span {
            padding: 0 8px;
            font-weight: 500;
        }

        & .chips {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 4px;
        }
    }
</style>
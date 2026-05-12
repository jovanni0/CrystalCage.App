<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import { BookController } from "../../../lib/controllers/book-controller.svelte";
    import FieldAddSeach from "$lib/components/field-add-seach.svelte";
    import ListSelectable from "$lib/components/list-selectable-radio.svelte";
    import { SeriesPickerController } from "$lib/controllers/series-picker-controller.svelte";
    import type { TopbarContext } from "$lib/types/topbar-context";


    const topbar = getContext<TopbarContext>("topbar")
    const old_title = topbar.setTitle("Select series")
    onDestroy( () => topbar.setTitle(old_title) )

    const book_controller = getContext<BookController>("book_controller")
    const series_picker_controller = new SeriesPickerController()
    onMount( () => {
        const universe_id = book_controller.universe_id

        if (!universe_id)
            return

        series_picker_controller.requestAllSeries(universe_id)
    })

    let selected_series_id = $state<string>(book_controller.series_id ?? "")

    /**
     * update the series record inside the `BookController`.
     */
    function updateSeries()
    {
        const series = series_picker_controller.getSeries(selected_series_id)
        
        if (series)
            book_controller.selected_series = series
    }

    /**
     * create a new series record.
     */
    async function createSeries()
    {
        const universe_id = book_controller.universe_id

        if (!universe_id) return

        const id = await series_picker_controller.createSeries(universe_id)
        
        if (id)
        {
            selected_series_id = id
            updateSeries()
        }
    }
</script>



<div class="body">
    <div class="search-wrapper">
        <FieldAddSeach 
            bind:value={series_picker_controller.search_query}
            placeholder="Search or add series..."
        />
        
        {#if !book_controller.universe_id}
            <span class="warning">You need to first select or create a universe!</span>
        {/if}
    </div>

    {#if series_picker_controller.has_series}
        <div class="options">
            {#each series_picker_controller.series as series (series.id)}
                <ListSelectable 
                    label={series.name}
                    name="series"
                    value={series.id}
                    bind:group={selected_series_id}
                    onchange={updateSeries}
                />
            {/each}
        </div>
    {/if}

    {#if book_controller.universe_id && series_picker_controller.search_query.trim() !== ""}
        <button 
            class="create"
            onclick={createSeries}
        >
            <span>Create</span>
            <span class="new-value">{series_picker_controller.search_query.trim()}</span>
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


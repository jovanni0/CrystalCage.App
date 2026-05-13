<script lang="ts">
    import { getContext, onDestroy } from 'svelte'
    import { BookController } from '../../../lib/controllers/book-controller.svelte';
    import Button from '$lib/components/button.svelte';
    import type { TopbarContext } from '$lib/types/topbar-context';
    import ListEntryCover from '$lib/components/list-entry-cover.svelte';
    import { CoverPickerController } from '$lib/controllers/cover-picker-controller.svelte';
    import { BASE_URL } from '$lib/api/author';

    const topbar = getContext<TopbarContext>("topbar")
    const old_title = topbar.setTitle("Manage covers")
    onDestroy( () => topbar.setTitle(old_title) )

    const book_controller = getContext<BookController>("book_controller")
    const cover_picker_controller = new CoverPickerController()
    cover_picker_controller.covers = book_controller.covers

    let cover_select_group = $state<string>(book_controller.default_cover)

    console.log(book_controller.default_cover)

    /* hidden input element to trigger the file selection */
    let file_input: HTMLInputElement


    async function onFileSelect()
    {
        const file = file_input.files?.[0]

        if (!file) return

        await cover_picker_controller.uploadCover(file)
        file_input.value = ""
    }

    onDestroy( () => {
        book_controller.covers = cover_picker_controller.covers
        book_controller.default_cover = cover_select_group

        console.log(cover_select_group)
    })
</script>



<div class="body">
    <input 
        type="file"
        accept="image/*"
        bind:this={file_input}
        onchange={onFileSelect}
        style="display: none"
    />

    {#if !cover_picker_controller.has_covers}
        <div class="info">
            <span class="main">No covers added yet.</span>
            <span>Adding multiple covers lets you choose how this book appears in your library.</span>
        </div>
        
        <Button 
            text="Add cover" 
            type="primary" 
            onClick={ () => file_input.click() }
        />
    {:else}
        <Button 
            text="Add cover" 
            type="secondary" 
            onClick={ () => file_input.click() }
        />

        <div class="covers">
            {#each cover_picker_controller.covers as cover (cover.id)}
                <ListEntryCover 
                    name="cover"
                    input_value={cover.title}
                    cover_url={`${BASE_URL}/covers/${cover.id}`}
                    radio_value={cover.id}
                    bind:radio_group={cover_select_group}
                />
            {/each}
        </div>
    {/if}
</div>



<style>
    .body {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 12px;
        color: var(--text-secondary);
        letter-spacing: 0.05rem;
        text-align: center;
        padding: 32px 8px;
        padding-top: 64px;
    }

    .main {
        color: var(--text);
    }

    .covers {
        display: flex;
        flex-direction: column;
    }
</style>
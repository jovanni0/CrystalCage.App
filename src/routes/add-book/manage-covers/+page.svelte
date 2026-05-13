<script lang="ts">
    import { getContext, onDestroy } from 'svelte'
    import { BookController } from '../../../lib/controllers/book-controller.svelte';
    import Button from '$lib/components/button.svelte';
    import type { TopbarContext } from '$lib/types/topbar-context';
    import ListEntryCover from '$lib/components/list-entry-cover.svelte';

    
    const topbar = getContext<TopbarContext>("topbar")
    const old_title = topbar.setTitle("Manage covers")
    topbar.setMode("back")
    onDestroy( () => {
        topbar.setMode("editor")
        topbar.setTitle(old_title)
    })
    
    const book_controller = getContext<BookController>("book_controller")
    const cover_picker_controller = book_controller.cover_picker_controller

    /* hidden input element to trigger the file selection */
    let file_input: HTMLInputElement
    async function onFileSelect()
    {
        const file = file_input.files?.[0]

        if (!file) return

        const new_id = cover_picker_controller.addCover(file)
        book_controller.default_cover_id = new_id

        file_input.value = ""
    }
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
            {#each cover_picker_controller.covers as cover (cover.local_id)}
                <ListEntryCover 
                    name="cover"
                    input_value={cover.title}
                    cover_url={cover.preview_url}
                    radio_value={cover.local_id}
                    bind:radio_group={book_controller.default_cover_id}
                    onChange={ (text) => cover_picker_controller.setTitle(cover.local_id, text) }
                    onDelete={ () => cover_picker_controller.removeCover(cover.local_id) }
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
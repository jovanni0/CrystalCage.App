<script lang="ts">
    import { getContext, onDestroy } from 'svelte'
    import { BookController } from '../../../lib/controllers/book-controller.svelte';
    import Button from '$lib/components/button.svelte';
    import type { TopbarContext } from '$lib/types/topbar-context';
    import ListEntryVersion from '$lib/components/list-entry-version.svelte';


    const topbar = getContext<TopbarContext>("topbar")
    const old_title = topbar.setTitle("Manage versions")
    topbar.setMode("back")
    onDestroy( () => {
        topbar.setMode("editor")
        topbar.setTitle(old_title)
    })

    const book_controller = getContext<BookController>("book_controller")
    const version_controller = book_controller.version_controller

    /* hidden input element to trigger the file selection */
    let file_input: HTMLInputElement
    async function onFileSelect()
    {
        const file = file_input.files?.[0]

        if (!file) return

        version_controller.addVersion(file)

        file_input.value = ""
    }
</script>


<div class="body">
    <input 
        type="file"
        accept=".epub,.mobi,.azw3,.fvb,application/epub+zip"
        bind:this={file_input}
        onchange={onFileSelect}
        style="display: none"
    />

    {#if !version_controller.has_versions}
        <div class="info">
            <span class="main">No files added yet</span>
            <span>When you have a copy — an EPUB, MOBI, or FVB — add it here as a version. You can have multiple versions of the same book and choose which one you're reading each time.</span>
        </div>
        
        <Button 
            text="Add edition" 
            type="primary" 
            onClick={ () => file_input.click() }
        />
    {:else}
        <Button 
            text="Add version" 
            type="secondary" 
            onClick={ () => file_input.click() }
        />

        <div class="editions">
            {#each version_controller.versions as version (version.local_id)}
                <ListEntryVersion 
                    input_value={version.title}
                    format={version.format ?? "?"}
                    created_at={version.created_at}
                    onChange={ (text) => version_controller.setTitle(version.local_id, text) }
                    onDelete={ () => version_controller.removeVersion(version.local_id) }
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

    .editions {
        display: flex;
        flex-direction: column;
        align-self: stretch;
    }
</style>
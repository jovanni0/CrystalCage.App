<script lang="ts">
    import { getContext, onDestroy } from 'svelte'
    import { BookController } from '../../../lib/controllers/book-controller.svelte';
    import Button from '$lib/components/button.svelte';

    const page_title = getContext<{ set: (v: string) => string }>("page_title")
    const previous = page_title.set("Manage editions")
    onDestroy(() => page_title.set(previous))

    const controller = getContext<BookController>("book_controller")
</script>


<div class="body">
    {#if !controller.has_editions}
        <div class="info">
            <span class="main">No files added yet</span>
            <span>When you have a copy — an EPUB, MOBI, or FVB — add it here as a version. You can have multiple versions of the same book and choose which one you're reading each time.</span>
        </div>
        
        <Button 
            text="Add edition" 
            type="primary" 
        />
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
</style>
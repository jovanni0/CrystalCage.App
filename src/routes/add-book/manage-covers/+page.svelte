<script lang="ts">
    import { getContext, onDestroy } from 'svelte'
    import { BookController } from '../../../lib/controllers/book-controller.svelte';
    import Button from '$lib/components/button.svelte';
    import type { TopbarContext } from '$lib/types/topbar-context';

    const topbar = getContext<TopbarContext>("topbar")
    const old_title = topbar.setTitle("Manage covers")
    onDestroy( () => topbar.setTitle(old_title) )

    const controller = getContext<BookController>("book_controller")
</script>


<div class="body">
    {#if !controller.has_covers}
        <div class="info">
            <span class="main">No covers added yet.</span>
            <span>Adding multiple covers lets you choose how this book appears in your library.</span>
        </div>
        
        <Button 
            text="Add cover" 
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
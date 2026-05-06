<script lang="ts">
    import ChevronRight from "./icons/chevron-right.svelte";

    let {
        key = "KEY",
        placeholder = "None set",
        href
    } : {
        key?: string
        placeholder?: string
        href?: string
    } = $props()
</script>



{#if href}
    <a 
        href={href}
        class="entry"
    >
        <div class="top">
            <span class="key">{key}</span>
            <ChevronRight />
        </div>

        <span class="none-set">{placeholder}</span>
    </a>
{:else}
    <button class="entry">
        <div class="top">
            <span class="key">{key}</span>
            <ChevronRight />
        </div>

        <span class="none-set">{placeholder}</span>
    </button>
{/if}




<style>
    .entry {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px 0;
    }

    .top {
        display: flex;
        flex-direction: row;
        gap: 8px;
    }

    .key {
        flex: 1;
        padding: 0 8px;
        font-weight: 700;
        color: var(--text-secondary);
        letter-spacing: 0.05em;
    }

    .none-set {
        flex: 1;
        font-style: italic;
        color: var(--text-secondary);
        padding: 0 8px;
    }
</style>
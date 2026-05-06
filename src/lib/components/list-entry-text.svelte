<script lang="ts">
    import ChevronRight from "./icons/chevron-right.svelte";

    let {
        key = "Key",
        value = "(None set)"
    } : {
        key?: String
        value?: String
    } = $props()
</script>


<button class="entry">
    <span class="key">{key}</span>
    <span 
        class="value"
        class:none-set={value === "(None set)"}
    >
        {value}
    </span>
    <ChevronRight />
</button>



<style>
    .entry {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid var(--dividers);
        gap: 8px;
        padding: 12px 8px;
        padding-right: 0;
    }

    .key {
        min-width: 128px;
    }

    .value {
        flex: 1;
    }

    .value.none-set {
        font-style: italic;
        color: var(--text-secondary);
    }
</style>
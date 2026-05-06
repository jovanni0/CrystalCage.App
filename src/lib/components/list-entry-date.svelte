<script lang="ts">
    import ChevronRight from "./icons/chevron-right.svelte";

    let {
        key = "Key",
        value
    } : {
        key?: String
        value?: String
    } = $props()
</script>


<button class="entry">
    <span class="key">{key}</span>
    <input 
        class="value"
        class:none-set={value === undefined}
        type="date"
        required
    >
</button>



<style>
    .entry {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid var(--dividers);
        padding: 12px 8px;
        padding-right: 0;
    }

    .key {
        min-width: 128px;
    }

    input[type="date"] {
        all: unset;
        background-color: var(--input-fill);
        padding: 4px 8px;
        width: 100%;
        border-radius: 4px;
        color: var(--text-secondary);

        &:valid {
            color: var(--text);
            font-style: normal !important;
        }
    }

    .value {
        flex: 1;
    }

    .value.none-set {
        font-style: italic;
        color: var(--text-secondary);
    }
</style>
<script lang="ts">
    import Checkbox from "./checkbox.svelte";

    let {
        label,
        value,
        group = $bindable(),
        onchange
    } : {
        label: string
        value: string
        group: string[]
        onchange?: () => void
    } = $props()
</script>



<label class="entry">
    <input 
        type="checkbox"
        value={value}
        // bind:group={group}
        onchange={ () => {
            if (group.includes(value))
                group = group.filter(v => v !== value)
            else
                group = [...group, value]

            onchange?.()
        }}
    >
    <span>{label}</span>
    <Checkbox selected={group.includes(value)} />
</label>



<style>
    input {
        display: none;
    }

    .entry {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 12px;
        border-bottom: 1px solid var(--dividers);
    }

    span {
        flex: 1;
    }
</style>
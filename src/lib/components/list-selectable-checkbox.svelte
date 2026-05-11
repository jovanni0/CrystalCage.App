<script lang="ts">
    import Checkbox from "./checkbox.svelte";

    let {
        label,
        value,
        group = $bindable()
    } : {
        label: string
        value: string
        group: string[]
    } = $props()
</script>



<label class="entry">
    <input 
        type="checkbox"
        value={value}
        bind:group={group}
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
<script lang="ts">
    import RadioSelector from "./radio-selector.svelte";

    let {
        label,
        name,
        value,
        group = $bindable(),
        onchange
    } : {
        label: string
        name: string
        value: string
        group: string
        onchange?: () => void
    } = $props()
</script>



<label class="entry">
    <input 
        type="radio"
        name={name}
        value={value}
        bind:group={group}
        onchange={onchange}
    >
    <span>{label}</span>
    <RadioSelector selected={group === value} />
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
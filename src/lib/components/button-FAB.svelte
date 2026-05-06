<script>
    import Plus from "./icons/plus.svelte"

</script>



<button class="fab">
    <Plus 
        width={32}
        height={32}
    />
</button>



<style>
    .fab {
        border-radius: 100%;
        aspect-ratio: 1/1;
        padding: 16px;
        background-color: var(--primary-text);
        color: var(--text-inverted)
    }
</style>
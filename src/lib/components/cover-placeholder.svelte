<script lang="ts">
    import BookOpen from "./icons/book-open.svelte";
</script>



<div class="cover-placeholder">
    <BookOpen 
        width={32} 
        height={32}
    />
</div>



<style>
    .cover-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--placeholder);
        color: var(--placeholder);
    }
</style>
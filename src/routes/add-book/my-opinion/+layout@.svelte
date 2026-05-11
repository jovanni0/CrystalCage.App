<script lang="ts">
    import TopbarSimple from "$lib/components/topbar-simple.svelte";
    import Ex from "$lib/components/icons/ex.svelte";
    import TopbarButton from "$lib/components/topbar-buttons/topbar-button.svelte";
    import Checkmark from "$lib/components/icons/checkmark.svelte";

    let { children } = $props()
</script>



<div class="layout-wrapper">
    <TopbarSimple title="My opinion">
        {#snippet left()}
            <TopbarButton 
                // onClick={goBack}
            >
                {#snippet content()}
                    <Ex />
                {/snippet}
            </TopbarButton>
        {/snippet}

        {#snippet right()}
            <TopbarButton 
                // onClick={goBack}
            >
                {#snippet content()}
                    <Checkmark />
                {/snippet}
            </TopbarButton>
        {/snippet}
    </TopbarSimple>
    
    <main>
        {@render children()} 
    </main>
</div>



<style>
    .layout-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 16px;
    }
</style>
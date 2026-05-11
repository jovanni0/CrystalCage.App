<script lang="ts">
    import ButtonFAB from "$lib/components/button-FAB.svelte";
    import { getContext } from "svelte";
    import type { LibraryController } from "../../lib/controllers/library-controller.svelte";

    const lib = getContext<LibraryController>("library_controller")
</script>



<div class="lib-body">

    <div class="fab">
        <ButtonFAB />
    </div>
    
</div>


<style>
    .fab {
        position: absolute;
        right: 24px;
        bottom: 24px;
        line-height: 0;
    }

    .lib-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }


</style>
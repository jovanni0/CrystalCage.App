<script lang="ts">
    import type { Snippet } from "svelte"
    import TopbarButton from "./topbar-buttons/topbar-button.svelte";
    import { goBack } from "../../utils/go-back";
    import ArrowLeft from "./icons/arrow-left.svelte";

    let { 
        title = ""
    } : {
        title?: string
    } = $props();
</script>



<div class="back-topbar-base">
    <div class="content">
       <TopbarButton 
            onClick={goBack}
        >
            {#snippet content()}
                <ArrowLeft />
            {/snippet}
        </TopbarButton>
        
        <span>{title}</span>
        
        <div class="button-placeholder"></div>
    </div>
</div>
    


<style>
    .back-topbar-base {
        background-color: var(--base);

        position: sticky;
        top: 0;
        container-type: scroll-state;
        z-index: 1;
    }

    @container scroll-state(stuck: top) {
        .content {
            border-bottom: 1px solid var(--dividers) !important;
        }
    }

    .content {
        display: flex;
        flex-direction: row;
        gap: 4px;
        align-items: center;
        padding: 12px 8px;
        padding-top: calc(max(12px, env(safe-area-inset-top)));
        border-bottom: 1px solid var(--base);
        transition: border-color 0.25s ease;
    }

    .button-placeholder {
        min-width: 48px;
        min-height: 48px;
    }

    span {
        flex: 1;
        text-align: center;
        font-size: larger;
        font-weight: 500;
    }
</style>
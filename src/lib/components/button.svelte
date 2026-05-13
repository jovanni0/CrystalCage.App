<script lang="ts">
    type ButtonType = "primary" | "secondary" | "passive"

    let {
        text = "Button",
        type = "primary",
        href = undefined,
        fill = false,
        onClick
    } : {
        text?: string
        type?: ButtonType
        href?: string
        fill?: boolean
        onClick?: () => void
    } = $props()
</script>



{#if href}
    <a
        href={href}
        class:primary={type === "primary"}
        class:secondary={type === "secondary"}
        class:passive={type === "passive"}
        class:fill={fill}
    >
        <span>{text}</span>
    </a>
{:else}
    <button
        class:primary={type === "primary"}
        class:secondary={type === "secondary"}
        class:passive={type === "passive"}
        class:fill={fill}
        onclick={onClick}
    >
        <span>{text}</span>
    </button>
{/if}



<style>
    button,
    a {
        border-radius: 12px;
        padding: 8px 16px;
        display: flex;
        justify-content: center;
        flex: 0 0 auto;
    }

    span {
        font-weight: 400;
        text-align: center;
    }

    .primary {
        background-color: var(--primary-text);
        color: var(--text-inverted);
    }

    .secondary {
        background-color: var(--raised);
        color: var(--text);
        border: 1px solid var(--raised-border);
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
    }

    .passive {
        background-color: var(--raised-border);
        border: 1px solid var(--dividers);
        color: var(--text-secondary);
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
    }

    .fill {
        flex: 1;
    }
</style>
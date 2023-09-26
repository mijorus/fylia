<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import Footer from "$lib/components/Footer.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import { getContext, onMount } from "svelte";

    const userStatus: App.StoreUserStatus = getContext("userStatus");

    onMount(() => {
        userStatus.subscribe((u) => {
            if (u === "none") goto("/");
        });
    });
</script>

{#if $userStatus === "logged"}
    {#if $page.route.id === "/basket/link/[code]"}
        <slot />
    {:else}
        <Nav />
        <slot />
        <Footer />
    {/if}
{/if}

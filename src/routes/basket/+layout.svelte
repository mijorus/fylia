<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import Footer from "$lib/components/Footer.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import { getContext } from "svelte";

    const userStatus: App.StoreUserStatus = getContext("userStatus");

    userStatus.subscribe((u) => {
        if (u === "none") goto("/");
    });

    console.log($page.route.id);
</script>

{#if $page.route.id === "/basket/link/[code]"}
    <slot />
{:else}
    <Nav />
    <slot />
    <Footer />
{/if}

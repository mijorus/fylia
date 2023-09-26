<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { supabase } from "$lib/supabaseClient";
    import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
    import { Footer, Button, Spinner, Alert, P } from "flowbite-svelte";
    import { onMount } from "svelte";
    import Fa from "svelte-fa";

    let error: string | null = null;
    let bundle: App.BundleDB | null = null;
    let next_visit = 0;
    let mode: "preview" | null = null;

    function letsgo() {
        if (!browser) return;

        sessionStorage.removeItem("previewKey");
        window.location.reload();
    }

    function openPage(bundle: App.BundleDB) {
        let l = bundle.data.links[next_visit].link;
        if (!l.startsWith("http")) l = "https://" + l;
        window.location.replace(l);
    }

    onMount(async () => {
        if (sessionStorage.getItem("previewKey") === $page.url.searchParams.get("preview_key")) {
            mode = "preview";
        }

        console.log($page.params.code);
        const query = await supabase.from("baskets").select().eq("id", $page.params.code).single();

        //@ts-ignore
        bundle = query.data;
        if (!bundle) {
            error = "not-found";
            return;
        }

        const last_visited = bundle.last_visited ?? 0;
        next_visit = last_visited >= bundle.data.links.length - 1 ? 0 : last_visited + 1;

        const update = {
            last_use: new Date(),
            last_visited: next_visit,
            usage: (bundle.usage ?? 0) + 1,
        };

        if (!bundle.first_use) {
            update.first_use = new Date();
        }

        await supabase.from("baskets").update(update).eq("id", bundle.id).select();

        if (!mode && bundle) {
            setTimeout(() => openPage(bundle), bundle.data.addDelay ? 750 : 0);
        }
    });
</script>

<svelte:head>
    <title>Fylia{bundle ? " - " + bundle.name : ""}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center h-screen gap-12" class:page={bundle && !mode}>
    {#if bundle || !error}
        {#if !bundle}
            <Spinner color="gray" />
        {:else if mode === "preview"}
            <div>
                Bookmark this page! <br />
                When you are ready, click the buttom below!
                <br />
                <small>This link supports: {bundle.data.links.map((el) => el.creator).join(", ")}</small>
            </div>
            <div>
                <Button color="red" on:click={letsgo}>
                    <Fa icon={faCheck} />&nbsp; Done, let's go!</Button
                >
            </div>
            <a href="/basket">
                <small>← Back</small>
            </a>
        {:else}
            <!-- Load the magic link HERE -->
            <Spinner color="gray" />
            {#if bundle.data.addDelay}
                <div class="flex flex-col items-center gap-2">
                    <P size="xl" weight="normal">You are now supporting</P>
                    <P size="xl" weight="bold">{bundle.data.links[next_visit].creator}</P>
                </div>
            {/if}
        {/if}
    {:else}
        <a href="/" class="text-4xl" style="font-family: Somatic-Rounded; text-decoration: underline;">
            f<span style="color: purple; font-family: inherit;">y</span>lia
        </a>
        <div class="text-center">
            <Alert color="red"
                >😐 This link in not valid
                <br /> It could have been removed or it is owned by another account</Alert
            >
        </div>
        <a href="/basket">
            <small>← Back to your Basket</small>
        </a>
    {/if}
</div>

{#if !error}
    <Footer class="fixed bottom-0 z-20 w-full">
        <a class="text-sm" href="/">
            Powered by
            <span class="text-lg" style="font-family: Somatic-Rounded; text-decoration: underline;">
                f<span style="color: purple; font-family: inherit;">y</span>lia
            </span>
            {#if mode === "preview"}
                - Preview Mode
            {/if}
        </a>
    </Footer>
{/if}

<style>
    @media (prefers-color-scheme: dark) {
        .page {
            /* color: white; */
            /* background-color: rgb(40, 40, 40); */
        }
    }
</style>

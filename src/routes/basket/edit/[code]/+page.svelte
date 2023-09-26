<script lang="ts">
    import Container from "$lib/components/Container.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import { Label, Input, Button, Toggle, Spinner } from "flowbite-svelte";
    import Fa from "svelte-fa";
    import { faTShirt, faTrash, faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
    import Trash from "$lib/components/Trash.svelte";
    import { slide } from "svelte/transition";
    import { supabase } from "$lib/supabaseClient";
    import { getContext, onMount } from "svelte";
    import { goto } from "$app/navigation";
    import EditLinkForm from "$lib/components/EditLinkForm.svelte";
    import { page } from "$app/stores";

    const user: App.StoreUser = getContext("user");
    let form: HTMLFormElement;
    let name = "";
    let links: App.BundleLink[] = [];
    let dataLoaded = false;
    let item: App.BundleDB;
    let publicBundle = false;
    let addDelay = false;

    function addItem() {
        links = [...links, { link: "", creator: "" }];
    }

    function removeItem(index: number) {
        links.splice(index, 1);
        links = links;
    }

    async function saveItem() {
        if (form.checkValidity()) {
            if (name.length > 200) {
                return alert("Please use names shorter than 200 characters");
            }

            for (let l of links) {
                if (l.creator.length > 200 || l.link.length > 1_000) {
                    return alert("One of the creator name or one of the provider link is too long!");
                }
            }

            const update = {
                name,
                public: publicBundle,
                data: { ...item.data, links: links, addDelay },
            };

            const result = await supabase.from("baskets").update(update).eq("id", item.id).select();

            goto("/basket");
        }
    }

    onMount(() => {
        user.subscribe(async (u) => {
            if (u && !dataLoaded && $page.params.code) {
                const { data, error } = await supabase.from("baskets").select().eq("id", $page.params.code).single();
                dataLoaded = true;

                if (error || !data) {
                    return alert("There was an error loading this item");
                }

                name = data.name;
                links = data.data.links;
                item = data;
                addDelay = data.data.addDelay;
                publicBundle = data.public;
            }
        });
    });
</script>

<Container>
    <div class="mb-10 flex gap-5 flex-col md:flex-row md:justify-between md:items-center">
        <div class="order-2 md:order-1">
            <h1 class="font-bold text-6xl font-logo">Edit magic link</h1>
        </div>
        <div class="md:order-2">
            <Button color="red" outline size="lg" href="/basket">
                <i><Fa icon={faArrowLeft} /></i>&nbsp; Back to My Basket
            </Button>
        </div>
    </div>

    {#if !dataLoaded}
        <div class="flex justify-center h-48 items-center m-auto">
            <Spinner color="gray" />
        </div>
    {:else}
        <div class="pb-20">
            <EditLinkForm
                bind:form
                mode="edit"
                on:addItem={addItem}
                on:removeItem={(ev) => removeItem(ev.detail.i)}
                on:saveItem={() => saveItem()}
                bind:links
                bind:name
                bind:addDelay
                bind:publicBundle
            />
        </div>
    {/if}
</Container>

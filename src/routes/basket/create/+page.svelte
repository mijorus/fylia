<script lang="ts">
    import Container from "$lib/components/Container.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import { Label, Input, Button, Toggle } from "flowbite-svelte";
    import Fa from "svelte-fa";
    import { faTShirt, faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
    import Trash from "$lib/components/Trash.svelte";
    import { slide } from "svelte/transition";
    import { supabase } from "$lib/supabaseClient";
    import { getContext } from "svelte";
    import type { User } from "@supabase/supabase-js";
    import { PUBLIC_ENV } from "$env/static/public";
    import { save } from "$lib/basket";
    import { goto } from "$app/navigation";
    import EditLinkForm from "$lib/components/EditLinkForm.svelte";
    import { browser } from "$app/environment";

    const user: App.StoreUser = getContext("user");
    let form: HTMLFormElement;
    const previewKey = (Math.random() + 1).toString(36).substring(6);

    let name = "";
    let publicBundle = false;
    let addDelay = false;
    let links: App.BundleLink[] = [
        { link: "", creator: "" },
        { link: "", creator: "" },
    ];

    function addItem() {
        links = [...links, { link: "", creator: "" }];
    }

    function removeItem(index: number) {
        links.splice(index, 1);
        links = links;
    }

    async function saveItem() {
        if (!browser) return;
        
        if (form.checkValidity()) {
            if (name.length > 200) {
                return alert("Please use names shorter than 200 characters");
            }

            for (let l of links) {
                if (l.creator.length > 200 || l.link.length > 1_000) {
                    return alert("One of the creator name or one of the provider link is too long!");
                }
            }

            const insert: App.BundleDB = {
                name,
                user_id: $user.id,
                public: publicBundle,
                data: {
                    addDelay,
                    links,
                },
            };

            const inserted = await save(insert);
            sessionStorage.setItem("previewKey", previewKey);
            goto(`/basket/link/${inserted[0].id}?preview_key=${previewKey}`);
        }
    }
</script>

<Container>
    <div class="mb-10 flex gap-5 flex-col md:flex-row md:justify-between md:items-center">
        <div class="order-2 md:order-1">
            <h1 class="font-bold text-6xl font-logo">Create a new magic link</h1>
        </div>
        <div class="md:order-2">
            <Button color="red" outline size="lg" href="/basket">
                <i><Fa icon={faArrowLeft} /></i>&nbsp; Back to My Basket
            </Button>
        </div>
    </div>

    <div class="pb-20">
        <EditLinkForm
            bind:form
            mode="create"
            on:saveItem={() => saveItem()}
            on:addItem={addItem}
            on:removeItem={(ev) => removeItem(ev.detail.i)}
            bind:links
            bind:name
            bind:addDelay
            bind:publicBundle
        />
    </div>
</Container>

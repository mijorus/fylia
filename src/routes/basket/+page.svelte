<script lang="ts">
    import Container from "$lib/components/Container.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import Trash from "$lib/components/Trash.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { faEye, faEyeLowVision, faInfo, faPencil } from "@fortawesome/free-solid-svg-icons";
    import { Listgroup, ListgroupItem, Avatar, Button, Label, Spinner, ButtonGroup, Alert } from "flowbite-svelte";
    import { getContext, onMount } from "svelte";
    import Fa from "svelte-fa";

    let data: App.BundleDB[] | null = null;
    let previewKey: string;
    const user: App.StoreUser = getContext("user");
    let loaded = false;
    let deletingId: string;

    user.subscribe(async (u) => {
        if (!u || loaded) return;

        data = (await getAll()).data;
        console.log(data);
    });

    async function getAll() {
        return await supabase.from("baskets").select().eq("user_id", $user.id);
    }

    onMount(() => {
        previewKey = (Math.random() + 1).toString(36).substring(6);
        sessionStorage.setItem("previewKey", previewKey);
    });

    async function deleteItem(id: string) {
        if (confirm("Do you really want to delete this link?")) {
            deletingId = id;

            await supabase.from("baskets").delete().eq("id", id);
            data = (await getAll()).data;
        }
    }
</script>

<Container>
    <div>
        <Button color="red" size="lg" href="/basket/create">+ Create magic link</Button>
    </div>

    <div class="mt-10">
        <Listgroup active class="w-full">
            {#if data !== null}
                {#if data.length}
                    {#each data as el}
                        <ListgroupItem class="py-5 text-base font-semibold gap-2">
                            <div class="flex flex-col md:flex-row md:items-center justify-between w-full gap-3 md:gap-0 {deletingId === el.id ? 'opacity-50 pointer-events-none' : ''}">
                                <div>
                                    <div class="w-32"><Label>{el.name}</Label></div>
                                    <div>
                                        <small>{el.data.links.map((e) => e.creator).join(", ")}</small>
                                    </div>
                                </div>
                                <div class="flex flex-row items-center gap-3">
                                    <Button size="xs" outline color="light" href="/basket/edit/{el.id}">
                                        <Fa icon={faPencil} />&nbsp;Edit
                                    </Button>
                                    <Button size="xs" outline color="blue" href="/basket/link/{el.id}?preview_key={previewKey}">
                                        <Fa icon={faEye} />&nbsp;Preview
                                    </Button>
                                    <Button size="xs" outline color="red" on:click={() => deleteItem(el.id)}>
                                        <i class="gg-trash" />
                                    </Button>
                                </div>
                            </div>
                        </ListgroupItem>
                    {/each}
                {:else}
                    <ListgroupItem class="py-5 text-base font-semibold gap-2">
                        <div class="flex flex-row items-center justify-between w-full">
                            <div>
                                <div class="w-full text-neutral-400">Get started by creating a new Magic Link</div>
                            </div>
                        </div>
                    </ListgroupItem>
                {/if}
            {:else}
                <ListgroupItem>
                    <div class="flex w-full p-2 justify-center">
                        <Spinner color="gray" />
                    </div>
                </ListgroupItem>
            {/if}
        </Listgroup>
        <div class="mt-10">
            <!-- <ButtonGroup>
            </ButtonGroup> -->
            <Alert class="mt-3" color="dark">
                <div>
                    <div class="flex flex-row gap-1 items-center mb-4 text-gray-500">
                        <Fa icon={faInfo} />
                        <strong>How it works</strong>
                    </div>
                    <ol class="list-disc p-3">
                        <li>1. 🔗 Create a new magic link that points to a website (like Amazon)</li>
                        <li>2. 📹 Add your favourite creators</li>
                        <li>3. 🔖 Save it as favourite</li>
                        <li>4. 🚀 USE IT!</li>
                    </ol>
                    <div class="mt-10"><strong>On a new device?</strong></div>
                    <p>Use the <em>Preview</em> button to open your links without the automatic redirect!</p>
                </div>
            </Alert>
        </div>
    </div>
</Container>

<script lang="ts">
    import { Label, Input, Button, Toggle, Alert } from "flowbite-svelte";
    import Trash from "$lib/components/Trash.svelte";
    import { slide } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { faWarning, faWifi } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let mode: "edit" | "create" = "create";
    export let form;
    export let name = "";
    export let links: App.BundleLink[];
    export let publicBundle = false;
    export let addDelay = false;

    let withErrors: number[] = [];
    const dispatch = createEventDispatcher();
    const creatorsPlaceholder = ["MKBHD", "PewDiePie", "Mr. Beast"];
    const linkPlaceholder = ["https://flipkart.com/?affid=...", "https://amzn.to/..."];
    const defaultClass = "block w-full";

    function checkHttpUrl(string: string) {
        let givenURL;
        try {
            givenURL = new URL(string);
        } catch (error) {
            console.log("error is", error);
            return false;
        }
        return givenURL.protocol === "http:" || givenURL.protocol === "https:";
    }

    function onLinkUrlChange(index: number) {
        if (links[index].link) {
            let val = links[index].link;

            val = val.trim();

            if (val.match(/http[s]?:\/\//)) {
                let noloop = 0;
                while (!val.match(/^http[s]?:\/\//) && (noloop < 1_000)) {
                    val = val.replace(/^./, '');
                    noloop++;
                }
            }

            if (checkHttpUrl(val)) {
                if (withErrors.includes(index)) {
                    withErrors.splice(withErrors.indexOf(index), 1);
                    withErrors = withErrors;
                }
            } else {
                if (!withErrors.includes(index)) withErrors = [...withErrors, index];
            }

            links[index].link = val;
            links = [...links];
        }
    }
</script>

<form bind:this={form} class="mt-10 p-3 md:p-10 bg-white border rounded-xl">
    {#if withErrors.length}
        <div transition:slide>
            <Alert color="red">
                <div class="gap-3 flex flex-row items-center">
                    <Fa icon={faWarning} />
                    Some fields don't include valid links
                </div>
            </Alert>
        </div>
    {/if}
    <div class="my-6">
        <Label for="bundle-name" class="block mb-2">Link name</Label>
        <Input required bind:value={name} id="bundle-name" size="lg" placeholder="Amazon, Wish, Flipkart..." defaultClass="block w-full md:w-2/3 lg:w-1/2" />
    </div>
    
    <div>
        <Alert color='yellow'>
            📹 Issue pasting links from Youtube? Just copy the whole line as text, Fylia will keep the relevant part of the URL!
        </Alert>
    </div>
    
    {#each links as link, i}
        <div class="mt-5" transition:slide|local>
            <p><b>Link #{i + 1}</b></p>
            <div class="bg-black/10 rounded-2xl grid gap-6 py-6 px-4 md:px-6 md:grid-cols-12">
                <div class="col-span-5">
                    <Input
                        color={withErrors.includes(i) ? "red" : "base"}
                        type="text"
                        id="creator:1"
                        placeholder="Link ({linkPlaceholder[(i + 1) % 2]})"
                        bind:value={links[i].link}
                        required
                        {defaultClass}
                        on:keyup={() => onLinkUrlChange(i)}
                    />
                </div>
                <div class="flex md:justify-center items-center">
                    <span><em>by</em></span>
                </div>
                <div class="col-span-4 md:col-span-4">
                    <Input
                        type="text"
                        id="link:1"
                        placeholder="Creator (ex. {!(i % 3) ? creatorsPlaceholder[0] : !(i % 2) ? creatorsPlaceholder[1] : creatorsPlaceholder[2]})"
                        required
                        {defaultClass}
                        bind:value={links[i].creator}
                    />
                </div>
                <div class="flex col-span-2 items-center md:justify-center text-black">
                    {#if i > 0}
                        <Button color="dark" size="sm" outline on:click={() => dispatch("removeItem", { i })}>
                            <div class="flex flex-row items-center justify-center">
                                <Trash />
                                <b class="md:hidden lg:block">Remove</b>
                            </div>
                        </Button>
                    {/if}
                </div>
            </div>
        </div>
    {/each}
    <style>
        .bg-gray-200.peer-focus\:ring-4 {
            background: black;
        }
    </style>

    <div class="mt-20 flex flex-row gap-3">
        <Button color="light"  on:click={() => dispatch("addItem")}>+ Add a link</Button>
    </div>

    <div class="mt-20">
        <Toggle color="red" bind:checked={addDelay}>Add a small delay showing who I am supporting</Toggle>
    </div>
    <div class="mt-20">
        <div class="flex flex-row items-start">
            <Toggle color="red" bind:checked={publicBundle} />
            <div>
                <Label>Make this Bundle public</Label>
                <small>Fylia is currently collecting custom Bundles from the community. <br /> Shared bundles will soon be browsable and available for everyone.</small>
            </div>
        </div>
    </div>
    <div class="mt-20 flex flex-row gap-3">
        <Button type="submit" color="red" on:click={(e) => (withErrors.length ? e.preventDefault() : dispatch("saveItem"))} disabled={withErrors.length}>Save</Button>
    </div>
</form>

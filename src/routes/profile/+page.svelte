<script lang="ts">
    import { goto } from "$app/navigation";
    import Footer from "$lib/components/Footer.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { Avatar, Button, Label, Spinner } from "flowbite-svelte";
    import { getContext, onMount } from "svelte";

    const user: App.StoreUser = getContext("user");
    const userStatus: App.StoreUserStatus = getContext("userStatus");
    let stats: any = [];

    // function deleteProfile(e: MouseEvent) {
    //     if (confirm("Do you really want to delete your profile? This action is irreversible!")) {
    //         if ($user) {
    //             // await supabase.from('baskets').delete().eq('user_id', $user.id);
    //         }
    //     }
    // }

    onMount(async () => {
        userStatus.subscribe((u) => {
            if (u === "none") goto("/");
        });

        user.subscribe(async (u) => {
            if (u) {
                stats = (await supabase.from("baskets").select("name,usage").eq("user_id", u.id)).data;
            }
        });
    });
</script>

<Nav />

<div class="w-full py-10 bg-primarybg min-h-screen p-3 md:p-10">
    <div class="p-5 rounded-xl container mx-auto bg-white border">
        {#if $user}
            <div class="mb-10 flex items-center space-x-4">
                <Avatar src={$user?.user_metadata?.avatar_url} />
                <div class="space-y-1 font-medium dark:text-white">
                    <div>{$user?.user_metadata?.full_name || $user?.email}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Registered with <span class="capitalize">
                            {$user.app_metadata.provider}
                        </span>
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <strong><i class="fa-solid fa-chart-simple text-blue-500" /> Usage</strong>
                {#if stats.length}
                    <ul class="list-disc p-5 pb-0">
                        {#each stats as s}
                            <li><Label>{s.name}: Used {s.usage} time(s)</Label></li>
                        {/each}
                    </ul>
                {:else}
                    <div class="mt-5">
                        <small>No usage data yet</small>
                    </div>
                {/if}
            </div>
            <!-- <div class="mt-10 pt-10 border-t">
                <Button color="red" outline size="sm"><Trash /> Delete your profile</Button>
            </div> -->
        {:else}
            <div class="flex justify-center">
                <Spinner color="gray" />
            </div>
        {/if}
    </div>
</div>

<Footer />

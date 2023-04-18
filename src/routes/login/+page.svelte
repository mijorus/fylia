<script lang="ts">
    import { Card, Label, Button, Input, Checkbox } from "flowbite-svelte";
    import Fa from "svelte-fa";
    import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
    import { supabase } from "$lib/supabaseClient";
    import type { Provider } from "@supabase/supabase-js";
    import { getContext } from "svelte";
    import { goto } from "$app/navigation";

    let loginError = false;

    const user: App.StoreUser = getContext("user");
    const userStatus: App.StoreUserStatus = getContext("userStatus");
    if ($user) {
        goto("/");
    }

    async function loginWithProvider(provider: Provider) {
        if (!["github", "google"].includes(provider)) {
            throw new Error("invalid provider");
        }

        userStatus.set('loading');
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider
        });
    }
</script>

<div class="h-screen w-screen flex flex-col md:flex-row">
    <div class="md:hidden mb-20 p-5">
        <a href="/" class="text-6xl" style="font-family: Somatic-Rounded; text-decoration: underline;">
            f<span style="color: purple; font-family: inherit;">y</span>lia
        </a>
    </div>
    <div class="w-full md:w-2/5 md:h-full pb-10">
        <div class="w-full md:h-2/3 p-2 flex flex-col items-center justify-center gap-5">
            <h1 class="font-bold text-4xl b">Get started now!</h1>
            <div class="bg-white border shadow rounded-xl w-full md:w-3/5 p-6 space-y-4 md:space-y-6 sm:p-8">
                {#if loginError}
                    <p class="text-red-500">Login error!</p>
                {/if}
                <form class="flex flex-col space-y-6" action="/">
                    <Button size="lg" type="submit" class="w-full1">
                        <i class="text-lg"><Fa icon={faGoogle} /></i>
                        &nbsp; Login with Google
                    </Button>
                    <Button size="lg" type="submit" class="w-full1" color="dark" on:click={() => loginWithProvider("github")}>
                        <i class="text-lg"><Fa icon={faGithub} /></i>
                        &nbsp; Login with Github
                    </Button>
                </form>
            </div>
        </div>
    </div>
    <div class="rounded-t-3xl md:rounded-none md:w-3/5 h-full bg-primarybg">
        <div class="h-2/3 flex flex-col justify-center p-5">
            <h1 class="font-extrabold bold text-3xl md:text-7xl font-bold my-10">Generate magic links and support your favourite creators!</h1>
            <a href="/" class="hidden md:inline-block text-6xl" style="font-family: Somatic-Rounded; text-decoration: underline;">
                f<span style="color: purple; font-family: inherit;">y</span>lia
            </a>
        </div>
    </div>
</div>

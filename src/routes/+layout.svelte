<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
    import type { Session, User } from "@supabase/supabase-js";
    import "../app.css";
    import { setContext } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import { PUBLIC_ENV } from "$env/static/public";
    import { Spinner } from "flowbite-svelte";

    const user: Writable<App.User> = writable();
    const userStatus: Writable<App.UserStatus> = writable("undefined");
    user.set(null);

    setContext("user", user);
    setContext("userStatus", userStatus);

    supabase.auth.onAuthStateChange((e, session) => {
        if (session) {
            user.set(session.user);
            userStatus.set(session.user ? "logged" : "none");

            if (PUBLIC_ENV == "dev") {
                console.log($userStatus);
                console.log(session.user);
            }
        } else {
            user.set(null);
            userStatus.set("none");
        }
    });
</script>

{#if $userStatus === "loading"}
    <div class="h-screen w-screen flex justify-center items-center">
        <Spinner color="gray" />
    </div>
{:else}
    <slot />
{/if}

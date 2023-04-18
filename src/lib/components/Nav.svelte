<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from "flowbite-svelte";
    import { getContext } from "svelte";

    const user: App.User = getContext("user");

    async function logout(e: MouseEvent) {
        e.preventDefault();

        await supabase.auth.signOut();
        window.location.replace("/");
    }
</script>

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <span style="font-family: Somatic-Rounded; font-size:xxx-large; text-decoration: underline;">
            f<span style="color: purple; font-family: inherit;">y</span>lia
        </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
        {#if $user}
            <NavLi href="/basket">My basket</NavLi>
            <NavLi href="/about">About</NavLi>
            <NavLi href="/logout" on:click={logout}>
                <span class="text-red-500">Logout</span>
            </NavLi>
        {:else}
            <NavLi href="/login"><span class="text-blue-500">Login</span></NavLi>
            <NavLi href="/github">Github</NavLi>
            <NavLi href="/about">About</NavLi>
            <!-- <NavLi href="/login">
                <Button outline color="red">Login</Button>
            </NavLi> -->
        {/if}
    </NavUl>
</Navbar>

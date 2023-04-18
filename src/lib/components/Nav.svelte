<script lang="ts">
    import { page } from "$app/stores";
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
            <NavLi active={$page.route.id == "/profile"} href="/profile"><i class="fas fa-user" /> Profile</NavLi>
            <NavLi active={$page.route.id == "/basket"} href="/basket"><i class="fa-regular fa-rectangle-list" /> My basket</NavLi>
            <NavLi href="https://github.com/mijorus/fylia"><i class="fas fa-code" /> Source Code</NavLi>
            <!-- <NavLi active={$page.route.id == "/about"} href="/about"><i class="fa-regular fa-circle-question" /> About</NavLi> -->
            <NavLi active={$page.route.id == "/logout"} href="/logout" on:click={logout}>
                <span class="text-red-500"><i class="fa-solid fa-arrow-right-from-bracket" /> Logout</span>
            </NavLi>
        {:else}
            <NavLi active={$page.route.id === "/login"} href="/login"><span><strong style="color: purple">Login</strong></span></NavLi>
            <NavLi href="https://github.com/mijorus/fylia"><i class="fas fa-code" /> Source Code</NavLi>
            <!-- <NavLi active={$page.route.id === "/about"} href="/about"><span><i class="fa-regular fa-circle-question" /> About</span></NavLi> -->
            <!-- <NavLi href="/login">
                <Button outline color="red">Login</Button>
            </NavLi> -->
        {/if}
    </NavUl>
</Navbar>

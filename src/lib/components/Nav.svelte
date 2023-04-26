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
            <a data-sveltekit-reload href="/profile">
                <NavLi active={$page.route.id == "/profile"}>
                    <i class="fas fa-user" /> Profile
                </NavLi>
            </a>
            <a data-sveltekit-reload href="/basket">
                <NavLi active={$page.route.id == "/basket"}>
                    <i class="fa-regular fa-rectangle-list" /> My basket
                </NavLi>
            </a>
            <a href="https://github.com/mijorus/fylia">
                <NavLi><i class="fas fa-code" /> Source Code</NavLi>
            </a>
            <!-- <NavLi active={$page.route.id == "/about"} href="/about"><i class="fa-regular fa-circle-question" /> About</NavLi> -->
            <a data-sveltekit-reload href="/logout">
                <NavLi active={$page.route.id == "/logout"} href="/logout" on:click={logout}>
                    <span class="text-red-500">
                        <i class="fa-solid fa-arrow-right-from-bracket" />
                        Logout
                    </span>
                </NavLi>
            </a>
        {:else}
            <a href="/login" data-sveltekit-reload>
                <NavLi active={$page.route.id === "/login"}>
                    <span><strong style="color: purple">Login</strong></span>
                </NavLi>
            </a>
            <a href="https://github.com/mijorus/fylia">
                <NavLi><i class="fas fa-code" /> Source Code</NavLi>
            </a>
            <!-- <NavLi active={$page.route.id === "/about"} href="/about"><span><i class="fa-regular fa-circle-question" /> About</span></NavLi> -->
            <!-- <NavLi href="/login">
                <Button outline color="red">Login</Button>
            </NavLi> -->
        {/if}
    </NavUl>
</Navbar>

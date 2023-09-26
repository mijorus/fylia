<script lang="ts">
    import { goto } from "$app/navigation";
    import Footer from "$lib/components/Footer.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import { Button, Label, Timeline, TimelineItem } from "flowbite-svelte";
    import { getContext, onMount } from "svelte";

    const user: App.StoreUser = getContext("user");

    user.subscribe((u) => {
        if (u) goto("/basket");
    });
</script>

<Nav />
<div class="min-h-screen">
    <section class="bg-primarybg">
        <div class="container mx-auto px-4 py-10 h-96 flex md:flex-row items-center">
            <div>
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Support your favourite creators with a click!</h1>
                <Button href="/login" size="xl" color="red" class="inline-flex items-center justify-center mr-3">Get started</Button>
            </div>
        </div>
    </section>

    <section class="my-10 p-2">
        <div class="container mx-auto">
            <div class="text-center">
                <h2 class="text-3xl font-extrabold md:text-4xl xl:text-5xl dark:text-white">How it works</h2>
            </div>
            <div class="flex flex-row justify-center pt-10">
                <Timeline>
                    <TimelineItem title="👤Create your account on Fylia" date="Step #1">
                        <div class="mt-4">
                            <Button href="/login" color="light" class="inline-flex items-center justify-center mr-3" outline>Register now</Button>
                        </div>
                    </TimelineItem>
                    <TimelineItem title="✨Create your magic link" date="Step #2">
                        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Magic links will open a different URL every time you visit them</p>
                    </TimelineItem>
                    <TimelineItem title="🔗Add the affiliation links of your favourite creators" date="Step #3">
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">By completing a purchase using an affiliation link, creators receive a commission!</p>
                    </TimelineItem>
                    <TimelineItem title="⭐Just save it as your favourite!" date="Step #4">
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">... and start using it right-away</p>
                    </TimelineItem>
                </Timeline>
            </div>
        </div>
    </section>

    <hr />
    <section class="container mx-auto my-10">
        <div class="text-center">
            <h2 class="text-3xl font-extrabold md:text-4xl xl:text-5xl dark:text-white">No more choosing who deserves the spotlight!</h2>
            <div class="mt-5">Start supporting your fellow creators today.</div>
            <div class="mt-10">
                <Button href="/login" size="xl" color="red" class="inline-flex items-center justify-center mr-3">Register now</Button>
            </div>
        </div>
    </section>
    <hr />
    <section class="my-20" />
</div>
<Footer />

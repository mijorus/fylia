<script>
    import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from "flowbite-svelte";
    const y = new Date().getFullYear()
</script>

<Footer class="z-20 w-full">
    <FooterCopyright href="/" by="Flowbite™" year={y} />
    <FooterLinkGroup ulClass="flex flex-col md:flex-row flex-wrap md:items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <!-- <FooterLink  href="/privacy_policy">Privacy Policy</FooterLink> -->
    </FooterLinkGroup>
</Footer>

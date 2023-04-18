import { PUBLIC_ENV } from "$env/static/public";

export const ssr = false;

if (PUBLIC_ENV === 'production') {
    console.log = function () { };
}
import { PUBLIC_ENV } from "$env/static/public";
import { supabase } from "./supabaseClient";

export async function save(insert: App.BundleDB) {
    const { data, error } = await supabase.from("baskets").insert(insert).select();
    if (PUBLIC_ENV === 'dev') {
        console.log("Created!", data);
    }

    if (error) {
        throw new Error("There was an error");
    }

    localStorage.setItem(`basket_${data[0].id}`, JSON.stringify(data[0]));

    return data;
}

export async function update(id: string, update: App.BundleDB) {
    const { data, error } = await supabase.from("baskets").update(update).eq('id', id).select();
    if (PUBLIC_ENV === 'dev') {
        console.log("Updated!", data);
    }

    if (error) {
        throw new Error("There was an error");
    }

    localStorage.setItem(`basket_${data[0].id}`, JSON.stringify(data[0]));

    return data;
}

export async function remove(id: string) {
    const { data, error } = await supabase.from('baskets').delete().eq('id', id);
    if (error) throw new Error(error.details);

    localStorage.removeItem(`basket_${id}`);
}
// See https://kit.svelte.dev/docs/types#app
import type { Writable } from "svelte/store";

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
        type User = User | null;
        type UserStatus = 'logged' | 'loading' | 'error' | 'none' | 'undefined';
        type StoreUser = Writable<App.User>;
        type StoreUserStatus = Writable<App.UserStatus>;

        interface Bundle {
            links: App.BundleLink[];
            name: string;
            addDelay?: boolean;
            id: string;
            firstUse: boolean;
            createdAt: number;
            updatedAt: number;
            state: number;
        }
        
        interface BundleData {
            links: App.BundleLink[];
            addDelay?: boolean;
        }
        
        interface BundleDB {
            id?: string;
            data: App.BundleData;
            name: string;
            last_use?: Date,
            first_use?: Date,
            last_visited?: number;
            public?: boolean;
            usage?: number;
            user_id: any;
            created_at?: string;
            updated_at?: string;
        }

        interface BundleLink {
            link: string;
            creator: string;
        }
    }
}

export { };

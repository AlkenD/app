import { PUBLIC_SERVER } from '$env/static/public';
import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';

export const pb = new PocketBase(PUBLIC_SERVER);

export const currentUser = writable(pb.authStore.model);

pb.autoCancellation(false);

pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.model);
});

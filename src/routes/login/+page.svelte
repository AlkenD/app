<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pb';
	import { onMount } from 'svelte';

	let username: string;
	let password: string;

	async function login() {
		await pb
			.collection('users')
			.authWithPassword(username, password)
			.then(() => {
				goto('/');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	onMount(() => {
		if (browser && $currentUser) {
			goto('/');
		}
	});
</script>

<form on:submit|preventDefault>
	<h1 class="text-indigo-500 text-xl font-semibold">Login</h1>
	<input required placeholder="Username" type="email" bind:value={username} />
	<input required placeholder="Password" type="password" bind:value={password} />
	<button on:click={login}>Login</button>
</form>

<style>
	form {
		@apply flex flex-col space-y-4 max-w-[600px] mx-auto mt-10;
	}
	input {
		@apply w-full p-4 bg-zinc-200 rounded-xl;
	}
	button {
		@apply p-4 rounded-xl bg-indigo-500 text-white font-semibold;
	}
</style>

<script lang="ts">
	import '../app.css';
	import Header from '$lib/header.svelte';
	import Title from '$lib/title.svelte';
	import { currentUser, pb } from '$lib/pb';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const logoutUser = () => {
		pb.authStore.clear();
		goto('/login');
	};

	onMount(() => {
		if (browser && !$currentUser) {
			goto('/login');
		}
	});
</script>

<div>
	<div class="sticky top-0 bg-white shadow-xl">
		<Header>
			<div><button class="text-white" on:click={logoutUser}>Logout</button></div>
		</Header>
		<Title />
	</div>
	<slot />
</div>

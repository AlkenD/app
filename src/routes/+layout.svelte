<script>
	import '../app.css';
	import Header from '$lib/header.svelte';
	import Title from '$lib/title.svelte';
</script>

<div>
	<div class="sticky top-0 bg-white shadow-xl">
		<Header />
		<Title />
	</div>
	<slot />
</div>

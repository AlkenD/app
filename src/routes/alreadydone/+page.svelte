<script>
	import Button from '$lib/button.svelte';
	const clearUser = async () => {
		localStorage.removeItem('student');
	};
</script>

<div class="max-w-[600px] mx-auto space-y-4">
	<div class="text-6xl font-bold text-red-500 text-center pt-10">Do not retry</div>
	<div>
		<a href="/"><Button on:click={clearUser}>Go Back</Button></a>
	</div>
</div>

<script>
	import Button from '$lib/button.svelte';
	const clearUser = async () => {
		localStorage.removeItem('student');
	};
</script>

<div class="max-w-[600px] mx-auto flex flex-col items-center space-y-4 pt-10">
	<img class="w-40 h-40" src="/gif.webp" alt="" />
	<div class="text-xl font-bold text-green-500">Vote Registered Successfully</div>
	<a class="w-full" href="/" on:click={clearUser}><Button>Next</Button></a>
</div>

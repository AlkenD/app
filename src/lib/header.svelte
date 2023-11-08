<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface StudentProps {
		name: string;
		uucms_id: string;
	}

	let student: StudentProps;

	let currentStudent: StudentProps;

	$: student = currentStudent;

	onMount(() => {
		if (browser) {
			const studentData = localStorage.getItem('student');
			if (studentData) {
				try {
					student = JSON.parse(studentData);
				} catch (error) {
					console.error('Error parsing JSON data:', error);
				}
			}
		}
	});
</script>

<header class="flex items-center justify-between relative p-4 overflow-hidden">
	<img class="w-20 h-20 aspect-square" src="/sfclogo.png" alt="" />
	<div class="text-center absolute left-0 right-0 mx-auto">
		<h1 class="text-4xl">St. Francis College</h1>
		<p>8th Main, 3rd Block Koramangala, Bangalore, 560034</p>
	</div>
	{#if student && Object.keys(student).length !== 0}
		<div class="font-bold">
			<div>UUCMSID: {student.uucms_id}</div>
			<div>Name: {student.name}</div>
		</div>
	{/if}
</header>

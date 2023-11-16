<script lang="ts">
	import { currentUser, pb } from '$lib/pb.js';
	import { onMount } from 'svelte';

	export let data;

	const countMap = new Map<string, number>();

	async function processVotes() {
		for (const entry of data.votes) {
			const position = entry.position;
			const candidate = entry.candidate;

			// Define a function to fetch candidate information
			const candiInfo = async () => {
				const info = await pb.collection('candidates').getOne(candidate);
				return info.name;
			};

			// Use await to get the candidate name
			const candidateName = await candiInfo();

			// Create a unique key based on position and candidate ID
			const key = `${position}-${candidateName}`;

			// Increment the count for this combination
			const count = countMap.get(key) || 0;
			countMap.set(key, count + 1);
		}

		countMap.forEach((count, key) => {
			console.log(`Position and Candidate Name: ${key}, Count: ${count}`);
		});
	}

	onMount(() => {
		if ($currentUser.admin === true) {
			processVotes();
		}
	});
</script>

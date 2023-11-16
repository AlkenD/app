<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { pb } from '$lib/pb';
	import { goto } from '$app/navigation';
	import Button from '$lib/button.svelte';

	interface Student {
		class: string;
		collectionId: string;
		collectionName: string;
		created: Date;
		id: string;
		name: string;
		updated: Date;
		uucms_id: string;
		voted: boolean;
	}

	let query = '';
	let isOpen: boolean = false;
	let dialog: HTMLDialogElement | null = null;
	let currentStudent: Student | string | undefined = 'Search Student...';
	let checkUUCMSID: any;
	let disabled = true;

	const getStudent = async () => {
		try {
			const response1: Student[] = await pb.collection('students').getFullList();
			const response2: any = await pb.collection('voted').getFullList();

			const queryUpperCase = query.toUpperCase();

			currentStudent = response1.find((student) => student.uucms_id === queryUpperCase);
			checkUUCMSID = response2.find((status: any) => status.uucms_id === queryUpperCase);

			if (typeof currentStudent !== 'string' && typeof currentStudent !== 'undefined') {
				if (checkUUCMSID && checkUUCMSID.voted === true) {
					disabled = true;
				} else {
					disabled = false;
				}
			}
		} catch (error) {
			console.error('Error fetching student data:', error);
		}
	};

	const confirmStudent = () => {
		if (currentStudent) {
			localStorage.setItem('student', JSON.stringify(currentStudent));
			goto('/voting');
		}
	};

	onMount(() => {
		if (browser && localStorage.getItem('student')) {
			goto('/voting');
		}
	});

	$: if (dialog && isOpen) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="rounded-xl min-w-[600px] p-4"
	bind:this={dialog}
	on:close={() => (isOpen = false)}
	on:click|self={() => dialog?.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<header class="font-semibold text-2xl text-yellow-500">Confirm Student ?</header>
		<div class="flex space-x-4 pt-2">
			<Button variant="secondary" on:click={() => dialog?.close()}>No</Button>
			<Button on:click={confirmStudent}>Yes</Button>
		</div>
	</div>
</dialog>

<div class="max-w-[600px] mx-auto p-4 space-y-2">
	<div class="space-y-2">
		<label class="font-semibold text-sm" for="query">UUCMS ID</label>
		<div class="flex space-x-2">
			<input
				placeholder="Enter your UUCMS ID"
				id="query"
				class="p-4 bg-zinc-200 rounded-lg w-full font-semibold uppercase"
				type="text"
				bind:value={query}
			/>
			<Button size="fit" on:click={getStudent}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-search"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
					<path d="M21 21l-6 -6" />
				</svg><span>Search</span></Button
			>
		</div>
	</div>
	<section class="p-4 bg-zinc-200 rounded-lg divide-y">
		{#if typeof currentStudent !== 'string' && typeof currentStudent !== 'undefined' && checkUUCMSID?.voted === true}
			<div class="text-xl text-center p-4 rounded-lg bg-red-500 font-bold">
				Warning: You are not permitted to revote.
			</div>
		{/if}
		{#if typeof currentStudent !== 'string' && typeof currentStudent !== 'undefined'}
			<table class="text-left">
				<tr>
					<th class="text-blue-500">Student Details</th>
				</tr>
				<tr>
					<th>UUCMS ID:</th>
					<td>{currentStudent.uucms_id || ''}</td>
				</tr>
				<tr>
					<th>NAME:</th>
					<td class="font-bold text-indigo-500">{currentStudent.name || ''}</td>
				</tr>
				<tr>
					<th>CLASS:</th>
					<td>{currentStudent.class || ''}</td>
				</tr>
			</table>
		{:else if typeof currentStudent === 'string' && currentStudent !== ''}
			<div class="text-lg font-semibold text-slate-400">Search Student...</div>
		{:else}
			<div class="text-lg font-semibold text-slate-400">Student Not Found</div>
		{/if}
	</section>
	<Button {disabled} on:click={() => (isOpen = true)}>Confirm Student</Button>
</div>

<style>
	th {
		@apply pr-10;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>

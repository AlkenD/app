<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Button from '$lib/button.svelte';
	import { onMount } from 'svelte';

	export let data;

	let currentStudent: { id: any };
	let isOpen = false;
	let dialog: HTMLDialogElement;

	$: if (dialog && isOpen) dialog.showModal();

	onMount(() => {
		if (browser) {
			if (localStorage.getItem('student') === null) {
				goto('/');
			} else {
				currentStudent = JSON.parse(localStorage.getItem('student') || '');
			}
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="rounded-xl min-w-[600px] p-4"
	bind:this={dialog}
	on:close={() => (isOpen = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<header class="text-xl font-semibold">Confirm Candidates ?</header>
		<div class="flex space-x-4 pt-2">
			<Button variant="secondary" on:click={() => dialog.close()}>Return</Button>
			<Button on:click={() => dialog.close()}>Vote</Button>
		</div>
	</div>
</dialog>

{#if currentStudent}
	<form id="candidatesForm" class="max-w-[600px] mx-auto p-4 space-y-12" method="POST">
		<input class="hidden" name="student_id" type="text" value={currentStudent.id} />
		{#each Object.keys(data) as category, index}
			<fieldset>
				<div class="bg-indigo-300 p-4">
					<h1 class="text-2xl font-semibold text-indigo-700">
						{index + 1})
						{(category.charAt(0).toUpperCase() + category.slice(1)).replace(
							/([a-z])([A-Z])/g,
							'$1 $2'
						)}
					</h1>
				</div>
				<ul>
					{#if Array.isArray(data[category])}
						{#each data[category] as candidate}
							<li>
								<label class="flex space-x-4">
									<div class="aspect-square w-60 rounded-lg overflow-hidden ring ring-indigo-500">
										<img
											class="object-cover w-full h-full"
											src={`http://localhost:8090/api/files/rvtayhlqzm64xkc/${candidate.id}/${candidate.photo}?token=`}
											alt=""
										/>
									</div>
									<div class="w-full">
										<div class="text-2xl font-semibold text-black">{candidate.name}</div>
										<div class="text-lg font-bold text-indigo-700">
											{#if candidate.semester === '5'}
												5th Semester
											{:else if candidate.semester === '3'}
												3rd Semester
											{:else}
												1st Semester
											{/if}
										</div>
									</div>
									<input required name={candidate.position} type="radio" value={candidate.id} />
								</label>
							</li>
						{/each}
					{/if}
				</ul>
			</fieldset>
		{/each}
		<div class="py-4">
			<Button type="submit">Submit Votes</Button>
		</div>
	</form>
{/if}

<style>
	fieldset {
		@apply space-y-2 bg-indigo-100 rounded-lg overflow-hidden;
	}

	ul {
		@apply divide-y divide-indigo-300;
	}

	li {
		@apply p-4;
	}

	label {
		@apply cursor-pointer;
	}

	input[type='radio'] {
		@apply h-10 w-10 my-auto;
	}

	input:checked {
		background-color: #ffd6bb;
		border: 1px solid #ff6600;
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

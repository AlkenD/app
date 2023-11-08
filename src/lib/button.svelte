<script lang="ts">
	import { cva } from 'class-variance-authority';
	import type { VariantProps } from 'class-variance-authority';

	export let variant: ButtonProps['variant'] = 'primary';
	export let size: ButtonProps['size'] = 'full';
	export let disabled: boolean = false;
	export let type: 'button' | 'submit' = 'button';

	type ButtonProps = VariantProps<typeof buttonStyles>;

	const buttonStyles = cva(
		['rounded-lg p-4 font-bold flex justify-center items-center space-x-2'],
		{
			variants: {
				variant: {
					primary: [
						'text-white bg-indigo-500 focus:bg-indigo-600 active:bg-indigo-700 disabled:text-zinc-300 disabled:bg-indigo-100'
					],
					secondary: ['bg-white', 'text-gray-800', 'border-gray-400', 'hover:bg-gray-100']
				},
				size: {
					full: 'w-full',
					fit: 'w-fit'
				}
			},
			defaultVariants: {
				variant: 'primary',
				size: 'full'
			}
		}
	);
</script>

<button {type} on:click {disabled} class={buttonStyles({ variant, size })}><slot /></button>

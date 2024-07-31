<script lang="ts">
	import { onMount } from 'svelte';

	// LightballCursor normal behavior
	export function normal() {
		const cursor = document.getElementById('lightball')!;
		cursor.style.width = '16px';
		cursor.style.height = '16px';
		cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
	}

	// LightballCursor lights up behavior (hover, click)
	export function lightup() {
		const cursor = document.getElementById('lightball')!;
		cursor.style.width = '24px';
		cursor.style.height = '24px';
		cursor.style.backgroundColor = 'rgba(255, 255, 255, 1)';
	}

	onMount(() => {
		document.addEventListener('mousemove', (e) => {
			const cursor = document.getElementById('lightball')!;
			cursor.style.left = e.clientX + 'px';
			cursor.style.top = e.clientY + 'px';
		});

		document.addEventListener('mousedown', () => {
			lightup();
		});

		document.addEventListener('mouseup', () => {
			normal();
		});
	});
</script>

<div
	id="lightball"
	class="w-4 h-4 -left-2 -top-2 bg-white/60 rounded-full mix-blend-screen fixed pointer-events-none z-[9999]"
></div>

<style>
	:global(body) {
		cursor: none;
	}

	#lightball {
		transition:
			width 0.3s,
			height 0.3s,
			background-color 0.3s;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.6);
	}
</style>

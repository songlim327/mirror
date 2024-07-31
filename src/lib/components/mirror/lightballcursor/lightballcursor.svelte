<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const cursor = document.getElementById('lightball')!;

		document.addEventListener('mousemove', (e) => {
			cursor.style.left = e.clientX + 'px';
			cursor.style.top = e.clientY + 'px';
		});

		document.addEventListener('mousedown', () => {
			cursor.style.width = '24px';
			cursor.style.height = '24px';
			cursor.style.backgroundColor = 'rgba(255, 255, 255, 1)';
		});

		document.addEventListener('mouseup', () => {
			cursor.style.width = '16px';
			cursor.style.height = '16px';
			cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
		});
	});
</script>

<div
	id="lightball"
	class="w-4 h-4 -left-2 -top-2 bg-white/80 rounded-full mix-blend-screen fixed pointer-events-none z-[9999]"
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
        box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.8);
	}
</style>

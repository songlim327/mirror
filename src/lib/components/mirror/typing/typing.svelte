<script lang="ts">
	import { onMount } from 'svelte';
	import Typed from 'typed.js';

	let content: Array<string>;

	export { content };

	onMount(() => {
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const typed = new Typed('#terminal-content', {
						strings: content,
						typeSpeed: 20,
						onComplete(self) {
							self.cursor.remove();
						}
					});
					observer.unobserve(entry.target);
				}
			});
		});

		observer.observe(document.querySelector('#terminal-content')!);
	});
</script>

<div class="p-2">
	<span id="terminal-content" class="font-fira"></span>
</div>

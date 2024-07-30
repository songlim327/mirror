<script lang="ts">
	import { onMount } from 'svelte';
	import Typed from 'typed.js';

	let content: Array<string>;

	export { content };

	onMount(() => {
		const typed = new Typed('#terminal-content', {
			strings: content,
			typeSpeed: 20,
			onComplete(self) {
				self.cursor.remove();
			}
		});
	});
</script>

<div class="p-2">
	<span id="terminal-content" class="font-mono"></span>
</div>

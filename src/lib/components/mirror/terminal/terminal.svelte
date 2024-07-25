<script lang="ts">
	import { onMount } from 'svelte';
	import Typed from 'typed.js';

	let content: Array<string>;

	export { content };

	onMount(() => {
		const typed = new Typed('#terminal-content', {
			strings: content,
			typeSpeed: 80,
            smartBackspace: true,
			onComplete(self) {
				self.cursor.remove();
			}
		});
	});
</script>

<div class="p-2">
	<span id="terminal-content"></span>
</div>

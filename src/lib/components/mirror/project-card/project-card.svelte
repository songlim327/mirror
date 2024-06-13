<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Github, Star, GitFork } from 'lucide-svelte';

	let name: string;
	let desc: string;
	let star: Number;
	let fork: Number;
	let lang: string;

	export { name, desc, star, fork, lang };
</script>

<div class="grid grid-cols-6 gap-2 w-full rounded-md p-4 border border-yellow-200">
	<div class="col-span-5 font-semibold">{name}</div>
	<div class="col-span-1"><Github size={28} class="float-end border rounded-full p-1" /></div>
	<div class="col-span-6 text-sm text-gray-400">
		{desc}
	</div>
	<div class="col-span-6"><Badge variant="outline">{lang}</Badge></div>
	<div class="col-span-6 flex space-x-2 mt-4">
		<div class="flex space-x-1">
			<Star size={16} />
			<span class="text-xs">{star}</span>
		</div>
		<div class="flex space-x-1">
			<GitFork size={16} />
			<span class="text-xs">{fork}</span>
		</div>
	</div>
</div>
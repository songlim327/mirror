<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Github, Star, GitFork } from 'lucide-svelte';
	import GithubImg from '$lib/assets/github.png';
	import Action from './action.svelte';

	let name: string;
	let desc: string;
	let star: number;
	let fork: number;
	let lang: string;
	let url: string;

	export { name, desc, star, fork, lang, url };

	// openRepository opens the respository in a new tab
	const openRepository = () => {
		window.open(url, '_blank');
	};
</script>

<!-- Hover background image -->
<button class="text-start hover:cursor-none" on:click={openRepository}>
	<div
		class="relative w-full rounded-md p-6 border border-gray-300 dark:border-gray-500 group/card"
	>
		<div class="absolute inset-0.5 -z-50">
			<img
				src={GithubImg}
				alt="Github"
				class="w-full h-full object-cover opacity-0 transition-opacity rounded-md group-hover/card:opacity-10 group-hover/card:transition-opacity group-hover/card:ease-in group-hover/card:duration-500"
			/>
		</div>
		<div class="grid grid-cols-6 gap-2">
			<div
				class="col-span-5 font-bold text-xl group-hover/card:underline group-hover/card:underline-offset-4 group-hover/card:decoration-2"
			>
				{name}
			</div>
			<div class="col-span-1">
				<Github
					size={32}
					class="float-end border rounded-full p-1 group-hover/card:opacity-0 group-hover/card:transition-opacity group-hover/card:ease-out group-hover/card:duration-500"
				/>
			</div>
			<div class="col-span-6 text-sm line-clamp-1 text-gray-600 dark:text-gray-400">
				{desc}
			</div>
			<div class="col-span-6 mt-2 -left-1">
				<Badge
					variant="outline"
					class="text-gray-600 dark:text-gray-400 group-hover/card:border-gray-600">{lang}</Badge
				>
			</div>
			<div class="col-span-6 flex space-x-4 mt-6">
				<Action value={star}>
					<Star size={20} />
				</Action>
				<Action value={fork}>
					<GitFork size={20} />
				</Action>
			</div>
		</div>
	</div>
</button>

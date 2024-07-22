import { writable, derived } from 'svelte/store';
import type { GithubRepos } from './type';

export const repos = writable<GithubRepos[]>([]);

// Filter top 6 repositories for display
export const topSixRepos = derived(repos, ($repos) => {
	const sortedRepos = $repos.sort((a, b) => {
		const aCount = a.stargazers_count + a.forks_count;
		const bCount = b.stargazers_count + b.forks_count;
		return aCount > bCount ? -1 : aCount === bCount ? 0 : 1;
	});
	return sortedRepos.slice(0, 6);
});

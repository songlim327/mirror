import { writable, derived } from 'svelte/store';
import type { GithubRepos } from './type';

export const repos = writable<GithubRepos[]>([]);

// popularRepoSort is a custom sort function to sort repositories based on popularity (sum of stars and forks)
const popularRepoSort = (a: GithubRepos, b: GithubRepos) => {
	const aCount = a.stargazers_count + a.forks_count;
	const bCount = b.stargazers_count + b.forks_count;
	return aCount > bCount ? -1 : aCount === bCount ? 0 : 1;
};

// topSixRepos returns top 6 repositories and details for each repository
export const topRepos = derived(repos, ($repos) => {
	const sortedRepos = $repos.sort(popularRepoSort);
	return sortedRepos.slice(0, 6);
});

// topLangs returns top 6 languages the github users had used
export const topLangs = derived(repos, ($repos) => {
	const sortedRepos = $repos.sort(popularRepoSort);
	return [...new Set(sortedRepos.map((r) => r.language))].slice(0, 6).join(', ');
});

// reposCount returns the number of public repositories given the github user
export const reposCount = derived(repos, ($repos) => {
	return $repos.length;
});

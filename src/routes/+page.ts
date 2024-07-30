import type { PageLoad } from './$types';
import { config } from '../config/config';
import { getGithubRepos, getGithubUser } from '$lib/api';

export const load: PageLoad = async ({ parent }) => {
	const { queryClient } = await parent();
	const { github } = config;

	// Fetch github repositories given github handler
	await queryClient.prefetchQuery({
		queryKey: ['repos'],
		queryFn: async () => await getGithubRepos(github)
	});

	// Fetch github user given github handler
	await queryClient.prefetchQuery({
		queryKey: ['user'],
		queryFn: async () => await getGithubUser(github)
	});
};

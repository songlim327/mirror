import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';

export const load = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: 15,
				refetchOnMount: false
			}
		}
	});

	return { queryClient };
};

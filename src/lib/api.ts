// getGithubRepos call github API and retrieve repositories info
export const getGithubRepos = async (github: string) => {
	const response = await fetch(
		`https://api.github.com/users/${github}/repos?sort=pushed&type=public`
	);

	if (!response.ok) {
		throw new Error('fetch github repos failed');
	}
	return await response.json();
};

// getGithubUser call github API and retrieve user info
export const getGithubUser = async (github: string) => {
	const response = await fetch(`https://api.github.com/users/${github}`);

	if (!response.ok) {
		throw new Error('fetch github user failed');
	}
	return await response.json();
};

<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { createQuery } from '@tanstack/svelte-query';
	import { config } from '../config/config';
	import type { GithubRepo } from '$lib/type';
	import { getGithubRepos, getGithubUser } from '$lib/api';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import {
		Sun,
		Moon,
		Github,
		Linkedin,
		Facebook,
		Twitter,
		Mail,
		Download,
		Star,
		GitFork,
		SquareTerminal
	} from 'lucide-svelte';
	import { ProjectCard, ProjectCardSkeleton } from '$lib/components/mirror/project-card';
	import { Meteor } from '$lib/components/mirror/meteor';
	import { Typing } from '$lib/components/mirror/typing';
	import { Header } from '$lib/components/mirror/header';
	import { LightballCursor } from '$lib/components/mirror/lightballcursor';
	import FarmImg from '$lib/assets/farm.png';
	import { Content } from '$lib/components/ui/card';

	const { profilePicture, name, description, github, linkedin, facebook, twitter, email, resume } =
		config;

	type iconType = typeof Sun;
	const socialMap: Record<string, iconType> = {
		linkedin: Linkedin,
		facebook: Facebook,
		twitter: Twitter,
		email: Mail
	} as const;
	let lightballCursor: LightballCursor;

	// popularRepoSort is a custom sort function to sort repositories based on popularity (sum of stars and forks)
	const popularRepoSort = (a: GithubRepo, b: GithubRepo) => {
		const aCount = a.stargazers_count + a.forks_count;
		const bCount = b.stargazers_count + b.forks_count;
		return aCount > bCount ? -1 : aCount === bCount ? 0 : 1;
	};

	// qRepos creates a query to fetch a list of repositories for a given handler
	const qRepos = createQuery({
		queryKey: ['repos'],
		queryFn: async () => await getGithubRepos(github),
		select: (data) => {
			// Sort repositories
			const sortedRepos = data.sort(popularRepoSort);
			const topRepos = sortedRepos.slice(0, 6);
			const topLangs = [...new Set(sortedRepos.map((r: GithubRepo) => `"${r.language}"`))]
				.slice(0, 6)
				.join(', ');

			return { ...data, topRepos, topLangs };
		}
	});

	// qUser creates a query to fetch a github user details for a given handler
	const qUser = createQuery({
		queryKey: ['user'],
		queryFn: async () => await getGithubUser(github),
		select: (data) => {
			if (data.hireable === null) {
				data.hireable = false;
			}
			return { ...data };
		}
	});

	// openGithub navigate to github profile
	const openGitHub = () => {
		window.open(`https://github.com/${github}`, '_blank');
	};

	// openResume navigate to specified resume url
	const openResume = () => {
		window.open(resume, '_blank');
	};
</script>

<LightballCursor bind:this={lightballCursor} />
<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-16 max-w-screen-2xl items-center mx-auto">
		<div class="mr-4 md:flex">
			<span class="text-lg font-bold sm:inline-block">@{github}</span>
		</div>
		<div class="flex flex-1 items-center justify-end">
			<nav class="flex items-center space-x-2">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button class="hover:cursor-none" variant="ghost" size="icon" on:click={openGitHub}>
							<Github size={28} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Github</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button class="hover:cursor-none" variant="ghost" size="icon" on:click={toggleMode}>
							<Sun
								class="absolute h-7 w-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
								size={28}
							/>
							<Moon
								class="h-7 w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
								size={28}
							/>
							<span class="sr-only">Toggle theme</span>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content class="block dark:hidden">Change to dark theme</Tooltip.Content>
					<Tooltip.Content class="hidden dark:block">Change to light theme</Tooltip.Content>
				</Tooltip.Root>
			</nav>
		</div>
	</div>
</header>

<div id="mirror-content" class="container">
	<Meteor>
		<!-- Main section -->
		<div
			class="mx-auto flex max-w-[1000px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20"
		>
			<img src={profilePicture} alt="profile" class="rounded-full" width={192} height={192} />
			<!-- Name -->
			<h1 class="text-2xl font-bold font-fira">{name}</h1>
			<!-- Description -->
			<span class="text-center text-pretty">{description}</span>
			<!-- Social Toolbar -->
			<div class="flex space-x-2">
				{#each Object.entries(socialMap) as [socialKey, Icon]}
					{#if config[socialKey] && config[socialKey] !== ''}
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button
									variant="outline"
									size="icon"
									class="h-8 w-8 hover:cursor-none"
									on:click={() => {
										console.log(config[socialKey]);
										console.log(socialKey);
									}}><Icon size={16} /></Button
								>
							</Tooltip.Trigger>
							<Tooltip.Content>{socialKey}</Tooltip.Content>
						</Tooltip.Root>
					{/if}
				{/each}
			</div>
			<!-- Get resume button -->
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button class="hover:cursor-none" on:click={openResume}
						><Download class="mr-2 h-4 w-4" />RESUME</Button
					>
				</Tooltip.Trigger>
				<Tooltip.Content>View resume</Tooltip.Content>
			</Tooltip.Root>
		</div>
	</Meteor>

	<!-- Command line styled personal details -->
	<div
		class="mx-auto max-w-[1000px] flex flex-col items-center py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20"
	>
		<div class="w-10/12 flex items-center">
			<span class="flex-1 bg-gradient-to-l from-white h-0.5 shadow-lg shadow-white/50" />
			<h1 class="shrink-0 p-4 text-4xl/8 font-extrabold">Personal Details</h1>
			<span class="flex-1 bg-gradient-to-r from-white h-0.5 shadow-lg shadow-white/50" />
		</div>

		<div class="w-full grid grid-cols-12 gap-6 mt-4">
			<div class="w-10/12 col-span-12 mx-auto">
				<!-- Terminal header -->
				<div
					class="relative rounded-t-lg p-2 flex justify-center border border-[#dfd9de] dark:border-[#242426] bg-[#f3f3f3] dark:bg-[#3c3d40]"
				>
					<div class="absolute flex gap-2 my-1 ml-3 left-0">
						<span class="rounded-full p-2 bg-[#ff5953]"></span>
						<span class="rounded-full p-2 bg-[#febc2e]"></span>
						<span class="rounded-full p-2 bg-[#28c940]"></span>
					</div>
					<div
						class="flex flex-row gap-1 items-center font-bold font-mono text-stone-800 dark:text-stone-300"
					>
						<SquareTerminal class="w-5 h-5" />{github}
					</div>
				</div>
				<!-- Terminal body (personal detail json) -->
				<div
					class="pl-1 h-96 bg-[#ffffff]/50 dark:bg-[#282c35]/50 w-full rounded-b-2xl border-x border-b border-[#dfd9de] dark:border-[#242426] text-zinc-800 dark:text-[#b9bfcb]"
				>
					{#if $qUser.isLoading || $qRepos.isLoading}
						<Typing content={['Loading geek info...']}></Typing>
					{:else if $qUser.isError}
						<Typing content={[`Failed in calling Github API. (Error: ${$qUser.error.message})`]}
						></Typing>
					{:else if $qRepos.isError}
						<Typing content={[`Failed in calling Github API. (Error: ${$qRepos.error.message})`]}
						></Typing>
					{:else if $qUser.isSuccess && $qRepos.isSuccess}
						<Typing
							content={[
								`const geek = {<br>&emsp;name: "${$qUser.data.name}", <br>&emsp;company: "${$qUser.data.company}", <br>&emsp;location: "${$qUser.data.location}", <br>&emsp;email: "${email}", <br>&emsp;repositories: ${$qUser.data.public_repos}, <br>&emsp;gists: ${$qUser.data.public_gists}, <br>&emsp;followers: ${$qUser.data.followers}, <br>&emsp;following: ${$qUser.data.following}, <br>&emsp;skills: [${$qRepos.data.topLangs}], <br>&emsp;openToWork: ${$qUser.data.hireable}, <br> }`
							]}
						></Typing>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Github repository section -->
	<div
		class="mx-auto max-w-[1000px] flex flex-col items-center py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20"
	>
		<Header>
			<h1 class="text-4xl/8 font-extrabold">Github Repositories</h1>
		</Header>
		<div class="w-full grid grid-cols-2 gap-6 mt-4">
			<!-- Card -->
			{#if $qRepos.isLoading}
				{#each { length: 4 } as _, i}
					<ProjectCardSkeleton />
				{/each}
			{:else if $qRepos.isError}
				<div class="col-span-2 w-full flex flex-col items-center">
					<img src={FarmImg} alt="error" width={512} height={512} />
					<p>
						Failed in calling Github API. (Error: {$qRepos.error.message}) Visit
						<a
							href={`https://github.com/${github}`}
							class="hover:font-medium hover:underline hover:text-foreground">github</a
						>
					</p>
				</div>
			{:else if $qRepos.isSuccess}
				{#each $qRepos.data.topRepos as repo}
					<ProjectCard
						on:mouseenter={() => {
							lightballCursor.lightup();
						}}
						on:mouseleave={() => {
							lightballCursor.normal();
						}}
						name={repo.name}
						desc={repo.description}
						star={repo.stargazers_count}
						fork={repo.forks_count}
						lang={repo.language}
						url={repo.html_url}
					/>
				{/each}
			{/if}
		</div>
	</div>
</div>

<!-- Footer -->
<footer class="w-full border-t-2 p-4">
	<div class="container flex justify-between max-w-screen-2xl items-center text-muted-foreground">
		<div>
			Built & designed with 💙 by <a
				href="https://github.com/songlim327"
				class="underline font-medium hover:text-foreground hover:cursor-none">songlim327</a
			>
		</div>
		<div class="flex gap-4">
			<div class="flex gap-1 items-center hover:underline hover:text-foreground"></div>
			<Tooltip.Root>
				<Tooltip.Trigger
					class="flex gap-1 items-center hover:underline hover:text-foreground hover:cursor-none"
				>
					<Star class="h-4 w-4" />Star
				</Tooltip.Trigger>
				<Tooltip.Content>Star on Github</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger
					class="flex gap-1 items-center hover:underline hover:text-foreground hover:cursor-none"
				>
					<GitFork class="h-4 w-4" />Fork
				</Tooltip.Trigger>
				<Tooltip.Content>Fork on Github</Tooltip.Content>
			</Tooltip.Root>
		</div>
	</div>
</footer>

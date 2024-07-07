<script>
	import { cn } from '$lib/utils';

	let meteors = Array(10)
		.fill(null)
		.map(() => ({
			left: Math.random() * 100,
			delay: Math.random() * 2,
			duration: 2 + Math.random() * 8
		}));
</script>

<div class={cn($$restProps.class, 'layout')}>
	<div class="meteor-background">
		{#each meteors as meteor}
			<div
				class="meteor bg-gradient-to-b from-transparent to-cyan-800 dark:to-slate-300"
				style="
        --initial-left: {meteor.left}%;
        left: {meteor.left}%;
        animation-delay: {meteor.delay}s;
        animation-duration: {meteor.duration}s;
        "
			></div>
		{/each}
	</div>

	<div class="content-container">
		<slot />
	</div>
</div>

<style>
	.layout {
		position: relative;
		width: 100%;
		overflow: hidden;
	}

	.meteor-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.meteor {
		position: absolute;
		width: 2px;
		height: 50px;
		top: -50px;
		transform: rotate(-45deg);
		animation: meteor linear infinite;
	}

	@keyframes meteor {
		0% {
			opacity: 1;
		}
		100% {
			top: calc(100%);
			left: calc(var(--initial-left) + 36%);
			opacity: 0;
		}
	}

	.content-container {
		position: relative;
		z-index: 2;
	}
</style>

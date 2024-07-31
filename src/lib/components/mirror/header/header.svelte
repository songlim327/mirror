<script lang="ts">
</script>

<div class="w-10/12 flex items-center">
	<span class="flex-1 bg-gradient-to-l from-white h-0.5 shadow-lg shadow-white/50" />
	<slot />
	<span class="flex-1 bg-gradient-to-r from-white h-0.5 shadow-lg shadow-white/50" />
</div>

<style>
	div :global(> :nth-child(2)) {
		flex-shrink: 0;
		padding: 16px;
	}
</style>

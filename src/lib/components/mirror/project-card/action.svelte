<script lang="ts">
	let value: number;

	export { value };
</script>

<div class="flex space-x-1 group">
	<span
		class="text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100"
	>
		<slot />
	</span>

	<span
		class="text-sm text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100"
		>{value}</span
	>
</div>

<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
</script>

<div class="relative w-full rounded-md p-6 border border-gray-300 dark:border-gray-500">
	<div class="grid grid-cols-6 gap-2">
		<div class="col-span-5 font-bold text-xl">
			<Skeleton class="h-8 w-full" />
		</div>
		<div class="col-span-1">
			<Skeleton class="float-end border rounded-full p-1 w-8 h-8" />
		</div>
		<div class="col-span-6">
			<Skeleton class="h-5 w-full" />
		</div>
		<div class="col-span-6 mt-2 -left-1">
			<Skeleton class="w-9 h-4 rounded-md" />
		</div>
		<div class="col-span-6 flex space-x-4 mt-6">
			<Skeleton class="w-20 h-5" />
		</div>
	</div>
</div>

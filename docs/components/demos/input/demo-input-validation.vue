<script setup lang="ts">
import { ref, computed} from 'vue'
const username = ref('')
const hasError = computed(()=> {
	return username.value.trim() === ''  ? 'This is required' : undefined
})
</script>

<template>
	<div class="grid-row sm:grid-cols-2 place-items-stretch">
		<div>
			<virgo-input
				v-model="username"
				:error="hasError"
				label="Username"
				hint="Error message will get displayed here"
			/>
		</div>
	</div>
</template>

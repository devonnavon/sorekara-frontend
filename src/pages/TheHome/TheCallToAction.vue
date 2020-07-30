<!-- src/pages/TheHome/TheCallToAction.vue -->
<template>
	<div class="flex flex-col align-center overflow-hidden font-display">
		<img
			class="object-contain animate-spin-slow py-2 px-2"
			src="src/assets/circle-text.svg"
		/>
		<div class="text-orange font-semibold text-sm text-center">
			{{ callToAction }}
		</div>
		<div class="text-orange font-semibold text-sm text-center">
			{{ textBody }}
		</div>
	</div>
</template>
<script>
export default {
	name: 'TheCallToAction',
	components: {},

	data() {
		return {
			brandName: 'SOREKARA',
			callToAction: '¡TRY IT!',
			textBody: `A place to commemorate your ephemeral event. Share pictures, songs, pdfs, merch, thoughts, gratitude, whatever you want. Create connections within your audience. Password protected so you control who is allowed inside.
    Enjoy your stay!`,
		};
	},
};
</script>
<style></style>

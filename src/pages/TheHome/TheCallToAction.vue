<!-- src/pages/TheHome/TheCallToAction.vue -->
<template>
	<div
		class="flex flex-col align-center overflow-hidden font-display w-100% pb-16 sm:w-3/5 mx-auto"
	>
		<img
			class="object-contain py-2 px-2 -mb-10"
			src="src/assets/curved-text.svg"
		/>
		<div class="text-orange font-semibold text-lg text-center">
			{{ callToAction }}
		</div>
		<div class="text-orange font-semibold text-sm text-center pt-10">
			{{ textBody }}
		</div>
		<div class="text-orange font-semibold text-sm text-center pt-3">
			{{ enjoy }}
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
			textBody: `A place to commemorate your ephemeral event. Share pictures, songs, pdfs, merch, thoughts, gratitude, whatever you want. Create connections within your audience. Password protected so you control who is allowed inside.`,
			enjoy: 'Enjoy your stay!',
		};
	},
};
</script>
<style></style>

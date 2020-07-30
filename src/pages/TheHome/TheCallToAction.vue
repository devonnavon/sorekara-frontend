<!-- src/pages/TheHome/TheCallToAction.vue -->
<template>
	<div class="flex flex-col align-center">
		<svg viewBox="0 0 300 150" fill="none">
			<path
				id="curve"
				d="M189 87C189 39.5035 146.915 1 95 1C43.0852 1 1 39.5035 1 87"
				fill="transparent"
			/>

			<text width="120">
				<textPath
					xlink:href="#curve"
					side="right"
					class="font-display text-orange text-xl pb-10 font-semibold fill-current"
				>
					S O R E K A R A
				</textPath>
			</text>
		</svg>

		<div>{{ brandName }}</div>
		<div>{{ callToAction }}</div>
		<div>{{ textBody }}</div>
	</div>
</template>
<script>
export default {
	name: 'TheCallToAction',
	components: {},

	data() {
		return {
			brandName: 's o r e k a r a',
			callToAction: '¡TRY IT!',
			textBody: `A place to commemorate your ephemeral event. Share pictures, songs, pdfs, merch, thoughts, gratitude, whatever you want. Create connections within your audience. Password protected so you control who is allowed inside.
    Enjoy your stay!`,
		};
	},
};
</script>
<style></style>

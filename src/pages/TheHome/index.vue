<!-- src/pages/TheHome/index.vue -->
<template>
	<div>
		<TheQuestionList></TheQuestionList>
		<TheAnswerList></TheAnswerList>
		<TheCallToAction></TheCallToAction>
	</div>
</template>
<script>
import TheQuestionList from './TheQuestionList.vue';
import TheAnswerList from './TheAnswerList.vue';
import TheCallToAction from './TheCallToAction.vue';

export default {
	name: 'TheHome',
	components: {
		TheQuestionList,
		TheAnswerList,
		TheCallToAction,
	},

	data() {
		return {
			questionTitle:
				'What makes an event feel substantial? Even after the fact?',
			questions: [
				'The space? A unique environment to associate it to?',
				'Is it social? Seeing expected and unexpected people, making friends, and having side conversations.',
				'Or is it simply the intimacy of gathering collectively.',
				'Artifacts? Whether it be pictures, merch, wristbands, and etc.',
				'Connection to the artist or organizer?',
			],
			answers: [
				{
					title: 'the space',
					text:
						'Curate your post event space just as you would the event itself. Choose fonts, colors, background images, layouts, and more!',
				},
				{
					title: 'the artifacts',
					text:
						'A place to hold all “things” related to your event. Further readings, slides, songs, recordings, pictures, merch, it’s up to you.',
				},
				{
					title: 'the social',
					text:
						'Encourage connections within your audience. Facilitate further discussion, exchanging of contact info, and hopefully the creation of smaller, tighter knit communities.',
				},
				{
					title: 'the host connection',
					text:
						'Engagement with your audience doesn’t have to end when the event does. Share thoughts, have conversations, make friends!',
				},
				{
					title: 'the collective intimacy',
					text:
						'Ultimately, sorekara aims to provide a space where you can revel in the post event glow with your community of like-minded folks.',
				},
			],
		};
	},
};
</script>
<style></style>

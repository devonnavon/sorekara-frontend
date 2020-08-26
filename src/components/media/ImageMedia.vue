<template>
	<div>
		<VueFileAgent
			v-show="componentState === 'VueFileAgent'"
			ref="vueFileAgent"
			:theme="'list'"
			:multiple="false"
			:deletable="true"
			:meta="true"
			:accept="'image/*,.zip'"
			:maxSize="'10MB'"
			:maxFiles="14"
			:helpText="'Choose images or zip files'"
			:errorText="{
				type: 'Invalid file type. Only images or zip Allowed',
				size: 'Files should not exceed 10MB in size',
			}"
			@select="filesSelected($event)"
			@beforedelete="onBeforeDelete($event)"
			@delete="fileDeleted($event)"
			class="border border-dashed border-orange"
		></VueFileAgent>
		<div v-show="componentState === 'Loading'">loading</div>
		<!-- <VueEllipseProgress
			v-show="componentState === 'Loading'"
			:is="component"
			:progress="progress"
			:determinate="determinate"
			color="#7579ff"
			empty-color="#324c7e"
			:size="180"
			:thickness="thickness"
			:emptyThickness="emptyThickness"
			:lineMode="lineMode"
			animation="rs 700 1000"
			fontSize="1.5rem"
			font-color="white"
			:loading="loading"
			:no-data="noData"
			:dot="dot"
		></VueEllipseProgress> -->
		<img v-show="componentState === 'ImageMediaItem'" :src="newUrl" />
	</div>
</template>
<script>
import bus from '../../bus';

import VueFileAgentPlugin from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
// import VueEllipseProgress from 'vue-ellipse-progress';
// import Interval from '@/utils/interval';
// import randomNumberInRange from '@/utils/randomNumberInRange';
// import props from '@/components/Examples/examplesProps';

import uuid from 'uuid';

export default {
	name: 'ImageMedia',
	props: {
		url: String,
		id: String,
	},
	components: {
		VueFileAgent: VueFileAgentPlugin.VueFileAgent,
		// VueEllipseProgress,
	},
	created() {
		if (this.url) {
			this.componentState = 'ImageMediaItem';
			this.newUrl = this.url;
		} else {
			this.componentState = 'VueFileAgent';
		}
	},
	// mounted() {
	// 	Interval.addTask(this.randomizeOptions);
	// },
	data() {
		return {
			fileRecordsForUpload: [],
			componentState: null,
			newUrl: null,
			progress: 45,
			lineModes: [
				'normal',
				'in',
				'in-over',
				'out',
				'out-over',
				'top',
				'bottom',
			],
			thickness: 3,
			emptyThickness: 3,
			dot: { size: 1, width: '1px' },
			lineMode: 'normal 0',
		};
	},
	watch: {
		newUrl(newOne, oldOne) {
			console.log(newOne);
			this.componentState = 'ImageMediaItem';
		},
	},

	methods: {
		uploadFiles() {
			// Using the default uploader. You may use another uploader instead.

			this.$refs.vueFileAgent.upload(this.fileRecordsForUpload);
			this.fileRecordsForUpload = [];
		},
		async filesSelected(fileRecordsNewlySelected) {
			//of the files dropped in filter out thos with an error then concat them to upload list
			this.componentState = 'Loading';
			const validFileRecords = fileRecordsNewlySelected.filter(
				(fileRecord) => !fileRecord.error
			);
			this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
				validFileRecords
			);
			// upload to s3
			const filename = uuid();
			const url = await this.$api.file.upload(
				this.fileRecordsForUpload[0].file,
				filename
			);
			const cardMedia = await this.$api.cardMedia.update({
				id: parseInt(this.id),
				url,
			});
			this.newUrl = cardMedia.url;
		},
		onBeforeDelete(fileRecord) {
			//find the index of file to be deleted, remove from record list trigger delete event (fileDeleted)
			const i = this.fileRecordsForUpload.indexOf(fileRecord);
			this.fileRecordsForUpload.splice(i, 1);
			this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
		},
		fileDeleted(fileRecord) {
			// Using the default uploader. You may use another uploader instead.
			//delete file from fileagent
			this.$refs.vueFileAgent.deleteUpload(fileRecord);
		},
		randomizeOptions() {
			const mode = this.lineModes[
				randomNumberInRange(0, this.lineModes.length - 1)
			];
			const offset = randomNumberInRange(0, 15);
			this.lineMode = `${mode} ${offset}`.trim();
			this.progress = randomNumberInRange(0, 100);
			this.thickness = randomNumberInRange(1, 10);
			this.emptyThickness = randomNumberInRange(1, 10);
			this.dot.size = randomNumberInRange(1, 20);
			this.dot.width = `${randomNumberInRange(1, 10)}px`;
		},
	},
	// computed: {
	// 	component() {
	// 		return this.test ? 'vue-ellipse-progress-test' : 'vue-ellipse-progress';
	// 	},
	// },
};
</script>
<style></style>

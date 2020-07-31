<!-- src/components/layout/TheLoginModal -->
<template>
	<div>
		<BaseModal><TheLoginForm></TheLoginForm></BaseModal>
	</div>
</template>
<script>
import BaseModal from './BaseModal.vue';
import TheLoginForm from './TheLoginForm.vue';
import TheRegisterForm from './TheRegisterForm.vue';

export default {
	name: 'TheLoginModal',
	components: { BaseModal, TheLoginForm, TheRegisterForm },
	props: {},
	data() {
		return {};
	},
};
</script>
<style></style>

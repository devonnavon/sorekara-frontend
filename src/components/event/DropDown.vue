<!-- src/pages/TheHome/TheCallToAction.vue -->
<template>
	<div class="flex flex-col">
		<button
			@click="toggleShow"
			class="self-center focus:outline-none outline-none"
		>
			<slot>Yo</slot>
		</button>

		<div
			v-if="showMenu"
			class="font-display text-orange bg-white rounded-lg border border-orange self-center -mt-2"
		>
			<div
				class="py-3 px-6 cursor-pointer hover:text-opacity-60"
				v-for="item in this.items"
				:key="item"
				@click="itemClicked(item)"
			>
				{{ item }}
			</div>
		</div>
	</div>
</template>
<script>
import IconifyIcon from '@iconify/vue';
import closeOutline from '@iconify/icons-carbon/close-outline';
import plusCircleOutlined from '@iconify/icons-ant-design/plus-circle-outlined';
import bus from '../../bus';

export default {
	name: 'DropDown',
	components: {
		IconifyIcon,
	},
	data: function() {
		return {
			icons: {
				plusCircleOutlined,
			},
			showMenu: false,
		};
	},
	props: {
		onClick: Function,
		items: {
			type: Array,
			default: ['yo', 'yo'],
		},
	},
	methods: {
		toggleShow: function() {
			this.showMenu = !this.showMenu;
		},
		itemClicked: function(item) {
			this.toggleShow();
			this.onClick(item);
		},
	},
};
</script>
<style>
.anchor {
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid transparent;
	padding: 0.75rem 2rem;
	font-size: 1rem;
	border-radius: 0.25rem;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	color: #fff;
	background-color: #27ae60;
	border-color: #27ae60;
}

.menu {
	background-color: #fff;
	background-clip: padding-box;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	font-size: 1rem;
	list-style: none;
	margin: 0.125rem 0 0;
	padding: 0.5rem 0;
	position: absolute;
	text-align: left;
}

.menu-item {
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.menu-item:hover {
	background-color: #f4f6f6;
	cursor: pointer;
}
</style>

<template>
	<div class="main">
		<div class="experiment">
			<div class="bars">
				<vue-file-toolbar-menu
					v-for="(content, index) in bars_content"
					:key="'bar-' + index"
					:content="content"
				/>
			</div>
			<div
				ref="text"
				class="text"
				:contenteditable="edit_mode"
				spellcheck="false"
				v-html="initial_html"
			></div>
		</div>
	</div>
</template>

<script>
import VueFileToolbarMenu from './Bar/Bar.vue';
import DemoCustomButton from './DemoCustomButton.vue';
import DemoCustomMenuItem from './DemoCustomMenuItem.vue';
// for dynamic css variables

export default {
	components: { VueFileToolbarMenu },
	data() {
		return {
			initial_html:
				'Try me! Here is some <strong>contenteditable</strong> &lt;div&gt; for the demo.',
			color: 'rgb(74, 238, 164)',
			font: 'Avenir',
			theme: 'default',
			edit_mode: true,
			check1: false,
			check2: false,
			check3: true,
		};
	},
	computed: {
		bars_content() {
			const mac_os_menus =
				this.theme == 'mac-os'
					? [
							{
								html:
									'<svg width="16" height="16" viewBox="0 0 16 16" style="fill: var(--bar-font-color, black)" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"/></svg>',
								menu: [
									{
										text: 'Log Out',
										hotkey: 'shift+command+q',
										click: () => alert('No way!'),
									},
								],
							},
							{
								html: '<span style="font-weight:700">YourApp</span>',
								menu: [
									{
										text: 'Quit',
										hotkey: 'command+q',
										click: () => alert('No way!'),
									},
								],
							},
					  ]
					: [];
			return [
				[
					...mac_os_menus,
					{
						text: 'File',
						menu: [
							{
								text: 'New',
								click: () => {
									this.$refs.text.innerHTML = this.initial_html;
									this.focus_text();
								},
							},
							{
								text: 'Save...',
								click: () =>
									alert(
										"You're amazing, " +
											(prompt("What's your name?") || 'friend') +
											'!'
									),
							},
							{ is: 'separator' },
							{ text: 'Print...', click: () => window.print() },
							{ is: 'separator' },
							{
								text: 'Close',
								click() {
									if (confirm('Do you want to close the page?')) window.close();
								},
							},
						],
					},
					{
						text: 'Edit',
						menu: [
							{ text: 'Cut', click: () => document.execCommand('cut') },
							{ text: 'Copy', click: () => document.execCommand('copy') },
							{
								text: 'Paste',
								click() {
									navigator.clipboard.readText().then((text) => {
										document.execCommand('insertText', false, text);
									});
								},
							},
						],
					},
					{
						text: 'Formats',
						menu: [
							{ text: 'Basic' },
							{ text: 'Disabled', disabled: true },
							{
								text: 'Sub-menus',
								custom_chevron: this.theme != 'default' ? '►' : false,
								menu: [
									{ text: 'Hello!' },
									{
										text: "I'm a sub-menu",
										custom_chevron: this.theme != 'default' ? '►' : false,
										menu: [{ text: "And I'm another sub-menu!" }],
										menu_width: 240,
									},
								],
								menu_width: 200,
							},
							{
								text: 'Hotkey',
								hotkey: this.isMacLike ? 'command+e' : 'ctrl+e',
								click() {
									alert(
										'Hotkey menu triggered either via clicking or shortcut.'
									);
								},
							},
							{
								text: 'Material icon',
								icon: 'shopping_cart',
								click: () =>
									window.open('https://material.io/resources/icons', '_blank'),
							},
							{
								text: 'Platform emoji',
								emoji: 'call_me_hand',
								click: () =>
									window.open(
										'https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json',
										'_blank'
									),
							},
							{ text: 'Menu text is wrapped when it is too long' },
							{ is: DemoCustomMenuItem },
							{ is: 'separator' },
							{
								text: 'Option 1',
								icon: this.check1
									? 'radio_button_unchecked'
									: 'radio_button_checked',
								click: (e) => {
									e.stopPropagation(); // prevent menu close when clicking
									this.check1 = false;
								},
							},
							{
								text: 'Option 2',
								icon: this.check1
									? 'radio_button_checked'
									: 'radio_button_unchecked',
								click: (e) => {
									e.stopPropagation(); // prevent menu close when clicking
									this.check1 = true;
								},
							},
							{ is: 'separator' },
							{
								text: 'Option 3',
								icon: this.check2 ? 'check_box' : 'check_box_outline_blank',
								click: (e) => {
									e.stopPropagation(); // prevent menu close when clicking
									this.check2 = !this.check2;
								},
							},
							{
								text: 'Option 4',
								icon: this.check3 ? 'check_box' : 'check_box_outline_blank',
								click: (e) => {
									e.stopPropagation(); // prevent menu close when clicking
									this.check3 = !this.check3;
								},
							},
						],
						menu_width: 220,
					},
					{
						text: 'Help',
						menu: [
							{
								text: 'About',
								icon: 'help',
								click: () =>
									alert(
										'vue-file-toolbar-menu\nhttps://github.com/motla/vue-file-toolbar-menu\nby @motla\nMIT License'
									),
							},
							{ is: 'separator' },
							{
								text: 'Repository',
								icon: 'exit_to_app',
								click: () =>
									window.open('https://github.com/motla/vue-file-toolbar-menu'),
							},
							{
								text: 'API',
								icon: 'exit_to_app',
								click: () =>
									window.open(
										'https://github.com/motla/vue-file-toolbar-menu/blob/master/API.md'
									),
							},
							{
								text: 'Report Issue',
								icon: 'exit_to_app',
								click: () =>
									window.open(
										'https://github.com/motla/vue-file-toolbar-menu/issues'
									),
							},
							{
								text: 'Release Notes',
								icon: 'exit_to_app',
								click: () =>
									window.open(
										'https://github.com/motla/vue-file-toolbar-menu/blob/master/CHANGELOG.md'
									),
							},
						],
						menu_width: 220,
					},
					{ is: 'spacer' },
					{
						icon: this.edit_mode ? 'lock_open' : 'lock',
						title: 'Toggle edit mode',
						active: !this.edit_mode,
						click: () => {
							this.edit_mode = !this.edit_mode;
						},
					},
				],
				[
					{
						icon: 'format_align_left',
						title: 'Align left',
						hotkey: this.isMacLike ? 'shift+command+l' : 'ctrl+shift+l',
						click: () => document.execCommand('justifyLeft'),
					},
					{
						icon: 'format_align_center',
						title: 'Align center',
						hotkey: this.isMacLike ? 'shift+command+e' : 'ctrl+shift+e',
						click: () => document.execCommand('justifyCenter'),
					},
					{
						icon: 'format_align_right',
						title: 'Align right',
						hotkey: this.isMacLike ? 'shift+command+r' : 'ctrl+shift+r',
						click: () => document.execCommand('justifyRight'),
					},
					{
						icon: 'format_align_justify',
						title: 'Justify content',
						hotkey: this.isMacLike ? 'shift+command+j' : 'ctrl+shift+j',
						click: () => document.execCommand('justifyFull'),
					},
					{ is: 'separator' },
					{
						icon: 'format_bold',
						title: 'Bold',
						hotkey: this.isMacLike ? 'command+b' : 'ctrl+b',
						click: () => document.execCommand('bold'),
					},
					{
						icon: 'format_italic',
						title: 'Italic',
						hotkey: this.isMacLike ? 'command+i' : 'ctrl+i',
						click: () => document.execCommand('italic'),
					},
					{
						icon: 'format_underline',
						title: 'Underline',
						hotkey: this.isMacLike ? 'command+u' : 'ctrl+u',
						click: () => document.execCommand('underline'),
					},
					{
						icon: 'format_strikethrough',
						title: 'Strike through',
						click: () => document.execCommand('strikethrough'),
					},
					{
						is: 'button-color',
						type: 'compact',
						menu_class: 'align-center',
						color: this.color,
						update_color: (new_color) => {
							this.color = new_color;
							document.execCommand('foreColor', false, new_color.hex8);
						},
					},
					{ is: 'separator' },
					{
						html:
							'<div class="ellipsis" style="width: 80px; font-size: 95%;">' +
							this.font +
							'</div>',
						title: 'Font',
						chevron: true,
						menu: this.font_menu,
						menu_height: 200,
					},
					{ is: 'separator' },
					{
						icon: 'format_list_numbered',
						title: 'Numbered list',
						click: () => document.execCommand('insertOrderedList'),
					},
					{
						icon: 'format_list_bulleted',
						title: 'Bulleted list',
						click: () => document.execCommand('insertUnorderedList'),
					},
					{ is: 'separator' },
					{
						icon: 'format_indent_increase',
						title: 'Increase indent',
						click: () => document.execCommand('indent'),
					},
					{
						icon: 'format_indent_decrease',
						title: 'Decrease indent',
						click: () => document.execCommand('outdent'),
					},
					{ is: 'separator' },
					{ is: DemoCustomButton, click: () => alert('Your custom action!') },
					{ is: 'separator' },
					{
						html: '<b>H1</b>',
						title: 'Header 1',
						click: () => document.execCommand('formatBlock', false, '<h1>'),
					},
					{
						html: '<b>H2</b>',
						title: 'Header 2',
						click: () => document.execCommand('formatBlock', false, '<h2>'),
					},
					{
						html: '<b>H3</b>',
						title: 'Header 3',
						click: () => document.execCommand('formatBlock', false, '<h3>'),
					},
					{
						icon: 'format_clear',
						text: 'Clear',
						title: 'Clear format',
						click() {
							document.execCommand('removeFormat');
							document.execCommand('formatBlock', false, '<div>');
						},
					},
				],
			];
		},
		isMacLike: () => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),
		font_menu() {
			return this.font_list.map((font) => {
				return {
					html:
						'<span class="ellipsis" style="font-family:' +
						font +
						'">' +
						font +
						'</span>',
					icon: this.theme != 'default' && this.font == font ? 'check' : false,
					active: this.font == font,
					height: 20,
					click: () => {
						document.execCommand('fontName', false, font);
						this.font = font;
					},
				};
			});
		},
		font_list: () => [
			'Arial',
			'Avenir',
			'Courier New',
			'Garamond',
			'Georgia',
			'Impact',
			'Helvetica',
			'Palatino',
			'Roboto',
			'Times New Roman',
			'Verdana',
		],
		is_touch_device: () =>
			'ontouchstart' in window || window.navigator.msMaxTouchPoints > 0,
	},
	methods: {
		focus_text() {
			this.$refs.text.focus();
			document.execCommand('selectAll', false, null);
			document.getSelection().collapseToEnd();
		},
	},
	mounted() {
		if (!this.is_touch_device) this.focus_text();
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
</style>

<style scoped>
:root {
	--bar-font-color: rgba(0, 0, 0, 0.75);
	--bar-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
		Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
		'Segoe UI Symbol';
	--bar-font-size: 15.5px;
	--bar-button-icon-size: 20px;
	--bar-button-padding: 4px 7px 5px 7px;
	--bar-button-radius: 0;
	--bar-button-hover-bkg: none;
	--bar-button-active-color: white;
	--bar-button-active-bkg: rgba(41, 122, 255, 0.9);
	--bar-button-open-color: white;
	--bar-button-open-bkg: rgba(41, 122, 255, 0.9);
	--bar-menu-bkg: rgba(255, 255, 255, 0.95);
	--bar-menu-backdrop-filter: saturate(180%) blur(20px);
	--bar-menu-backdrop-filter-bkg: rgba(255, 255, 255, 0.3);
	--bar-menu-border: solid 1px #bbb;
	--bar-menu-border-radius: 0 0 6px 6px;
	--bar-menu-item-chevron-margin: 0;
	--bar-menu-item-hover-color: white;
	--bar-menu-item-hover-bkg: rgba(41, 122, 255, 0.9);
	--bar-menu-item-padding: 1px 12px 2px 25px;
	--bar-menu-item-icon-size: 16px;
	--bar-menu-item-icon-margin: 0 4px 0 -20px;
	--bar-menu-padding: 3px 0;
	--bar-menu-shadow: 0 6px 13px 0 rgba(60, 60, 60, 0.4);
	--bar-menu-separator-height: 2px;
	--bar-menu-separator-margin: 5px 0;
	--bar-menu-separator-color: rgba(0, 0, 0, 0.08);
	--bar-sub-menu-border-radius: 6px;
}

a {
	color: inherit;
}
svg.github {
	fill: var(--demo-font-color);
	margin-right: 5px;
}
*[contenteditable='true'] {
	outline: none;
}
select {
	outline: none;
}
.main {
	width: 100%;
	height: 100%;
}
.title {
	text-align: center;
	font-size: 50px;
	padding-top: 30px;
}
.subtitle {
	font-size: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 50px;
}
.experiment {
	width: 95%;
	margin: auto;
	max-width: 1150px;
}
.bars {
	background-color: var(--demo-bars-bkg, white);
	border-radius: var(--demo-bars-border-radius, 5px);
	box-shadow: var(--demo-bars-shadow, 0 0 20px black);
	padding: var(--demo-bars-padding, 8px);
	transition: 0.5s;
}
::v-deep.bars * {
	transition: font-size 0.1s linear, padding 0.1s linear, margin 0.1s linear;
}
.styles {
	position: fixed;
	top: 10px;
	right: 10px;
}
.text {
	font-family: var(--bar-font-family);
	width: 90%;
	margin: 30px auto;
	font-size: 20px;
	min-height: 250px;
	background-color: var(--demo-text-bkg-color);
	background-image: var(
		--demo-text-bkg-img,
		url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23FFFFFF30' stroke-width='2' stroke-dasharray='15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")
	);
	border: var(--demo-text-border);
	box-shadow: var(--demo-text-box-shadow);
	padding: 10px 15px;
	transition: 0.5s;
}
</style>

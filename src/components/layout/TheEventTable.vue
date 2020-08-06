<template>
  <div>
    <TheEventModal :event="selectedEvent" v-show="isModalVisible" />

    <div class="pt-10">
      <div class="flex flex-row justify-between pb-5">
        <div class="font-display text-orange text-3xl flex-initial">My Events</div>
        <button
          class="font-display text-orange text-4xl flex-initial focus:outline-none outline-none"
        >
          <IconifyIcon
            :icon="icons.plusCircleOutlined"
            class="text-orange inline fill-current transform hover:rotate-180 transition-transform duration-1000 ease-out self-center outline-none focus:outline-none"
            @click="showModal()"
          />
        </button>
      </div>
      <table class="border-collapse w-full font-display">
        <thead>
          <tr>
            <th
              class="text-base text-orange text-left text-opacity-60 hover:text-opacity-100 hidden lg:table-cell"
            >TITLE</th>
            <th
              class="text-base text-orange text-left text-opacity-60 hover:text-opacity-100 hidden lg:table-cell"
            >DESCRIPTION</th>
            <th
              class="text-base text-orange text-left text-opacity-60 hover:text-opacity-100 hidden lg:table-cell"
            >EVENT DATE</th>
            <th
              class="text-base text-orange text-left text-opacity-60 hover:text-opacity-100 hidden lg:table-cell"
            >PASSWORD</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(event, id) in events"
            :key="id"
            class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 border border-b-1 border-l-0 border-r-0 border-t-0 border-orange"
          >
            <td
              class="w-full py-6 text-xl lg:w-1/6 lg:p-6 lg:pl-0 border border-b-0 text-center block border-opacity-60 font-display lg:text-base text-orange font-normal lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-orange lg:border-b-1"
            >
              <span class="lg:hidden absolute top-0 left-0 px-2 py-1 text-xs uppercase block">TITLE</span>
              {{ event.title }}
              <!-- event settings desktop -->
              <IconifyIcon
                @click="showModal(event)"
                :icon="icons.settingOutlined"
                class="visible lg:invisible text-orange fill-current h-6 w-6 absolute top-0 right-0 m-1"
              />
            </td>
            <td
              class="w-full lg:w-2/5 py-6 px-2 lg:px-0 lg:p-6 lg:pl-0 border border-b-0 text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-orange lg:border-b-1 lg:pr-4"
            >
              <span
                class="lg:hidden absolute top-0 left-0 px-2 py-1 text-xs uppercase block"
              >DESCRIPTION</span>
              {{ event.description }}
            </td>
            <td
              class="w-full lg:w-1/6 lg:p-3 lg:pl-0 border border-b-0 text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-b-1 lg:border-orange py-6 px-2 lg:pt-6"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs uppercase"
              >EVENT DATE</span>
              <span class="py-1 px-3 pl-0 text-base text-orange">
                {{
                event.eventDate
                }}
              </span>
            </td>
            <td
              class="w-full lg:w-auto p-3 lg:pl-0 lg:pr-0 border border-b-0 text-center block border-opacity-60 font-display text-base text-orange lg:align-top lg:table-cell relative lg:static lg:mb-0 lg:text-left lg:border-r-0 lg:border-l-0 lg:border-t-1 lg:border-orange lg:relative lg:pt-6 lg:pb-1 pt-6 pb-2"
            >
              <!-- event settings mobile -->
              <IconifyIcon
                @click="showModal(event)"
                :icon="icons.settingOutlined"
                class="invisible lg:visible text-orange fill-current h-6 w-6 absolute top-0 right-0 p-1 transform rotate-45 hover:rotate-180 transition-transform duration-1000 ease-out"
              />
              <span
                class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs uppercase"
              >PASSWORD</span>

              <span class="py-1 px-3 pl-0 text-base inline">
                {{ event.password }}
                <!-- <button>
							<IconifyIcon
								:icon="icons.eyeOutlined"
								class="text-orange fill-current h-6 w-6 inline"
							/>
                </button>-->
              </span>
              <div class="flex justify-end align-bottom pt-5 lg:pt-8">
                <button
                  class="appearance-none block w-auto border border-dotted py-1 px-2 mr-5 leading-tight transition ease-in duration-200 hover:bg-orange hover:text-white focus:bg-orange focus:text-white focus:bg-orange focus:text-white lg:mb-3"
                >PREVIEW</button>
                <button
                  class="appearance-none block w-auto border border-dotted py-1 px-2 leading-tight transition ease-in duration-200 hover:bg-orange hover:text-white focus:bg-orange focus:text-white focus:bg-orange focus:text-white lg:mb-3"
                >EDITOR</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TheEventModal from "../event/TheEventModal.vue";
import bus from "../../bus";

import IconifyIcon from "@iconify/vue";
import eyeOutlined from "@iconify/icons-ant-design/eye-outlined";
import eyeInvisibleOutlined from "@iconify/icons-ant-design/eye-invisible-outlined";
import settingOutlined from "@iconify/icons-ant-design/setting-outlined";
import plusCircleOutlined from "@iconify/icons-ant-design/plus-circle-outlined";
import plusCircleFilled from "@iconify/icons-ant-design/plus-circle-filled";

export default {
  name: "TheEventTable",
  components: {
    IconifyIcon,
    TheEventModal,
  },
  props: {},
  data() {
    return {
      events: [],
      isModalVisible: false,
      selectedEvent: null,
      icons: {
        eyeOutlined,
        eyeInvisibleOutlined,
        settingOutlined,
        plusCircleOutlined,
        plusCircleFilled,
      },
    };
  },
  async created() {
    bus.$on("modal-close", this.closeModal);
    let response = await this.$api.event.events();
    this.events = response;
  },

  destroyed() {
    bus.$off("modal-close", this.closeModal);
  },
  methods: {
    showModal(event) {
      this.selectedEvent = event ? event : null;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style></style>

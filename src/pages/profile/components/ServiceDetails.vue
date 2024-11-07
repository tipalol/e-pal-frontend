<template>
  <section class="w-5/12 space-y-6">

    <!-- card -->
    <div class="bg-gray-800 p-6 rounded-lg space-y-4">
    <div class="flex items-center justify-between bg-gray">
      <div class="flex flex-grow justify-start">
        <div>
          <h2 class="text-3xl font-bold">{{ title }}</h2>
          <div class="text-yellow-500 text-lg font-bold">5.0 • 152 Served</div>
        </div>
      </div>
      <div class="mr-0 bg-purple-500 hover:bg-purple-600 rounded-full py-3 px-5 flex items-center space-x-2">
        <button>
          <i class="fas fa-play"></i>
        </button>
      </div>
    </div>
    <!-- Изображение ранга (показывается, если photo не null) -->
    <img v-if="serviceExtraInfo.photo" :src="serviceExtraInfo.photo" alt="Service Image" class="w-full h-50 rounded-lg object-cover" />

    <div class="flex justify-between items-center pt-4">
      <!-- Кнопка для лайков -->
      <button class="flex items-center space-x-1 text-purple-500 hover:text-purple-600">
        <i class="fas fa-heart"></i>
        <span>13</span>
        <span>  <-- не реализовано</span>
      </button>
    </div>

    <!-- Описание услуги -->
    <p class="text-gray-400 text-lg mt-4">{{ serviceDescription }}</p>

    <!-- Дополнительная информация об услуге -->

    <!-- Дополнительная информация об услуге (только два блока, если isCollapsed) -->
      <div class="space-y-2 mt-4 font-bold">
        <div v-for="(value, label) in (!isCollapsed ? visibleInfo : displayInfo)" :key="label"
                class="flex items-center space-x-2">
          <span class="font-semibold capitalize text-gray-400 text-xl w-[130px]">{{ label }}:</span>
          <span class="flex-grow text-left text-xl">{{ Array.isArray(value) ? value.join('/') : value }}</span>
        </div>
      </div>

      <!-- Кнопка свернуть/развернуть -->
    <div class="flex justify-between items-center pt-4 text-purple-500"

         v-if="Object.keys(displayInfo).length > 2">
      <button @click="toggleCollapse" class="text-sm font-bold hover:text-purple-600">
        {{ isCollapsed ? 'Collapse' : 'Expand' }}
      </button>
    </div>

    </div>


    <!-- Service Types -->
    <div class="bg-gray-800 p-6 rounded-lg space-y-4">
      <div class="flex">
        <h3 class="text-lg font-semibold"> Services details • {{ serviceOptions.length }} • </h3>
        <div v-if="isMyProfile">
          <button @click="onAddNewDetailsBtnClick" class="px-4 py-1 ml-2 bg-purple-500 rounded-full text-sm hover:bg-purple-600">
            Add new
          </button>
        </div>
      </div>

      <div
          v-for="(type, index) in serviceOptions"
          :key="index"
          @click="this.$emit('service-option-chosen', type)"
          class="flex items-center justify-between bg-gray-700 p-3 rounded-md cursor-pointer"
      >
        <span class="mr-auto">{{ type.name }}</span>
        <span class="text-purple-500">{{ type.price }}</span>
      </div>
    </div>
  </section>
  <!-- Modal -->
  <div v-if="isModalVisible" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50" >
    <div class="bg-white p-8 rounded-lg text-center max-w-sm w-full">
      <h2 class="text-3xl font-bold text-purple-600">Add new service details</h2>
      <!-- Input Fields -->
      <div class="mt-4 text-purple-600 ">
        <label class="block text-gray-700">Service name</label>
        <input v-model="detailsName" type="text" placeholder="Enter details name" class="w-full p-2 border border-gray-300 rounded">
        <input v-model="price" type="number" placeholder="Enter price" class="w-full mt-1 p-2 border border-gray-300 rounded" step="0.1">
      </div>

      <button @click="applyModal" class="bg-green-500 mt-6 mr-2 text-white py-2 px-6 rounded-full">Apply</button>
      <button @click="closeModal" class="mt-6 bg-black text-white py-2 px-6 rounded-full">Close</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../../stores/auth.js";
import axios from "axios";
import {ref} from "vue";

export default {
  name: "serviceOptions",
  props: {
    title: {
      type: String,
      required: false,
    },
    serviceDescription: {
      type: String,
      required: false,
    },
    serviceOptions: {
      type: Array,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    isMyProfile: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isModalVisible: false,
      detailsName: '',
      price: null,
      serviceExtraInfo: { rank: null, photo: null, servers: [], styles: [], platforms: [], positions: [] },
    };
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    onAddNewDetailsBtnClick() {
      this.isModalVisible = true;
    },
    async fetchServiceExtraInfo() {
      try {
        const response = await axios.get("http://localhost:5033/api/services/extrainfo/" + this.serviceId);
        if (response.status === 200) {
          const data = response.data;
          console.log('response:', data);
          this.serviceExtraInfo = data.data;
        }
        console.log('service extra info got:', this.serviceExtraInfo);
      } catch (error) {
        console.error("Fetch extra info error: ", error);
      }
    },
    async applyModal() {
      const headers = { Authorization: "Bearer " + useAuthStore().token };
      try {
        const response = await axios.post("http://localhost:5033/api/ServiceOptions", {
          name: this.detailsName,
          price: this.price,
          description: " ",
          ServiceId: this.serviceId,
        }, { headers });

        this.$emit("service-option-updated", this.serviceId);

      } catch (error) {
        console.error("Post details error: ", error);
      } finally {
        this.closeModal();
      }
    },
  },
  computed: {
    visibleInfo() {
      // Берем первые два свойства serviceExtraInfo с ненулевыми значениями
      return Object.entries(this.serviceExtraInfo)
          .filter(([key, value]) => value && value.length !== 0 && key != 'photo')
          .slice(0, 2)
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
    },
    displayInfo() {
      // Отображаем только не пустые значения из serviceExtraInfo
      const info = {
        rank: this.serviceExtraInfo.rank,
        servers: this.serviceExtraInfo.servers?.length ? this.serviceExtraInfo.servers.join('/') : null,
        styles: this.serviceExtraInfo.styles?.length ? this.serviceExtraInfo.styles.join('/') : null,
        platforms: this.serviceExtraInfo.platforms?.length ? this.serviceExtraInfo.platforms.join('/') : null,
        positions: this.serviceExtraInfo.positions?.length ? this.serviceExtraInfo.positions.join('/') : null
      };

      // Возвращаем только те поля, которые имеют значения
      return Object.fromEntries(Object.entries(info).filter(([_, value]) => value));
    }
  },
  mounted() {
    this.fetchServiceExtraInfo();
  },
  watch: {
    serviceId() {
      this.fetchServiceExtraInfo();
    },
  },
  setup() {
    const isCollapsed = ref(false);

    function toggleCollapse() {
      isCollapsed.value = !isCollapsed.value;
    }

    return { isCollapsed, toggleCollapse };
  }
};
</script>
<style scoped>
/* Стили для иконок, шрифтов и кнопок */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.bg-gray-900 {
  background-color: #1f2937;
}
.text-yellow-500 {
  color: #eab308;
}
.text-purple-500 {
  color: #8b5cf6;
}
.text-purple-600 {
  color: #7c3aed;
}
</style>
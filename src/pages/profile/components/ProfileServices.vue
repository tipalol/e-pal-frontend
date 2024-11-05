<template>
  <aside class="w-1/4 space-y-6">
    <!-- Контейнер с цветом фона -->
    <div class="bg-gray-800 p-6 rounded-lg space-y-4">
      <div
          v-for="(service, index) in services"
          :key="index"
          class="p-4 rounded-lg flex items-center justify-between transition duration-300 ease-in-out cursor-pointer"
          :class="[
            selectedServiceId === service.id ? 'bg-purple-600 border border-purple-300' : 'bg-gray-700',
            'hover:bg-gray-600'
          ]"
          @click="selectService(service.id)"
      >
        <div class="flex items-center space-x-3">
          <img :src="service.icon" :alt="service.name" class="w-10 h-10 rounded-full" />
          <div>
            <h3 class="text-sm font-bold">{{ service.name }}</h3>
            <p class="text-gray-400 text-xs">{{ service.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { onMounted, ref, watch } from "vue";

export default {
  name: "ProfileServices",
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectedServiceId = ref(null);

    onMounted(() => {
      // Проверяем наличие категорий и выбираем первую
      if (props.services.length > 0) {
        selectedServiceId.value = props.services[0].id; // Устанавливаем первую категорию как выбранную по умолчанию
        console.log("Selected first service ID:", selectedServiceId.value);
        emit("service-selected", selectedServiceId.value); // Отправляем событие с ID первой категории
      }
    });

    const selectService = (serviceId) => {
      selectedServiceId.value = serviceId;
      console.log("Selected service ID:", selectedServiceId.value);
      emit("service-selected", serviceId); // отправляем событие с ID категории
    };

    // Наблюдаем за изменением services и повторяем инициализацию, если services меняется
    watch(
        () => props.services,
        (newCategories) => {
          if (newCategories.length > 0 && !selectedServiceId.value) {
            selectedServiceId.value = newCategories[0].id;
            emit("service-selected", selectedServiceId.value);
          }
        },
        { immediate: true }
    );

    return {
      selectedServiceId,
      selectService,
    };
  },
};
</script>

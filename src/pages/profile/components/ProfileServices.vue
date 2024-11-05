<template>
  <aside class="w-1/4 space-y-6">
    <!-- Контейнер с цветом фона -->
    <div class="bg-gray-800 p-6 rounded-lg space-y-4">
      <div
          v-for="(category, index) in categories"
          :key="index"
          class="p-4 rounded-lg flex items-center justify-between transition duration-300 ease-in-out cursor-pointer"
          :class="[
            selectedCategoryId === category.id ? 'bg-purple-600 border border-purple-300' : 'bg-gray-700',
            'hover:bg-gray-600'
          ]"
          @click="selectCategory(category.id)"
      >
        <div class="flex items-center space-x-3">
          <img :src="category.avatar" :alt="category.name" class="w-10 h-10 rounded-full" />
          <div>
            <h3 class="text-sm font-bold">{{ category.name }}</h3>
            <p class="text-gray-400 text-xs">{{ category.price }}</p>
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
    categories: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectedCategoryId = ref(null);

    onMounted(() => {
      // Проверяем наличие категорий и выбираем первую
      if (props.categories.length > 0) {
        selectedCategoryId.value = props.categories[0].id; // Устанавливаем первую категорию как выбранную по умолчанию
        console.log("Selected first category ID:", selectedCategoryId.value);
        emit("category-selected", selectedCategoryId.value); // Отправляем событие с ID первой категории
      }
    });

    const selectCategory = (categoryId) => {
      selectedCategoryId.value = categoryId;
      console.log("Selected category ID:", selectedCategoryId.value);
      emit("category-selected", categoryId); // отправляем событие с ID категории
    };

    // Наблюдаем за изменением categories и повторяем инициализацию, если categories меняется
    watch(
        () => props.categories,
        (newCategories) => {
          if (newCategories.length > 0 && !selectedCategoryId.value) {
            selectedCategoryId.value = newCategories[0].id;
            emit("category-selected", selectedCategoryId.value);
          }
        },
        { immediate: true }
    );

    return {
      selectedCategoryId,
      selectCategory,
    };
  },
};
</script>

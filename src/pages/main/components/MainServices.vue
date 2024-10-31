<template>
  <section class="p-8 mx-auto">
    <div class="container-fluid space-y-16">
      <div class="mt-12">
        <router-link to="/categories">
          <h2 class="text-2xl font-bold mb-6 txt-title-l text-txt-primary-normal">All Services</h2>
        </router-link>
        <div class="grid grid-cols-3 gap-8 mt-8">
          <!-- Games Section -->
          <div class="relative px-6 rounded-lg flex items-center cursor-pointer bg-purple-500 hover:bg-purple-600" style="height: 84px;">
            <div class="flex items-center gap-2">
              <div class="txt-title-1">Games</div>
              <i class="iconfont icon-arrow-right" style="font-size: 16px;"></i>
            </div>
            <div class="absolute bottom-0 right-0 w-[120px] h-[120px] transition-transform duration-200 ease-in-out transform img___3s979"></div>
          </div>
          <!-- Chilling Section -->
          <div class="relative px-6 rounded-lg flex items-center cursor-pointer bg-purple-500 hover:bg-purple-600" style="height: 84px;">
            <div class="flex items-center gap-2">
              <div class="txt-title-1">Chilling</div>
              <i class="iconfont icon-arrow-right" style="font-size: 16px;"></i>
            </div>
            <div class="absolute bottom-0 right-0 w-[120px] h-[120px] transition-transform duration-200 ease-in-out transform img___3s979"></div>
          </div>
          <!-- Custom Section -->
          <div class="relative px-6 rounded-lg flex items-center cursor-pointer bg-purple-500 hover:bg-purple-600" style="height: 84px;">
            <div class="flex items-center gap-2">
              <div class="txt-title-1">Custom</div>
              <i class="iconfont icon-arrow-right" style="font-size: 16px;"></i>
            </div>
            <div class="absolute bottom-0 right-0 w-[120px] h-[120px] transition-transform duration-200 ease-in-out transform img___3s979"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="relative mt-10 w-full overflow-hidden">
        <!-- Scrollable Row Container -->
        <div class="ml-10 mr-10 flex space-x-6 items-center overflow-x-auto no-scrollbar" ref="scrollContainer">
          <div
              v-for="service in services"
              :key="service.name"
              :style="{ minWidth: `${cardWidth}px`, maxWidth: `${cardWidth}px` }"
              class="bg-gray-800 rounded-lg flex-shrink-0"
          >
            <img
                @click="handleServiceClick(service.id)"
                class="object-cover bg-center bg-cover rounded-lg cursor-pointer hover:scale-110 transition transform duration-300"
                :src="service.avatar"
                :alt="service.name"
            />
          </div>
        </div>

        <!-- Left Arrow Button for scrolling -->
        <button
            class="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-600 bg-opacity-75 w-16 h-16
                 rounded-full hover:bg-opacity-90 flex items-center justify-center text-white text-6xl"
            @click="scrollLeft"
        >
          <i class="icon-arrow-left mb-3"><</i>
        </button>

        <!-- Right Arrow Button for scrolling -->
        <button
            class="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-600 bg-opacity-75 w-16 h-16
                 rounded-full hover:bg-opacity-90 flex items-center justify-center text-white text-6xl"
            @click="scrollRight"
        >
          <i class="icon-arrow-right mb-3">></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cardWidth: 300, // Начальная ширина карточки; будет изменяться в зависимости от ширины экрана
    };
  },
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    // Настройка ширины карточки в зависимости от размера окна
    this.updateCardWidth();
    window.addEventListener("resize", this.updateCardWidth);
  },
  beforeDestroy() {
    // Удаление слушателя события при уничтожении компонента
    window.removeEventListener("resize", this.updateCardWidth);
  },
  methods: {
    handleServiceClick(id) {
      // Переход к каталогу при клике на сервис
      this.$router.push("/catalog/" + id);
    },
    scrollLeft() {
      const scrollAmount = this.getScrollAmount();
      this.$refs.scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    },
    scrollRight() {
      const scrollAmount = this.getScrollAmount();
      this.$refs.scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    },
    getScrollAmount() {
      // Определение количества прокручиваемых пикселей в зависимости от ширины экрана
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280) {
        return this.cardWidth * 4.5; // Больше карточек на больших экранах
      } else if (screenWidth >= 1024) {
        return this.cardWidth * 3.5; // Средние экраны
      } else if (screenWidth >= 768) {
        return this.cardWidth * 3;  // Маленькие экраны
      } else {
        return this.cardWidth * 2; // Очень маленькие экраны
      }
    },
    updateCardWidth() {
      // Обновление ширины каждой карточки в зависимости от ширины экрана для управления количеством видимых элементов
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1280) {
        this.cardWidth = 250; // Больше карточек на больших экранах
      } else if (screenWidth >= 1024) {
        this.cardWidth = 300; // Средние экраны
      } else if (screenWidth >= 768) {
        this.cardWidth = 350; // Маленькие экраны
      } else {
        this.cardWidth = 400; // Очень маленькие экраны
      }
    },
  },
};
</script>

<style scoped>
/* Скрыть полосу прокрутки */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE и Edge */
  scrollbar-width: none; /* Firefox */
}

/* Ограничить контейнер только горизонтальной прокруткой */
.overflow-x-auto {
  overflow-y: hidden; /* Отключить вертикальную прокрутку */
}
</style>

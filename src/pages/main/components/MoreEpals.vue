<template>
  <div class="mx-auto p-8">
    <h2 class="text-2xl font-bold my-6 txt-title-l text-txt-primary-normal">More Epals</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="user in users"
          :key="user.id"
          class="bg-gray-800 p-4 rounded-lg relative overflow-hidden"
      >
        <EpalCard
            :id="user.id"
            :bio="user.bio"
            :avatar="user.avatar"
            :username="user.username"
        />
      </div>
    </div>

    <!-- Sentinel element for Intersection Observer -->
    <div ref="sentinel"></div>
  </div>
</template>

<script>
import axios from "axios";
import EpalCard from "../../common/EpalCard.vue";

export default {
  components: {EpalCard},
  data() {
    return {
      users: [],
      take: 3,
      skip: 0,
      total: 0,
      isLoading: false,
      observer: null,
    };
  },
  mounted() {
    this.fetchEpalsCatalog();

    // Initialize Intersection Observer
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(this.handleIntersect, options);
    this.observer.observe(this.$refs.sentinel);
  },
  methods: {
    async fetchEpalsCatalog() {
      if (this.isLoading) return;
      this.isLoading = true;

      try {
        const response = await axios.get(
            `http://localhost:5033/api/catalog/epals?take=${this.take}&skip=${this.skip}`
        );
        const data = response.data;

        this.users = [...this.users, ...data.data];
        this.skip += this.take;
        this.total = data.total;
      } catch (error) {
        console.error("Error fetching epals:", error);
      }

      this.isLoading = false;
    },
    handleIntersect(entries) {
      if (entries[0].isIntersecting) {
        if (this.skip < this.total) {
          this.fetchEpalsCatalog();
        } else {
          // Stop observing when all data is loaded
          if (this.observer) {
            this.observer.disconnect();
          }
        }
      }
    },
  },
  beforeUnmount() {
    // Clean up the observer
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>

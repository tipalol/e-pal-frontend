<template>
  <Header />
  <section class="p-8 mx-auto">
    <div class=" container-fluid space-y-16">
      <div class=  "">
        <h2 class="text-2xl font-bold mb-6 txt-title-l text-txt-primary-normal text-purple-50">All Services</h2>

        <!-- Service Cards -->
        <div class="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div v-for="service in categories" :key="service.name" class="bg-gray-800 rounded-lg">
            <img @click="handleServiceClick(service.id)"
                 class="object-cover bg-center bg-cover rounded-lg cursor-pointer hover:scale-110"
                 :src="service.avatar"
                 :alt="service.name"
            />
          </div>


        </div>
      </div>
    </div>
    <div ref="sentinel"></div>
  </section>

</template>

<script>
import axios from "axios";
import Header from "../common/header/Header.vue";

export default {
  components: {Header},
  data() {
    return {
      categories: [],
      take: 10,
      skip: 0,
      total: 100,
      isLoading: false,
      observer: null,
    };
  },
  mounted() {
    this.fetchCategoriesCatalog();

    // Initialize Intersection Observer
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver(this.handleIntersect, options);
    this.observer.observe(this.$refs.sentinel);
  },
  methods: {
    async fetchCategoriesCatalog() {
      if (this.isLoading) return;
      this.isLoading = true;

      try {
        const response = await axios.get(
            `http://localhost:5033/api/catalog/categories?take=${this.take}&skip=${this.skip}`
        );
        const data = response.data;

        this.categories = [...this.categories, ...data.data];
        this.skip += this.take;
        this.total = data.total;

        console.log("" + data.data.length + " ----- TOTAL" + data.total)
      } catch (error) {
        console.error("Error fetching services:", error);
      }

      this.isLoading = false;
    },
    handleIntersect(entries) {
      if (entries[0].isIntersecting) {
        console.log("111111")
        if (this.skip < this.total) {
          console.log("222222")
          this.fetchCategoriesCatalog();
        } else {
          console.log("333333")
          // Stop observing when all data is loaded
          if (this.observer) {
            this.observer.disconnect();
          }
        }
      }
    },
    handleServiceClick(id) {
      this.$router.push("/catalog/" + id);
    }
  },
  beforeUnmount() {
    // Clean up the observer
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>
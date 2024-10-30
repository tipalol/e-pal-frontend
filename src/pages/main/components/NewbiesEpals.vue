<template>
  <div class="mx-auto p-8">
    <h2 class="text-2xl font-bold my-6 txt-title-l text-txt-primary-normal">Newbies</h2>

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
      serviceType: {
        name: ""
      },
    };
  },
  mounted() {
    this.fetchEpalsCatalog();
  },
  methods: {
    async fetchEpalsCatalog() {
      try {
        const response = await axios.get("http://localhost:5033/api/catalog/epals?sort=1");
        this.services = response.data;
        this.users = response.data;
        console.log(this.services);
      } catch (error) {
        console.error("Error fetching epals:", error);
      }
    },
  }
};
</script>
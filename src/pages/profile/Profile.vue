<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Header />

    <ProfileBanner
        :username="profile.username"
        :avatar="profile.avatar"
        :languages="profile.languages"
    />

    <div class="flex space-x-8 px-8 py-6">
      <ProfileServices :services="services" />

      <ServiceDetails
          :title="serviceDetails.title"
          :text="serviceDetails.text"
          :serviceTypes="serviceDetails.types"
      />

      <ProfileActions
          :avatar="profile.avatar"
          :username="profile.username"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Header from "../common/header/Header.vue";
import ProfileBanner from "./components/Banner.vue";
import ProfileServices from "./components/ProfileServices.vue";
import ServiceDetails from "./components/ServiceDetails.vue";
import ProfileActions from "./components/ProfileActions.vue";

export default {
  name: "UserProfile",
  components: {ProfileBanner, Header, ProfileServices, ServiceDetails, ProfileActions },
  setup() {
    const profile = ref({
      username: "dopameanie",
      avatar: "https://global-oss.epal.gg/data/album/729833/1724368151270586.jpeg?x-oss-process=image/resize,m_fill,w_256,h_256",
      languages: "日本語/English",
    });

    onMounted(async () => {
      try {
        const response = await fetch("http://localhost/api/profile");
        if (response.ok) {
          const data = await response.json();
          profile.value = data;
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    });

    return { profile };
  },
  data() {
    return {
      services: [
        { name: "Adding Socials", price: "66.66 / Time", icon: "https://static-oss.epal.gg/data/static/v3/img7_card_AddingSocials_m.png" },
        { name: "E-Chat", price: "66.66 / Time", icon: "https://static-oss.epal.gg/data/static/v3/img7_card_E-Chat_m.png" },
        { name: "Dead by Daylight", price: "6.66 / Game", icon: "https://static-oss.epal.gg/data/static/v2/img7_v2_card_DeadbyDaylight_m.png" },
      ],
      serviceDetails: {
        title: "E-Chat",
        text: "Indulge in a personal voice call or texting session on Discord with dopa",
        types: [
          { name: "text chat w dopa", price: "66.66 / Time" },
          { name: "voice call w dopa", price: "66.66 / 15Min" },
          { name: "asmr sleep call w dopa", price: "666.66 / 15Min" },
          { name: "daily dose of dopa", price: "76.66 / Time" },
        ],
      },
    };
  },
};
</script>
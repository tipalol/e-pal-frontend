<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Header />

    <ProfileBanner
        :username="profile.username"
        :avatar="profile.avatar"
        :languages="profile.languages"
        :gender="profile.gender"
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
import {useAuthStore} from "../../stores/auth.js";
import {useRouter} from "vue-router";

export default {
  name: "UserProfile",
  components: {ProfileBanner, Header, ProfileServices, ServiceDetails, ProfileActions },

  setup() {
    const router = useRouter();
    const profile = ref({
      id: "4363236",
      username: "dopameanie",
      status: "Created",
      avatar: "https://global-oss.epal.gg/data/album/729833/1724368151270586.jpeg?x-oss-process=image/resize,m_fill,w_256,h_256",
      languages: "日本語/English",
    });
    const logOut = () => {
      useAuthStore().clearToken();
      useAuthStore().clearProfile();
      console.log("Logged out");
    };
    const serviceTypes = ref([
      {
        id: "",
        name: "",
        avatar: ""
      }
    ]);
    const services = ref([
      {
        id: "",
        name: "",
        avatar: "",
        price: 100.5,
        serviceTypeId: ""
      }
    ]);

    onMounted(async () => {
      // Проверка токена
      if (!useAuthStore().isLoggedIn) {
        console.log("redirect");
        logOut();
        router.push('/'); // Перенаправьте на главную страницу, если токен недействителен
        return;
      }

      const headers = { 'Authorization': 'Bearer ' + useAuthStore().token };
      try {
        const response = await fetch("http://localhost:5033/api/profile", { headers });
        if (response.ok) {
          const data = await response.json();

          profile.value = data.data;
          useAuthStore().setProfile(profile.value);

          console.log('Got profile: ' + profile.value.id + profile.value.username + profile.value.status + profile.value.languages + profile.value.avatar);
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }

      try {
        const response = await fetch("http://localhost:5033/api/services/"+ profile.value.id + "/categories", { headers });
        if (response.ok) {
          const data = await response.json();

          serviceTypes.value = data.data;

          console.log('Got service types: ' + serviceTypes.value[0].id);
        } else {
          console.error("Failed to fetch service types");
        }
      } catch (error) {
        console.error("Error fetching service types:", error);
      }

      try {
        const response = await fetch("http://localhost:5033/api/services/"+ profile.value.id + "/category/" + serviceTypes.value[0].id, { headers });
        if (response.ok) {
          const data = await response.json();

          services.value = data.data;

          console.log('Got services: ' + services.value[0].name);
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
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
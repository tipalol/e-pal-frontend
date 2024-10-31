<template>
  <div v-if="!showError.flag" class="min-h-screen bg-gray-900 text-white">
    <Header />

    <ProfileBanner
        :username="profile.username"
        :avatar="profile.avatar"
        :languages="profile.languages"
        :gender="profile.gender"
        :can-edit="canEdit.flag"
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
  <Error v-if="showError.flag"
         button-url="/"
         title="Error"
         message="Something goes wrong.."
  />
  <OrderModal v-if="showModal" @close="showModal = false" />
</template>

<script>
import { onMounted, ref } from "vue";
import Header from "../common/header/Header.vue";
import ProfileBanner from "./components/Banner.vue";
import ProfileServices from "./components/ProfileServices.vue";
import ServiceDetails from "./components/ServiceDetails.vue";
import ProfileActions from "./components/ProfileActions.vue";
import OrderModal from "./components/OrderModal.vue";
import {useAuthStore} from "../../stores/auth.js";
import Error from "../common/Error.vue";

export default {
  name: "EpalProfile",
  components: {OrderModal, Error, ProfileBanner, Header, ProfileServices, ServiceDetails, ProfileActions },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const profile = ref({
      id: "4363236",
      username: "dopameanie",
      status: "Created",
      avatar: "https://global-oss.epal.gg/data/album/729833/1724368151270586.jpeg?x-oss-process=image/resize,m_fill,w_256,h_256",
      languages: "日本語/English",
    });
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
    const canEdit = ref({
      flag: false
    })
    const showError = ref({
      flag: false
    })

    onMounted(async () => {
      const headers = { 'Authorization': 'Bearer ' + useAuthStore().token };
      try {
        console.log(profile);
        const response = await fetch("http://localhost:5033/api/profile/"+props.username, { headers });
        if (response.ok) {
          const data = await response.json();
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA" + data.data.id)
          if (useAuthStore().isLoggedIn)
          {
            canEdit.value.flag = data.data.username === useAuthStore().profile.username;
          }
          else {
            canEdit.value = false;
          }
          profile.value = data.data;
          console.log('Got profile: ' + profile.value.id + profile.value.username + profile.value.status + profile.value.languages + profile.value.avatar);
        } else {
          showError.value = {flag: true}
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        showError.value = {flag: true}
        console.error("Error fetching profile data:", error);
      }

      try {
        console.log(profile.value);
        const response = await fetch("http://localhost:5033/api/services/"+ profile.value.id + "/categories", { headers });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          serviceTypes.value = data.data;

          console.log('Got service types: ' + serviceTypes.value.length);
        } else {
          console.error("Failed to fetch service types");
        }
      } catch (error) {
        console.error("Error fetching service types:", error);
      }

      try {
        if (serviceTypes.value.length !== 0)
        {
          const response = await fetch("http://localhost:5033/api/services/"+ profile.value.id + "/category/" + serviceTypes.value[0].id, { headers });
          if (response.ok) {
            const data = await response.json();

            services.value = data.data;

            console.log('Got services: ' + services.value[0].name);
          } else {
            console.error("Failed to fetch services");
          }
        }
        else {
          console.log("There is not service types, don't fetch services")
        }

      } catch (error) {
        console.error("Error fetching services:", error);
      }
    });

    return { profile, canEdit, showError };
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
      showModal: false,
    };
  },
};
</script>
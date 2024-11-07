<template>
  <div v-if="!showError.flag" class="min-h-screen bg-gray-900 text-white">
    <Header />
    <ProfileBanner
        v-if="profile.username !== null"
        :username="profile.username"
        :avatar="profile.avatar"
        :ProfileType="profile.profileType"
        :languages="profile.languages"
        :gender="profile.gender"
        :can-edit="profile.isMyProfile"
    />
    <div class="container-fluid flex space-x-8 px-8 py-6 justify-center">
      <ProfileServices
          :services="services"
          :is-my-profile="profile.isMyProfile"
          @service-selected="fetchServiceOptionsByService"
          @service-updated ="fetchService"
      />

      <ServiceDetails
          :serviceName = "selectedService.name"
          :serviceDescription = "selectedService.description"
          :serviceCategoryId = "selectedService.categoryId"
          :serviceOptions = "serviceOptions"
          :service-id = "selectedService.id"
          :is-my-profile = "profile.isMyProfile"
          @service-option-chosen = onServiceOptionChosen
          @service-updated ="fetchService"
          @service-option-updated = "fetchServiceOptionsByService"

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
  <OrderModal v-if="showModal"
              :id="selectedServiceOption.value.id"
              :title="selectedServiceOption.value.name"
              :description="selectedServiceOption.value.description"
              @close="showModal = false"
              @confirm-order="onConfirmOrder"
  />
</template>

<script>
import { computed, onMounted, ref, reactive } from "vue";
import Header from "../common/header/Header.vue";
import ProfileBanner from "./components/Banner.vue";
import ProfileServices from "./components/ProfileServices.vue";
import ServiceDetails from "./components/ServiceDetails.vue";
import ProfileActions from "./components/ProfileActions.vue";
import { useAuthStore } from "../../stores/auth.js";
import Error from "../common/Error.vue";
import OrderModal from "./components/OrderModal.vue";
import axios from "axios";
import { watch } from 'vue';
import {useRoute} from "vue-router";

export default {
  components: { OrderModal, Error, ProfileBanner, Header, ProfileServices, ServiceDetails, ProfileActions },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      name: "Profile",
      selectedServiceOption: ref({}),
    }
  },
  setup(props) {

    const route = useRoute();

    watch(() => route.params.username, async (newUsername) => {
      window.location.reload();
    });

    const profile = ref({
      id: "4363236",
      username: "dopameanie",
      status: "Created",
      profileType: "base",
      avatar: "https://global-oss.epal.gg/data/album/729833/1724368151270586.jpeg?x-oss-process=image/resize,m_fill,w_256,h_256",
      languages: "日本語/English",
      isMyProfile: false
    });
    const services = ref([]);
    const serviceOptions = ref([]);
    const showError = ref({ flag: false });
    const selectedService = ref({ name: " ", description:" " });


    const canEdit = computed(() => useAuthStore().profile && useAuthStore().profile.username === props.username);

    const fetchService = async () => {
      const headers = { Authorization: "Bearer " + useAuthStore().token };
      try {
        const response = await fetch(`http://localhost:5033/api/services/${profile.value.id}`, { headers });
        if (response.ok) {
          const data = await response.json();
          services.value = data.data;
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchServiceOptionsByService = async (serviceId) => {
      const headers = { Authorization: "Bearer " + useAuthStore().token };
      try {
        const response = await fetch(`http://localhost:5033/api/serviceoptions/${profile.value.id}/service/${serviceId}`, { headers });
        if (response.ok) {
          const data = await response.json();
          serviceOptions.value = data.data;
          console.log("Updated services:", serviceOptions.value);
        } else {
          console.error("Failed to fetch services for category:", serviceId);
        }
        selectedService.value = services.value.find((service) => service.id === serviceId);
        console.log(services.value.find((service) => service.id === serviceId));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    onMounted(async () => {
      const headers = { Authorization: "Bearer " + useAuthStore().token };
        try {
          const response = await fetch("http://localhost:5033/api/profile/" + props.username, { headers });
          if (response.ok) {
            const data = await response.json();
            profile.value = data.data;

            if (profile.value.isMyProfile)
            {
              useAuthStore().setProfile(profile);
            }
          } else {
            showError.value = { flag: true };
            console.error("Failed to fetch profile data");
          }
        } catch (error) {
          showError.value = { flag: true };
          console.error("Error fetching profile data:", error);
      }

      try {
        const response = await fetch(`http://localhost:5033/api/services/${profile.value.id}`, { headers });
        if (response.ok) {
          const data = await response.json();
          services.value = data.data;
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    });

    return { profile, canEdit, showError, serviceOptions, selectedService, services, fetchServiceOptionsByService, fetchService };
  },
  methods: {
    onServiceOptionChosen(serviceOption) {
      this.selectedServiceOption.value = serviceOption;
      console.log(this.selectedServiceOption)
      this.showModal = true;
    },
    async onConfirmOrder() {
      console.log("Confirmed order: " + this.selectedServiceOption);
      try {
        const token = useAuthStore().token;
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post("http://localhost:5033/api/orders", {
          serviceOptionId: this.selectedServiceOption.value.id
        }, config);

        if (response.status === 200)
        {
          console.log("Confirmed order successful:", response.data);
        }
        else {
          console.error("Error during Confirmed order: ", response.data);
        }
      } catch (error) {
        console.error("Error Confirmed order:", error);
      }
    }
  }
};
</script>
<style>
.container-fluid {
  max-width: 1632px; /* Устанавливаем максимальную ширину в 960 пикселей */
  margin: 0 auto;  /* Центрируем контейнер */
}
</style>
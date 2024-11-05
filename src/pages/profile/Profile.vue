<template>
  <div v-if="!showError.flag" class="min-h-screen bg-gray-900 text-white">
    <Header />
    <ProfileBanner
        :username="profile.username"
        :avatar="profile.avatar"
        :languages="profile.languages"
        :gender="profile.gender"
        :can-edit="canEdit"
    />
    <div class="flex space-x-8 px-8 py-6">
      <ProfileServices :categories="categories" @category-selected="fetchServicesByCategory" />

      <ServiceDetails
          :title="'Крч тут будет карта, надо класс хуярить'"
          :text="'А тут ее описание'"
          :services="services"
          @service-chosen=onServiceChosen
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
              :id="selectedService.value.id"
              :title="selectedService.value.name"
              :description="selectedService.value.description"
              @close="showModal = false" />
</template>

<script>
import { computed, onMounted, ref } from "vue";
import Header from "../common/header/Header.vue";
import ProfileBanner from "./components/Banner.vue";
import ProfileServices from "./components/ProfileServices.vue";
import ServiceDetails from "./components/ServiceDetails.vue";
import ProfileActions from "./components/ProfileActions.vue";
import { useAuthStore } from "../../stores/auth.js";
import Error from "../common/Error.vue";
import OrderModal from "./components/OrderModal.vue";

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
      selectedService: ref({})
    }
  },
  setup(props) {
    const profile = ref({
      id: "4363236",
      username: "dopameanie",
      status: "Created",
      avatar: "https://global-oss.epal.gg/data/album/729833/1724368151270586.jpeg?x-oss-process=image/resize,m_fill,w_256,h_256",
      languages: "日本語/English",
    });
    const categories = ref([]);
    const services = ref([]);
    const showError = ref({ flag: false });

    const canEdit = computed(() => useAuthStore().profile && useAuthStore().profile.username === props.username);

    const fetchServicesByCategory = async (categoryId) => {
      const headers = { Authorization: "Bearer " + useAuthStore().token };
      try {
        const response = await fetch(`http://localhost:5033/api/serviceoptions/${profile.value.id}/service/${categoryId}`, { headers });
        if (response.ok) {
          const data = await response.json();
          services.value = data.data;
          console.log("Updated services:", services.value);
        } else {
          console.error("Failed to fetch services for category:", categoryId);
        }
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
          useAuthStore().setProfile(profile);
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
          categories.value = data.data;
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    });

    return { profile, canEdit, showError, categories, services, fetchServicesByCategory };
  },
  methods: {
    onServiceChosen(service) {
      this.selectedService.value = service;
      console.log(this.selectedService)
      this.showModal = true;
    }
  }
};
</script>

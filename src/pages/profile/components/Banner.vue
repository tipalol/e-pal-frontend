<template>
  <section class="bg-gray-800 py-8 px-8 text-center relative">
    <div class="flex flex-col items-center space-y-3 font-bold">
      <img :src="avatar" alt="User Avatar" class="w-36 h-36 rounded-full" />
      <div class="flex">
        <h1 class="text-2xl">{{ username }}</h1>
        <p v-if="ProfileType === 'Epal'" :style="ProfileTypeTextStyle" class="text-2xl font-semibold">
          [epal]
        </p>
      </div>
      <p class="text-green-500" v-if="onlineStatus == true">Online</p>
      <p class="text-gray-500" v-else>Offline</p>
      <!-- Gender color with pulsing effect -->
      <p :style="{ animation: `pulse 1.5s infinite`, color: genderTextColor }" class="text-sm text-xl">{{ gender }}</p>
      <p class="text-gray-400 text-sm">{{ languages }}</p>

      <!-- Navigation Links -->
      <div class="flex justify-center space-x-6 mt-4">
        <a href="#" class="text-white" :class="{'border-b-2 border-purple-500': activeTab === 'achievements'}" @click="setActiveTab('achievements')">Achievements</a>
        <a href="#" class="text-white" :class="{'border-b-2 border-purple-500': activeTab === 'services'}" @click="setActiveTab('services')">Services</a>
        <a href="#" class="text-white" :class="{'border-b-2 border-purple-500': activeTab === 'album'}" @click="setActiveTab('album')">Album</a>
        <a href="#" class="text-white" :class="{'border-b-2 border-purple-500': activeTab === 'wish'}" @click="setActiveTab('wish')">Wish</a>
        <a href="#" class="text-white" :class="{'border-b-2 border-purple-500': activeTab === 'feeds'}" @click="setActiveTab('feeds')">Feeds</a>

        <a v-if="canEdit" href="#" class="text-white" :class="{'border-b-2 border-purple-500': activeTab === 'balance'}" @click="setActiveTab('balance')">Balance</a>
      </div>

      <!-- Edit Profile Button -->
      <router-link v-if="canEdit" class="absolute top-4 right-4 bg-purple-600 py-1 px-3 rounded-full text-sm text-white" to="/profile/settings">
        Edit Profile
      </router-link>
    </div>
  </section>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "ProfileBanner",
  props: {
    username: {
      type: String,
      required: true,
    },
    ProfileType: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    languages: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "--",
      required: false,
    },
    canEdit: {
      type: Boolean,
      required: true,
    },
    onlineStatus: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, { emit }) {
    const activeTab = ref('services'); // Initially "balance" is active tab

    const setActiveTab = (tab) => {
      activeTab.value = tab;
      emit('tab-changed', tab); // Use the emit function from setup
    };

    // Determine text color based on gender
    const genderTextColor = computed(() => {
      return props.gender === "Woman" ? "#ff00cc" : props.gender === "Man" ? "#2968ff" : "#999999";
    });

    // Define shimmering color style for ProfileType "epal"
    const ProfileTypeTextStyle = computed(() => ({
      color: "#FFD700", // Gold color
      backgroundImage: "linear-gradient(45deg, #FFD700, red, #FF00CC)", // Added red and pink
      backgroundSize: "600% 100%", // Increased for a more noticeable effect
      animation: "shimmer 0.1s linear infinite", // Very fast shimmer
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }));

    return {activeTab, setActiveTab, genderTextColor, ProfileTypeTextStyle};
  },
  emits: ['tab-changed'],
};
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.1; /* Stronger pulsing effect */
  }
}
</style>

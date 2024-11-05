<template>
  <Header />

  <div class="bg-gray-900 min-h-screen text-white flex justify-center items-center ">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-4">
        <h1 class="text-2xl font-bold">Order Details</h1>
        <p class="text-sm text-gray-400">Order ID: 20230926186944483970</p>
        <p class="text-sm text-gray-400">Order Time: Mar 26, 3:10 PM</p>
      </div>

      <!-- Status -->
      <div class="bg-gray-800 rounded-lg p-4 mb-4">
        <h2 class="text-lg font-semibold mb-2">Completed</h2>
        <p class="text-sm text-gray-400">
          If you’d like a refund, please contact the ePal directly. If there are any issues, please report in 24 h.
        </p>
      </div>

      <!-- Order Item -->
      <div class="bg-gray-800 rounded-lg p-4 mb-4">
        <div class="flex items-center mb-4">
          <img
              src="https://global-oss.epal.gg/data/album/729833/1724368151270586.jpeg?x-oss-process=image/resize,m_fill,w_256,h_256"
              alt="User Avatar"
              class="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p class="font-semibold">Hello</p>
            <button class="text-purple-500 text-sm">Chat</button>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-4">
          <div class="flex items-center mb-2">
            <img src="https://static-oss.epal.gg/data/static/v4/img10_E_Chat.png" alt="E-Chat" class="w-10 h-10 mr-4" />
            <div>
              <h3 class="font-semibold">E-Chat</h3>
              <p class="text-sm text-gray-400">x1</p>
            </div>
          </div>
          <div class="text-sm text-gray-400">2.00 / 30min</div>

          <!-- Price Details -->
          <div class="mt-4">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>2.00</span>
            </div>
            <div class="flex justify-between text-purple-400">
              <span>ePal Promotion</span>
              <span>-0.30</span>
            </div>
            <div class="flex justify-between font-semibold mt-2">
              <span>Final Price</span>
              <span>1.70</span>
            </div>
            <div class="text-right text-gray-400 text-sm">
              1 units total
            </div>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div class="bg-gray-800 rounded-lg p-4 mb-4">
        <h2 class="text-lg font-semibold mb-2">Notes</h2>
        <textarea
            class="w-full bg-gray-900 p-2 rounded-lg text-white text-sm"
            placeholder="+ Add notes here"
        ></textarea>
      </div>

      <!-- Buttons -->
      <div class="flex justify-between">
        <button class="bg-purple-500 text-white py-2 px-4 rounded-lg">
          Tip
        </button>
        <button class="bg-purple-500 text-white py-2 px-4 rounded-lg">
          Comment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../common/header/Header.vue";
import {onMounted, ref} from "vue";
import {useAuthStore} from "../../stores/auth.js";

export default {
  name: "OrderDetails",
  components: {Header},
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      order: ref({})
    };
  },
  setup(props) {
    onMounted(async () => {
      try {
        const headers = { Authorization: "Bearer " + useAuthStore().token };
        const response = await fetch("http://localhost:5033/api/orders/" + props.id, { headers });
        if (response.ok) {
          this.order = await response.json();
          console.log(this.order)
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    });

    return {  };
  }
};
</script>
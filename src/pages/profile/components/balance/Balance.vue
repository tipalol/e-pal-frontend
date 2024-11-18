<template>
  <div class="flex justify-center px-8 mt-48"> <!-- Внешний контейнер с отступами и центрированием -->
    <div class="font-bold space-y-8 max-w-screen-lg"> <!-- Внутренний контейнер для всех элементов -->

      <!-- Заголовок -->
      <div class="ml-2 text-left">
        <h2 class="text-4xl font-bold text-white mb-10">Balance</h2>
      </div>


    </div>
  </div>
</template>





<script>
import {useAuthStore} from "../../../../stores/auth.js";
import axios from "axios";

export default {
  name: "Balance",
  data() {

  },
  methods: {

  }
}
</script>
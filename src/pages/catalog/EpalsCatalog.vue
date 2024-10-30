<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-6">Service ID: {{ id }}</h2>
    <!-- You can add additional details here based on the service ID -->
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>
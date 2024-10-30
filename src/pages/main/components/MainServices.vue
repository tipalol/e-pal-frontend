<template>
  <section class="p-8 mx-auto ant-spin-container">
    <div class=" container-fluid space-y-16">
     <div class=  "mt-12">
      <h2 class="text-2xl font-bold mb-6 txt-title-l text-txt-primary-normal">All Services</h2>

       <div class="grid grid-cols-3 gap-8 mt-8">
         <!-- Games -->
         <div class="relative px-6 rounded-lg flex items-center cursor-pointer bg-purple-500 hover:bg-purple-600" style="height: 84px;">
           <div class="flex items-center gap-2">
             <div class="txt-title-1">Games</div>
             <i class="iconfont icon-arrow-right" style="font-size: 16px;"></i>
           </div>
           <div class="absolute bottom-0 right-0 w-[120px] h-[120px] transition-transform duration-200 ease-in-out transform img___3s979"></div>
         </div>
         <!-- Chilling -->
         <div class="relative px-6 rounded-lg flex items-center cursor-pointer bg-purple-500 hover:bg-purple-600" style="height: 84px;">
           <div class="flex items-center gap-2">
             <div class="txt-title-1">Chilling</div>
             <i class="iconfont icon-arrow-right" style="font-size: 16px;"></i>
           </div>
           <div class="absolute bottom-0 right-0 w-[120px] h-[120px] transition-transform duration-200 ease-in-out transform img___3s979"></div>
         </div>
         <!-- Castom -->
         <div class="relative px-6 rounded-lg flex items-center cursor-pointer bg-purple-500 hover:bg-purple-600" style="height: 84px;">
           <div class="flex items-center gap-2">
             <div class="txt-title-1">Custom</div>
             <i class="iconfont icon-arrow-right" style="font-size: 16px;"></i>
           </div>
           <div class="absolute bottom-0 right-0 w-[120px] h-[120px] transition-transform duration-200 ease-in-out transform img___3s979"></div>
         </div>
       </div>

       <!-- Service Cards -->
      <div class="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div v-for="service in services" :key="service.name" class="bg-gray-800 rounded-lg">
          <img @click="handleServiceClick(service.id)"
               class="object-cover bg-center bg-cover rounded-lg cursor-pointer hover:scale-110"
               :src="service.avatar"
               :alt="service.name"
          />
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleServiceClick(id) {
      this.$router.push("/catalog/" + id);
    }
  }
};
</script>
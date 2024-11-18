<template>
  <div class=" w-2/5 flex justify-center min-h-screen bg-gray-800 space-y-6 space-x-5 ">
    <div>
    <div class="bg-purple-800 ml-6 mr-6 rounded-2xl" >
      <!-- Главный блок с балансом -->
      <div class="bg-purple-600 p-6 rounded-2xl mt-5 ml-6 mr-6 text-white text-center">
        <h2 class="mt-5text-2xl font-bold">Баланс счета</h2>
        <p>Ваш текущий баланс: 1000 руб.</p>
      </div>

      <!-- Подблоки -->
      <div class="flex gap-4 mt-6 mb-6 w-full space-x-5">
        <div class="bg-purple-600 w-1/2 p-6 rounded-lg ml-5 mb-5">
          <h3 class="text-lg font-medium text-white">Пополнить</h3>
          <p class="text-white text-sm">Информация о подблоке 1</p>
        </div>
        <div class="bg-purple-600 w-1/2 p-6 rounded-lg mr-5 mb-5">
          <h3 class="text-lg font-medium text-white">Вывести</h3>
          <p class="text-white text-sm">Информация о подблоке 2</p>
        </div>
      </div>
    </div>

      <div class="flex ml-6 mr-6">
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="bg-purple-500 p-4 rounded-lg">
            <h3 class="text-lg font-medium text-white">Потрачено в ноябре</h3>
            <p class="text-white text-sm">Информация о блоке 1</p>
          </div>
          <div class="bg-purple-500 p-4 rounded-lg">
            <h3 class="text-lg font-medium text-white">Заработано</h3>
            <p class="text-white text-sm">Информация о блоке 2</p>
          </div>
          <div class="bg-purple-500 p-4 rounded-lg">
            <h3 class="text-lg font-medium text-white">Получено от рефералов</h3>
            <p class="text-white text-sm">Информация о блоке 3</p>
          </div>
        </div>
      </div>



      <div class="bg-purple-500 p-4 rounded-lg overflow-y-auto max-h-[200px] mr-6 ml-6">
        <h3 class="text-lg font-medium text-white mb-2">История операций</h3>
        <ul class="text-white text-sm">
          <li v-for="operation in operations" :key="operation.id">
            {{ operation.date }} - {{ operation.description }} - {{ operation.amount }} руб.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Balance",
  data() {
    return {
      operations: [
        { id: 1, date: '2023-10-27', description: 'Пополнение', amount: 500 },
        { id: 2, date: '2023-10-26', description: 'Списание', amount: -100 },
        { id: 3, date: '2023-10-25', description: 'Пополнение', amount: 200 },
        // ... добавьте больше операций ...
      ],
    };
  },
};
</script>






<template>
  <div class="bg-gradient-to-r from-purple-700 to-pink-500">
    <div>
      <img src="../assets/images/home-page.jpg" alt="home page image" />
    </div>
    <div>
      <h1 class="text-white text-4xl font-bold text-center">Weather</h1>
      <h1 class="text-yellow-300 text-4xl font-bold text-center">ForeCasts</h1>
    </div>
    <div class="flex items-center justify-center">
      <button
        class="bg-yellow-300 text-xl text-purple-600 rounded-full h-15 w-34 font-semibold px-4 py-2 my-7 hover:bg-violet-600 hover:text-white"
      >
        <router-link to="/weather">Get Started</router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
